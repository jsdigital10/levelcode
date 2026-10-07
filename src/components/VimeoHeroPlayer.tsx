import React, { useEffect, useRef, useState } from 'react';
import Player from '@vimeo/player';
import { Volume2 } from 'lucide-react';

const VIMEO_VIDEO_ID = '1233741589';

export const VimeoHeroPlayer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [browserForcedMute, setBrowserForcedMute] = useState(false);

  const activateAudioAndPlay = async (restartIfBeginning = false) => {
    const player = playerRef.current;
    if (!player) return;
    try {
      if (restartIfBeginning) {
        const currentTime = await player.getCurrentTime();
        if (currentTime > 1.5) {
          await player.setCurrentTime(0);
        }
      }
      await player.setMuted(false);
      await player.setVolume(1);
      await player.play();
      setBrowserForcedMute(false);
    } catch {
      // Browser still requires direct gesture on the page
    }
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const player = new Player(iframe);
    playerRef.current = player;

    let isMounted = true;

    player.ready().then(async () => {
      if (!isMounted) return;
      setIsLoaded(true);

      try {
        // Attempt immediate unmuted autoplay with full volume
        await player.setMuted(false);
        await player.setVolume(1);
        await player.play();

        const mutedState = await player.getMuted();
        const volumeState = await player.getVolume();
        if (mutedState || volumeState === 0) {
          setBrowserForcedMute(true);
        } else {
          setBrowserForcedMute(false);
        }
      } catch {
        // If the browser blocks unmuted autoplay on cold load, start playing and unlock sound on first touch anywhere
        if (!isMounted) return;
        setBrowserForcedMute(true);
        try {
          await player.setMuted(true);
          await player.play();
        } catch {
          // Ignore fallback error
        }
      }
    });

    player.on('volumechange', (data: { volume: number; muted?: boolean }) => {
      if (!isMounted) return;
      if (data.volume > 0 && !data.muted) {
        setBrowserForcedMute(false);
      }
    });

    // Unlock audio automatically on the very first touch/click anywhere on the document
    const handleFirstUserGesture = () => {
      activateAudioAndPlay(false);
    };

    document.addEventListener('pointerdown', handleFirstUserGesture, {
      capture: true,
      once: true,
      passive: true,
    });
    document.addEventListener('touchstart', handleFirstUserGesture, {
      capture: true,
      once: true,
      passive: true,
    });
    document.addEventListener('keydown', handleFirstUserGesture, {
      capture: true,
      once: true,
      passive: true,
    });

    return () => {
      isMounted = false;
      document.removeEventListener('pointerdown', handleFirstUserGesture, { capture: true });
      document.removeEventListener('touchstart', handleFirstUserGesture, { capture: true });
      document.removeEventListener('keydown', handleFirstUserGesture, { capture: true });
      player. unload().catch(() => {});
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[380px] sm:max-w-[420px]">
      {/* Subtle Ambient Illumination Behind Video */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-35 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.35), rgba(79, 70, 229, 0.12) 65%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Clean, Seamless Responsive Video Container Matching Native 240:426 (9:16) Aspect Ratio */}
      <div
        className="relative mx-auto w-full overflow-hidden rounded-2xl bg-[#07070B] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08]"
        style={{ aspectRatio: '240 / 426' }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07070B]">
            <div className="h-8 w-8 rounded-full border-2 border-purple-500/25 border-t-purple-400 animate-spin" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&muted=0&loop=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&badge=0&dnt=1&controls=1`}
          title="LevelCode — Vídeo Principal"
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share; speaker-selection"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />

        {/* Transparent Full-Video Catch Layer ONLY if Browser Blocked Initial Unmuted Autoplay */}
        {browserForcedMute && (
          <button
            type="button"
            onClick={() => activateAudioAndPlay(true)}
            aria-label="Ouvir vídeo com som"
            className="absolute inset-x-0 top-0 bottom-14 z-20 flex items-start justify-center pt-4 bg-transparent cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/95 px-4 py-2 text-xs font-medium text-white shadow-[0_0_25px_rgba(168,85,247,0.7)] ring-1 ring-purple-300/60 backdrop-blur-md">
              <Volume2 className="h-3.5 w-3.5 animate-pulse" />
              <span>Toque na tela para ouvir o áudio</span>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};
