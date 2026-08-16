'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  ArrowRightIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  BriefcaseIcon,
  DocumentTextIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { cn } from '@/lib/utils';

const serviceIcons: Record<string, React.ElementType> = {
  webapp: CodeBracketIcon,
  homepage: GlobeAltIcon,
  notion: DocumentTextIcon,
  mobile: DevicePhoneMobileIcon,
  rebuild: WrenchScrewdriverIcon,
  consulting: BriefcaseIcon,
};

const allIds = ['webapp', 'homepage', 'notion', 'mobile', 'rebuild', 'consulting'];

// Percentage distance from the center at which cards orbit (desktop only).
const ORBIT_RADIUS = 38;
// height / width ratio of the orbit container — < 1 makes it an ellipse (wider than tall).
const ORBIT_ASPECT = 1 / 2;

function ServiceFlipCard({
  painText,
  title,
  description,
  Icon,
  isActive,
  isDimmed,
  onHover,
  onLeave,
  onToggle,
  className,
  style,
}: {
  painText: string;
  title: string;
  description: string;
  Icon: React.ElementType;
  isActive: boolean;
  isDimmed: boolean;
  onHover: () => void;
  onLeave: () => void;
  onToggle: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={isActive}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onFocus={onHover}
      onBlur={onLeave}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      style={style}
      className={cn(
        'flip-card h-48 md:h-52 lg:h-36 xl:h-40 cursor-pointer select-none transition-all duration-300 motion-reduce:transition-none',
        isActive
          ? 'lg:scale-125 z-20 is-active'
          : isDimmed
            ? 'opacity-25'
            : 'opacity-100',
        className,
      )}
    >
      <div className="flip-card-inner">
        {/* Front: pain point */}
        <div className="flip-card-face rounded-2xl border border-white/5 bg-surface-card p-5 md:p-6 lg:p-4 flex flex-col">
          <p className="flex-1 flex items-center text-primary text-lg sm:text-xl md:text-2xl lg:text-base xl:text-lg font-bold leading-snug">
            {painText}
          </p>
        </div>

        {/* Back: service info */}
        <div className="flip-card-face flip-card-face--back rounded-2xl border border-accent/30 bg-surface-raised p-5 md:p-6 lg:p-4 flex flex-col">
          <div className="flex items-center gap-3 mb-4 lg:mb-2">
            <div className="w-11 h-11 lg:w-9 lg:h-9 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
              <Icon className="h-5 w-5 lg:h-4 lg:w-4 text-accent" />
            </div>
            <h3 className="text-primary font-semibold text-base lg:text-sm">{title}</h3>
          </div>
          <p className="text-secondary text-sm lg:text-xs leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

function CenterHeading({
  maxWidthClassName,
  textClassName,
  heading1,
  heading2,
}: {
  maxWidthClassName: string;
  textClassName: string;
  heading1: string;
  heading2: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn('relative mx-auto text-center', maxWidthClassName)}>
      <div className="absolute inset-0 -z-10 rounded-3xl bg-accent/10 blur-3xl" />
      <div className="rounded-2xl border border-white/10 bg-surface-card/70 backdrop-blur-sm shadow-lg shadow-black/20 px-6 py-6 sm:px-8 sm:py-7 lg:px-5 lg:py-4 xl:px-6 xl:py-5">
        <h2
          className={cn(
            'font-bold gradient-text leading-snug motion-reduce:opacity-100 motion-reduce:translate-y-0',
            textClassName,
            hasEntered ? 'animate-heading-bounce' : 'opacity-0 -translate-y-8',
          )}
        >
          {heading1}
          <br />
          {heading2}
        </h2>
      </div>
    </div>
  );
}

export function ServicesPainSection() {
  const t = useTranslations('services');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);
  const activeId = hoveredId ?? clickedId;

  const cards = allIds.map((id) => ({
    id,
    painText: t(`${id}.pain`),
    title: t(`${id}.title`),
    description: t(`${id}.description`),
    Icon: serviceIcons[id] ?? CodeBracketIcon,
  }));

  const heading1 = t('painSection.heading1');
  const heading2 = t('painSection.heading2');

  return (
    <section className="py-14 bg-surface-subtle">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle subtitle={t('subtitle')} title={t('title')} className="mb-4" />

        {/* Desktop: cards orbiting the central question */}
        <div className="hidden lg:block relative mx-auto w-full max-w-4xl aspect-[2/1] mb-4">
          {cards.map((card, i) => {
            const angle = -90 + i * (360 / cards.length);
            const rad = (angle * Math.PI) / 180;
            const dxPct = ORBIT_RADIUS * Math.cos(rad);
            const dyPct = ORBIT_RADIUS * Math.sin(rad);
            const left = 50 + dxPct;
            const top = 50 + dyPct;

            // Correct the spoke's length/angle for the container's aspect ratio
            // (a straight % width based line would otherwise miss the card).
            const dxUnits = dxPct / 100;
            const dyUnits = (dyPct / 100) * ORBIT_ASPECT;
            const lineAngle = (Math.atan2(dyUnits, dxUnits) * 180) / Math.PI;
            const lineLengthPct = Math.sqrt(dxUnits ** 2 + dyUnits ** 2) * 100;

            return (
              <div key={card.id}>
                <div
                  className="absolute left-1/2 top-1/2 h-px bg-white/10 origin-left"
                  style={{
                    width: `${lineLengthPct}%`,
                    transform: `translateY(-50%) rotate(${lineAngle}deg)`,
                  }}
                />
                <ServiceFlipCard
                  painText={card.painText}
                  title={card.title}
                  description={card.description}
                  Icon={card.Icon}
                  isActive={activeId === card.id}
                  isDimmed={activeId !== null && activeId !== card.id}
                  onHover={() => setHoveredId(card.id)}
                  onLeave={() => setHoveredId(null)}
                  onToggle={() => setClickedId((prev) => (prev === card.id ? null : card.id))}
                  className="absolute -translate-x-1/2 -translate-y-1/2 w-64 xl:w-72"
                  style={{ left: `${left}%`, top: `${top}%` }}
                />
              </div>
            );
          })}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <CenterHeading
              maxWidthClassName="max-w-[15rem] xl:max-w-[17rem]"
              textClassName="text-base xl:text-lg"
              heading1={heading1}
              heading2={heading2}
            />
          </div>
        </div>

        {/* Mobile/tablet: central question above a stacked grid */}
        <div className="lg:hidden">
          <div className="mb-10">
            <CenterHeading
              maxWidthClassName="max-w-md"
              textClassName="text-2xl sm:text-3xl"
              heading1={heading1}
              heading2={heading2}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {cards.map((card) => (
              <ServiceFlipCard
                key={card.id}
                painText={card.painText}
                title={card.title}
                description={card.description}
                Icon={card.Icon}
                isActive={activeId === card.id}
                isDimmed={activeId !== null && activeId !== card.id}
                onHover={() => setHoveredId(card.id)}
                onLeave={() => setHoveredId(null)}
                onToggle={() => setClickedId((prev) => (prev === card.id ? null : card.id))}
                className="w-full"
              />
            ))}
          </div>
        </div>

        <div className="relative z-30 mt-24 flex justify-center bg-surface-subtle">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-accent hover:text-accent-light text-sm font-semibold transition-colors"
          >
            {t('viewAll')}
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
