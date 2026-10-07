import { useTranslations } from 'next-intl';

export function ProfileSection() {
  const t = useTranslations('about.profile');

  return (
    <section className="bg-ink">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-6 pb-24 pt-10 lg:px-16 lg:pb-[168px]">
        <p className="font-mono text-xs tracking-[0.08em] text-muted">{t('label')}</p>
        <div className="flex flex-col items-center gap-10">
          <h2 className="max-w-[1100px] whitespace-pre-line text-center font-serif-jp text-[26px] font-medium leading-[1.5] text-paper sm:text-4xl lg:text-[44px]">
            {t('statement')}
          </h2>
          <p className="max-w-[760px] whitespace-pre-line text-base leading-[2] text-paper-dim">
            {t('body')}
          </p>
        </div>
      </div>
    </section>
  );
}
