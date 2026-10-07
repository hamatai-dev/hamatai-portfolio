'use client';

import { usePathname } from '@/i18n/navigation';
import { ContactCTA } from './ContactCTA';

/** Contact ページ自身ではフォームが主役のため、末尾CTAは出さない。 */
export function ContactCTASlot() {
  const pathname = usePathname();
  if (pathname === '/contact') return null;
  return <ContactCTA />;
}
