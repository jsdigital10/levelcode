import React, { useEffect, useRef, useState } from 'react';

const VIMEO_VIDEO_ID = '1233741589';

export const VimeoHeroPlayer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>('16 / 9');

  const sendVimeoCommand = (method: string, value?: unknown) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const message = value !== undefined ? { method, value } : { method };
    iframe.contentWindow.postMessage(JSON.stringify(message), '*');
  };

  const forcePlayWithSound = () => {
    sendVimeoCommand('setMuted', false);
    sendVimeoCommand('setVolume', 1);
    sendVimeoCommand('play');
  };

  useEffect(() => {
    // Query Vimeo oEmbed API to respect exact native aspect ratio of video 1233741589
    let active = true;
    fetch(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${VIMEO_VIDEO_ID}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data?.width && data?.height) {
          setAspectRatio(`${data.width} / ${data.height}`);
        }
      })
      .catch(() => {
        // Fallback remains 16 / 9
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!event.origin.includes('vimeo.com')) return;
      try {
        const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (data?.event === 'ready') {
          setIsLoaded(true);
          forcePlayWithSound();
        }
      } catch {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);

    // Ensure full audio playback starts immediately and also unlocks on any first micro-interaction if browser policy intervenes
    const unlockAudioOnInteraction = () => {
      forcePlayWithSound();
    };

    window.addEventListener('pointerdown', unlockAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', unlockAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('keydown', unlockAudioOnInteraction, { once: true, passive: true });
    window.addEventListener('scroll', unlockAudioOnInteraction, { once: true, passive: true });

    return () => {
      window.removeEventListener('message', handleMessage);
      window.removeEventListener('pointerdown', unlockAudioOnInteraction);
      window.removeEventListener('touchstart', unlockAudioOnInteraction);
      window.removeEventListener('keydown', unlockAudioOnInteraction);
      window.removeEventListener('scroll', unlockAudioOnInteraction);
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Subtle Ambient Illumination Behind Video */}
      <div
        className="pointer-events-none absolute -inset-6 rounded-3xl opacity-35 blur-3xl"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.35), rgba(79, 70, 229, 0.12) 65%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      {/* Clean, Seamless Responsive Video Container */}
      <div
        className="relative mx-auto w-full overflow-hidden rounded-xl sm:rounded-2xl bg-[#07070B] shadow-[0_24px_70px_-15px_rgba(0,0,0,0.85)] ring-1 ring-white/[0.08]"
        style={{ aspectRatio }}
      >
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#07070B]">
            <div className="h-8 w-8 rounded-full border-2 border-purple-500/25 border-t-purple-400 animate-spin" />
          </div>
        )}

        <iframe
          ref={iframeRef}
          src={`https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?autoplay=1&muted=0&loop=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&badge=0&dnt=1&api=1&controls=1`}
          title="LevelCode — Vídeo Principal"
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media; speaker-selection"
          allowFullScreen
          onLoad={() => {
            setIsLoaded(true);
            forcePlayWithSound();
          }}
        />
      </div>
    </div>
  );
};
