import { cn } from '@/lib/utils';

type Variant = 'default' | 'blue' | 'green' | 'gray';

const variantClasses: Record<Variant, string> = {
  default: 'bg-surface-card text-secondary border-white/5',
  blue: 'bg-accent/10 text-accent-light border-accent/25',
  green: 'bg-success/10 text-success border-success/25',
  gray: 'bg-white/5 text-secondary border-white/10',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
