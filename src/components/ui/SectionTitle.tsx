import { cn } from '@/lib/utils';

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionTitle({
  subtitle,
  title,
  description,
  align = 'left',
  className,
}: SectionTitleProps) {
  return (
    <div className={cn('mb-12', align === 'center' && 'text-center', className)}>
      {subtitle && (
        <p className="text-accent text-xs font-semibold tracking-[0.2em] uppercase mb-3">
          {subtitle}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl font-bold text-primary">{title}</h2>
      {description && (
        <p
          className={cn(
            'text-secondary mt-4 text-base leading-relaxed',
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl',
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
