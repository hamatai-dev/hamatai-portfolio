'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/navigation';
import { usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { LanguageSwitcher } from './LanguageSwitcher';

export default function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { no: '01', label: t('about'), href: '/about' },
    { no: '02', label: t('works'), href: '/works' },
    { no: '03', label: t('services'), href: '/services' },
    { no: '04', label: t('news'), href: '/news' },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? 'bg-ink/90 backdrop-blur-xl border-b border-line'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="mx-auto max-w-[1440px] px-6 lg:px-16 h-[72px] lg:h-[98px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-display text-[32px] leading-none tracking-[-0.5px] text-paper hover:text-accent transition-colors shrink-0"
        >
          hamatai.
        </Link>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center gap-2 text-[15px] font-medium"
            >
              <span className="font-mono text-[10px] text-accent">{item.no}</span>
              <span
                className={`transition-colors ${
                  isActive(item.href)
                    ? 'text-paper'
                    : 'text-paper-dim group-hover:text-paper'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right: Lang switcher + CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-paper px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-ink"
          >
            <span className="h-[7px] w-[7px] rounded-full bg-accent animate-pulse" />
            {t('contact')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-paper-dim hover:text-paper transition-colors p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-line">
          <div className="mx-auto max-w-[1440px] px-6 py-4 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 py-4 border-b border-line text-base font-medium"
                onClick={() => setMobileOpen(false)}
              >
                <span className="font-mono text-[11px] text-accent">{item.no}</span>
                <span className={isActive(item.href) ? 'text-paper' : 'text-paper-dim'}>
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="pt-5 flex items-center justify-between">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-ink"
                onClick={() => setMobileOpen(false)}
              >
                {t('contact')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
