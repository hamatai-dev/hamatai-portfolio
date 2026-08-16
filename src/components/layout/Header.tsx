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
    { label: t('about'), href: '/about' },
    { label: t('works'), href: '/works' },
    { label: t('services'), href: '/services' },
    { label: t('news'), href: '/news' },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + '/');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-surface/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-primary font-bold text-lg tracking-tight hover:text-accent transition-colors shrink-0"
          >
            hamatai
            <span className="text-accent">.</span>
          </Link>

          {/* Available badge (speech bubble) */}
          <div className="hidden md:flex relative items-center gap-1.5 pl-2.5 pr-3 py-1.5 rounded-full border border-accent/20 bg-accent/10 text-accent text-xs font-semibold whitespace-nowrap">
            <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-accent/10 border-l border-b border-accent/20" />
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shrink-0" />
            {t('availableBadge')}
          </div>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-sm font-medium transition-colors relative group ${
                isActive(item.href)
                  ? 'text-primary'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-200 ${
                  isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </Link>
          ))}
        </div>

        {/* Right: Lang switcher + CTA */}
        <div className="hidden lg:flex items-center gap-5">
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-dark transition-colors"
          >
            {t('contact')}
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden text-secondary hover:text-primary transition-colors p-1"
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
        <div className="lg:hidden bg-surface-subtle border-b border-white/5">
          <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`py-3 px-2 text-sm font-medium border-b border-white/5 last:border-0 transition-colors ${
                  isActive(item.href)
                    ? 'text-primary'
                    : 'text-secondary hover:text-primary'
                }`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-3 flex items-center justify-between">
              <LanguageSwitcher />
              <Link
                href="/contact"
                className="px-5 py-2.5 bg-accent text-white text-sm font-semibold rounded-lg"
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
