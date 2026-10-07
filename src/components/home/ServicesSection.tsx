'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface ServiceItem {
  titleEn: string;
  title: string;
  pain: string;
  description: string;
  features: string[];
}

export function ServicesSection() {
  const t = useTranslations('home.services');
  const items = t.raw('items') as ServiceItem[];
  const [active, setActive] = useState(0);

  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 py-24 lg:gap-20 lg:px-16 lg:pb-40 lg:pt-[152px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-7">
            <p className="font-mono text-xs tracking-[0.08em] text-muted">{t('label')}</p>
            <h2 className="flex flex-wrap items-baseline gap-x-6 font-display text-[clamp(56px,9.4vw,136px)] leading-[0.95] tracking-[-0.03em] text-paper">
              {t('title1')}
              <span className="italic text-accent">{t('title2')}</span>
            </h2>
          </div>
          <p className="max-w-[380px] text-[15px] leading-[1.9] text-paper-dim">{t('intro')}</p>
        </div>

        <div className="border-t border-accent">
          {items.map((item, i) => {
            const isActive = active === i;
            return (
              <Link
                key={item.titleEn}
                href="/services"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group grid gap-6 border-b border-line py-9 lg:grid-cols-[72px_minmax(0,1fr)_minmax(0,1fr)_auto] lg:gap-8"
              >
                <span
                  className={`font-mono text-[13px] ${isActive ? 'text-accent' : 'text-muted'}`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3
                  className={`font-display text-5xl leading-none tracking-[-0.02em] transition-colors lg:text-[64px] ${
                    isActive ? 'text-accent' : 'text-paper'
                  }`}
                >
                  {item.titleEn}
                </h3>
                <div className="flex flex-col gap-3.5">
                  <p className="text-xl font-bold text-paper">{item.title}</p>
                  <p className="text-[15px] leading-[1.8] text-muted">{item.pain}</p>
                  <div className={isActive ? 'flex flex-col gap-3.5' : 'flex flex-col gap-3.5 lg:hidden'}>
                    <p className="text-[15px] leading-[1.8] text-paper-dim">{item.description}</p>
                    <ul className="flex flex-wrap gap-2">
                      {item.features.map((f) => (
                        <li
                          key={f}
                          className="rounded-full border border-line px-3 py-1.5 text-xs text-paper-dim"
                        >
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <span
                  aria-hidden
                  className={`hidden text-[28px] transition-colors lg:block ${
                    isActive ? 'text-accent' : 'text-muted'
                  }`}
                >
                  ↗
                </span>
              </Link>
            );
          })}
        </div>

        <div className="flex justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 border-b border-paper pb-1.5 text-[15px] font-medium text-paper transition-colors hover:border-accent hover:text-accent"
          >
            {t('viewAll')}
            <span aria-hidden>↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
