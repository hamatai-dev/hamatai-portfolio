import { useTranslations } from 'next-intl';
import { SectionHeader } from '@/components/ui/SectionHeader';

interface Step {
  title: string;
  desc: string;
}

export function ProcessSection() {
  const t = useTranslations('services.process');
  const steps = t.raw('steps') as Step[];

  return (
    <section className="border-t border-line bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-14 px-6 py-24 lg:gap-[72px] lg:px-16 lg:pb-40 lg:pt-[152px]">
        <SectionHeader
          label={t('label')}
          title={t('title')}
          accent={t('accent')}
          aside={<p className="text-[15px] leading-[1.9] text-paper-dim">{t('intro')}</p>}
        />

        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col gap-[18px] border-t border-line pt-7">
              <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[22px] font-bold text-paper">{step.title}</h3>
              <p className="text-[15px] leading-[1.8] text-paper-dim">{step.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
