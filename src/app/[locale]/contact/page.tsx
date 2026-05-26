import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { EnvelopeIcon, ClockIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { ContactForm } from './ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return { title: t('title') };
}

function ContactInfo() {
  const t = useTranslations('contact');

  const items = [
    {
      icon: ClockIcon,
      title: '返信目安',
      desc: '1〜2営業日以内',
    },
    {
      icon: EnvelopeIcon,
      title: 'メール',
      desc: 'フォームからご送信ください',
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: 'SNS',
      desc: 'X (@hamatai_7109) でも受付中',
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
