import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

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
  ];

  const socials = [
    { label: 'GitHub', href: 'https://github.com/hamatai-dev' },
    { label: 'X (Twitter)', href: 'https://x.com/hamatai_7109' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/bigambitiooon/' },
  ];

  return (
    <footer className="bg-surface-subtle border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="text-primary font-bold text-lg tracking-tight"
            >
              hamatai<span className="text-accent">.</span>
            </Link>
            <p className="text-secondary text-sm mt-3 leading-relaxed max-w-xs">
              {t('description')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-primary text-sm font-semibold mb-4">
              {t('links')}
            </h3>
            <ul className="space-y-2.5">
              {links.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-secondary hover:text-primary text-sm transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-primary text-sm font-semibold mb-4">
              {t('social')}
            </h3>
            <ul className="space-y-2.5">
              {socials.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-secondary hover:text-primary text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            {t('copyright', { year })}
          </p>
          <p className="text-muted text-xs">
            Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
