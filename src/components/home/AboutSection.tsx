import { useTranslations } from 'next-intl';

interface Strength {
  title: string;
  desc: string;
}

export function AboutSection() {
  const t = useTranslations('home.about');
  const strengths = t.raw('strengths') as Strength[];

  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-6 py-24 lg:gap-28 lg:px-16 lg:py-[168px]">
        <div className="flex flex-col gap-10 lg:gap-12">
          <p className="font-mono text-xs tracking-[0.08em] text-muted">{t('label')}</p>
          <div className="flex flex-col gap-8 lg:gap-10">
            <h2 className="max-w-[1100px] font-serif-jp text-[28px] font-medium leading-[1.5] text-paper sm:text-4xl lg:text-5xl">
              {t('statement1')}
              <br />
              {t('statement2')}
            </h2>
            <p className="max-w-[906px] text-base leading-[1.9] text-paper-dim">{t('body')}</p>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {strengths.map((item, i) => (
            <div key={item.title} className="flex flex-col gap-[18px] border-t border-line pt-7">
              <span className="font-mono text-xs text-accent">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3 className="text-2xl font-bold text-paper">{item.title}</h3>
              <p className="text-[15px] leading-[1.8] text-paper-dim">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
