import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export interface ServiceContent {
  id: string;
  titleEn: string;
  title: string;
  pain: string;
  description: string;
  features: string[];
}

export function ServiceSection({
  service,
  index,
  total,
}: {
  service: ServiceContent;
  index: number;
  total: number;
}) {
  const t = useTranslations('services');
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section
      id={service.id}
      className={`scroll-mt-[98px] border-t border-line ${index % 2 === 0 ? 'bg-ink-2' : 'bg-ink'}`}
    >
      <div className="mx-auto grid max-w-[1440px] gap-12 px-6 py-20 lg:grid-cols-[minmax(0,9fr)_minmax(0,11fr)] lg:gap-16 lg:px-16 lg:py-[120px]">
        <header className="flex flex-col gap-7">
          <span className="font-mono text-[13px] text-accent">
            {pad(index + 1)} / {pad(total)}
          </span>
          <h2 className="font-display text-[clamp(56px,7.2vw,104px)] italic leading-[0.98] tracking-[-0.02em] text-paper">
            {service.titleEn}
          </h2>
          <p className="text-xl font-bold text-paper-dim">{service.title}</p>
        </header>

        <div className="flex flex-col gap-9">
          <p className="font-serif-jp text-xl font-medium leading-[1.6] text-paper lg:text-2xl">
            {service.pain}
          </p>
          <p className="text-base leading-[1.9] text-paper-dim">{service.description}</p>

          <ul className="flex flex-col border-t border-line">
            {service.features.map((feature, i) => (
              <li key={feature} className="flex items-center gap-5 border-b border-line py-4">
                <span className="w-8 shrink-0 font-mono text-xs text-accent">{pad(i + 1)}</span>
                <span className="text-base text-paper">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-b border-paper pb-1.5 text-[15px] font-medium text-paper transition-colors hover:border-accent hover:text-accent"
            >
              {t('cta')}
              <span aria-hidden>↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
