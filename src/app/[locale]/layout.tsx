import type { Metadata } from 'next';
import {
  Instrument_Serif,
  Inter_Tight,
  JetBrains_Mono,
  Noto_Sans_JP,
  Noto_Serif_JP,
} from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ContactCTASlot } from '@/components/layout/ContactCTASlot';
import IntroLoader from '@/components/layout/IntroLoader';
import { ScrollReveal } from '@/components/layout/ScrollReveal';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildPersonWebsiteJsonLd } from '@/lib/jsonld';
import { SITE_URL, GA_MEASUREMENT_ID } from '@/config/site';
import '../globals.css';

const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
});
const interTight = Inter_Tight({
  variable: '--font-inter-tight',
  subsets: ['latin'],
});
const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});
const notoSansJp = Noto_Sans_JP({
  variable: '--font-noto-sans-jp',
  weight: ['400', '500', '700'],
  preload: false,
});
const notoSerifJp = Noto_Serif_JP({
  variable: '--font-noto-serif-jp',
  weight: ['500'],
  preload: false,
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('siteTitle'),
      template: `%s | Taishi Hamano`,
    },
    description: t('siteDescription'),
    openGraph: {
      title: t('siteTitle'),
      description: t('siteDescription'),
      locale: locale === 'ja' ? 'ja_JP' : 'en_US',
      type: 'website',
    },
    verification: {
      google: 'CUritH43s4ExxfhrtRPFfBBx-pHp5ud_p62fo8t57FE',
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body
        className={`${instrumentSerif.variable} ${interTight.variable} ${jetBrainsMono.variable} ${notoSansJp.variable} ${notoSerifJp.variable} antialiased min-h-screen flex flex-col bg-ink text-paper`}
      >
        <JsonLd data={buildPersonWebsiteJsonLd()} />
        <NextIntlClientProvider>
          <IntroLoader />
          <ScrollReveal />
          <Header />
          <main className="flex-1 pt-[98px]">{children}</main>
          <ContactCTASlot />
          <Footer />
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      </body>
    </html>
  );
}
