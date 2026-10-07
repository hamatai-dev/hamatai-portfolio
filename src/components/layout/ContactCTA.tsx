import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function ContactCTA() {
  const t = useTranslations('home.contact');

  return (
    <section className="overflow-hidden bg-accent text-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-24 lg:gap-[72px] lg:px-16 lg:py-36">
        <p className="font-mono text-xs tracking-[0.08em]">{t('label')}</p>

        <h2 className="font-display text-[clamp(72px,16.1vw,232px)] leading-[0.92] tracking-[-0.04em]">
          <span className="block">{t('line1')}</span>
          <span className="block italic">{t('line2')}</span>
        </h2>

        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-[520px] whitespace-pre-line text-lg font-medium leading-[1.8]">
            {t('body')}
          </p>
          <Link
            href="/contact"
            className="flex h-[160px] w-[160px] shrink-0 flex-col items-center justify-center gap-2 rounded-full bg-ink text-paper transition-transform duration-300 hover:scale-105 lg:h-[200px] lg:w-[200px]"
          >
            <span className="text-lg font-bold">{t('button')}</span>
            <span aria-hidden className="text-[32px] leading-none text-accent">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
