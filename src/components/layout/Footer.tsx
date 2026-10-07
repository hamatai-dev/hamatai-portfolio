import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { socialLinks } from '@/config/site';

const FOOTER_SOCIAL_IDS = ['github', 'x', 'note', 'youtube', 'instagram', 'linkedin'];

export default function Footer() {
  const t = useTranslations('footer');
  const nav = useTranslations('nav');
  const year = new Date().getFullYear();

  const links = [
    { label: nav('home'), href: '/' },
    { label: nav('about'), href: '/about' },
    { label: nav('works'), href: '/works' },
    { label: nav('services'), href: '/services' },
    { label: nav('news'), href: '/news' },
    { label: nav('contact'), href: '/contact' },
  ] as const;

  const socials = socialLinks.filter((s) => FOOTER_SOCIAL_IDS.includes(s.id));

  return (
    <footer className="bg-ink">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-16 pt-16 lg:pt-24 pb-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="flex-1">
            <Link
              href="/"
              className="font-display text-6xl lg:text-7xl leading-none text-paper"
            >
              hamatai.
            </Link>
            <p className="mt-5 max-w-[440px] text-sm leading-relaxed text-muted">
              {t('tagline')}
            </p>
          </div>

          <div className="flex gap-16 lg:gap-16">
            <div className="w-[160px] lg:w-[200px]">
              <h3 className="font-mono text-[11px] tracking-[0.1em] text-muted mb-4 uppercase">
                {t('links')}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {links.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-[15px] text-paper hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-[160px] lg:w-[200px]">
              <h3 className="font-mono text-[11px] tracking-[0.1em] text-muted mb-4 uppercase">
                {t('social')}
              </h3>
              <ul className="flex flex-col gap-3.5">
                {socials.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[15px] text-paper hover:text-accent transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 lg:mt-20 pt-6 border-t border-line flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-mono text-[11px] text-muted">{t('copyright', { year })}</p>
          <a
            href="#"
            className="font-mono text-[11px] text-paper hover:text-accent transition-colors"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
