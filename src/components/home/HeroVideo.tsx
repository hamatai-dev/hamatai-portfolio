'use client';

import { useEffect, useRef } from 'react';

interface HeroVideoProps {
  src: string;
  poster: string;
}

/** ヒーロー背景の動画(自動再生・ミュート・ループ)。操作UIは持たない。 */
export function HeroVideo({ src, poster }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 動きを減らす設定のときは自動再生せず、ポスター画像を見せる
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause();
    }
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
      />
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/0 to-ink/0" />
    </>
  );
}
