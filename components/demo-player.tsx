"use client";

import { useEffect, useId, useRef, useState } from "react";
import { mediaPlayback } from "@/lib/media-playback";

type DemoPlayerProps = {
  mediaId: string;
  label: string;
  src: string;
};

export function DemoPlayer({ mediaId, label, src }: DemoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const labelId = useId();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    return mediaPlayback.subscribe((activeId) => {
      const el = videoRef.current;
      if (!el) return;
      if (activeId !== mediaId && !el.paused) {
        el.pause();
      }
    });
  }, [mediaId]);

  function onPlay() {
    mediaPlayback.requestPlay(mediaId);
    setPlaying(true);
  }

  function onPause() {
    mediaPlayback.notifyPaused(mediaId);
    setPlaying(false);
  }

  function toggle() {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) void el.play();
    else el.pause();
  }

  return (
    <figure className="min-w-0" onContextMenu={(e) => e.preventDefault()}>
      <div className="relative overflow-hidden rounded-sm border border-[color:var(--hairline)] bg-[color-mix(in_oklab,var(--ink)_6%,transparent)]">
        <video
          ref={videoRef}
          className="aspect-video w-full bg-ink/90 object-contain"
          src={src}
          controls
          playsInline
          preload="metadata"
          aria-labelledby={labelId}
          onPlay={onPlay}
          onPause={onPause}
          onEnded={onPause}
        />
        {!playing ? (
          <button
            type="button"
            onClick={toggle}
            className="absolute inset-0 flex items-center justify-center bg-[color-mix(in_oklab,var(--ink)_85%,transparent)] text-[0.65rem] font-bold tracking-[0.15em] text-paper uppercase transition-opacity focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Play {label}
          </button>
        ) : null}
      </div>
      <figcaption
        id={labelId}
        className="mt-2 text-xs tracking-[0.15em] text-muted uppercase"
      >
        {label}
      </figcaption>
    </figure>
  );
}
