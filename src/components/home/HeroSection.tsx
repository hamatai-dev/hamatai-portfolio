import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { HeroVideo } from '@/components/home/HeroVideo';
import { HERO_VIDEO } from '@/config/site';

export function HeroSection() {
  const t = useTranslations('home.hero');

  return (
    <section className="relative -mt-[98px] flex min-h-screen flex-col overflow-hidden bg-ink">
      {HERO_VIDEO ? (
        <HeroVideo src={HERO_VIDEO.src} poster={HERO_VIDEO.poster} />
      ) : (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 75% 15%, rgba(255,91,46,0.14), transparent 70%), radial-gradient(ellipse 60% 50% at 10% 60%, rgba(237,233,224,0.06), transparent 70%), linear-gradient(to top, #0A0A0B 0%, rgba(10,10,11,0) 60%)',
          }}
        />
      )}

      <div className="relative z-10 flex flex-1 flex-col justify-end pt-40 pb-16 lg:pb-20">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-7 px-6 lg:px-16">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
              <p className="font-mono text-[11px] tracking-[0.12em] text-paper-dim sm:text-[13px] sm:tracking-[0.15em]">
                {t('roleLine')}
              </p>
            </div>
            <h1 className="font-display text-[clamp(64px,11.7vw,168px)] leading-[0.94] tracking-[-0.03em] text-paper">
              Taishi Hamano
            </h1>
          </div>

          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[700px] whitespace-pre-line text-base leading-[1.8] text-paper-dim">
              {t('lead')}
            </p>
            <div className="flex items-center gap-7">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-[18px] text-[15px] font-bold text-ink transition-colors hover:bg-paper"
              >
                {t('ctaPrimary')}
                <span aria-hidden>↗</span>
              </Link>
              <Link
                href="/works"
                className="inline-flex items-center gap-2 border-b border-paper pb-1.5 text-[15px] font-medium text-paper transition-colors hover:border-accent hover:text-accent"
              >
                {t('ctaSecondary')}
                <span aria-hidden>↓</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
