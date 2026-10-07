import React, { useEffect, useRef, useState } from 'react';
import { Volume2 } from 'lucide-react';

export const VimeoHeroPlayer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<string>('16 / 9');

  const sendVimeoCommand = (method: string, value?: unknown) => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow) return;
    const message = value !== undefined ? { method, value } : { method };
    iframe.contentWindow.postMessage(JSON.stringify(message), '*');
  };

  useEffect(() => {
    // Query Vimeo oEmbed API to respect exact native aspect ratio of video 1233661385
    let active = true;
    fetch('https://vimeo.com/api/oembed.json?url=https://vimeo.com/1233661385')
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
          sendVimeoCommand('addEventListener', 'volumechange');
          sendVimeoCommand('play');
        }
        if (data?.event === 'volumechange' && typeof data?.data?.volume === 'number') {
          setIsMuted(data.data.volume === 0);
        }
      } catch {
        // Ignore non-JSON messages
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleActivateSound = () => {
    sendVimeoCommand('setMuted', false);
    sendVimeoCommand('setVolume', 1);
    sendVimeoCommand('play');
    setIsMuted(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* Subtle Ambient Illumination Behind Video (No Heavy Card or Fake Frame) */}
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
          src="https://player.vimeo.com/video/1233661385?autoplay=1&muted=1&loop=0&autopause=0&playsinline=1&title=0&byline=0&portrait=0&badge=0&dnt=1&api=1&controls=1"
          title="LevelCode — Vídeo Principal"
          className="absolute inset-0 h-full w-full border-0"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          onLoad={() => setIsLoaded(true)}
        />

        {/* Discreet Unmute Trigger When Browser Starts Autoplay Muted */}
        {isMuted && (
          <div className="pointer-events-none absolute inset-x-0 top-4 sm:top-5 flex justify-center px-4">
            <button
              type="button"
              onClick={handleActivateSound}
              className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 text-xs font-medium text-white shadow-lg ring-1 ring-white/20 backdrop-blur-md transition-all duration-200 hover:bg-purple-600/90 hover:ring-purple-400 cursor-pointer whitespace-nowrap"
            >
              <Volume2 className="h-3.5 w-3.5 text-purple-300" />
              <span>Ativar som do vídeo</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
