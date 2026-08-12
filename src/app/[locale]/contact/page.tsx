import type { Locale } from 'use-intl';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { EnvelopeIcon, ClockIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from './ContactForm';
import { getLocalizedAlternates } from '@/lib/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
    description: t('description'),
    openGraph: { title: t('title'), description: t('description') },
    alternates: getLocalizedAlternates('/contact', locale as Locale),
  };
}

function ContactInfo() {
  const t = useTranslations('contact');

  const items = [
    {
      icon: ClockIcon,
      title: t('infoReplyTitle'),
      desc: t('infoReplyDesc'),
    },
    {
      icon: EnvelopeIcon,
      title: t('infoEmailTitle'),
      desc: t('infoEmailDesc'),
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: t('infoSnsTitle'),
      desc: t('infoSnsDesc'),
    },
  ];

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.title}
          className="flex items-start gap-4 p-4 bg-surface-card rounded-xl border border-white/5"
        >
          <div className="w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
            <item.icon className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-primary text-sm font-semibold">{item.title}</p>
            <p className="text-secondary text-xs mt-0.5">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });

  return (
    <div className="mx-auto max-w-6xl px-6 lg:px-8 py-16">
      <SectionTitle
        subtitle={t('subtitle')}
        title={t('title')}
        description={t('description')}
      />

      <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
        {/* Info sidebar */}
        <aside className="lg:col-span-2">
          <ContactInfo />
        </aside>

        {/* Form */}
        <div className="lg:col-span-3 bg-surface-card rounded-2xl border border-white/5 p-6 sm:p-8">
          <ContactForm locale={locale} />
        </div>
      </div>
    </div>
  );
}
