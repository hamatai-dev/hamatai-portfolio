'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/navigation';

const STAGGER_MS = 80;
const MAX_DELAY_MS = 400;

/**
 * 各セクションの直下の要素を取り出す。`mx-auto` の幅ラッパーがあればその子を、
 * 無ければ要素自身を対象にする。ul/ol/dl はリスト項目ごとに順番に表示する。
 */
function collectTargets(): HTMLElement[] {
  const targets: HTMLElement[] = [];
  const add = (el: Element) => {
    if (['UL', 'OL', 'DL'].includes(el.tagName)) {
      targets.push(...(Array.from(el.children) as HTMLElement[]));
    } else {
      targets.push(el as HTMLElement);
    }
  };

  document.querySelectorAll('main section, footer').forEach((section) => {
    Array.from(section.children).forEach((child) => {
      if (child.classList.contains('mx-auto')) Array.from(child.children).forEach(add);
      else add(child);
    });
  });
  return targets;
}

/**
 * ページ内の要素を、画面に入ったタイミングでフェードイン(+軽い浮き上がり)させる。
 * JS で `reveal` クラスを付けるので、JS が無効でも内容は常に見える。
 * 最初から画面内にある要素と、`prefers-reduced-motion` の環境では何もしない。
 */
export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const pending = new Set<HTMLElement>();
    const show = (el: HTMLElement, delayMs = 0) => {
      el.style.setProperty('--reveal-delay', `${delayMs}ms`);
      el.classList.add('is-visible');
      pending.delete(el);
      observer.unobserve(el);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target as HTMLElement, Math.min(order++ * STAGGER_MS, MAX_DELAY_MS));
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0 },
    );

    const id = requestAnimationFrame(() => {
      for (const el of collectTargets()) {
        if (el.getBoundingClientRect().top < window.innerHeight) continue;
        el.classList.add('reveal');
        pending.add(el);
        observer.observe(el);
      }
    });

    // ページ内リンクなどで一気に飛ばした場合、IntersectionObserver は通過した要素を
    // 検知しないので、画面より上に出た要素は見える状態にしておく。
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        pending.forEach((el) => {
          if (el.getBoundingClientRect().bottom < 0) show(el);
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
