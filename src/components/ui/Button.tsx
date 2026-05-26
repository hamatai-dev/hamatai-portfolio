import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import type { ComponentPropsWithoutRef } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white border border-accent hover:bg-accent-dark hover:border-accent-dark',
  secondary:
    'bg-transparent text-primary border border-white/20 hover:bg-white/5 hover:border-white/30',
  ghost: 'bg-transparent text-secondary border-transparent hover:text-primary',
  outline:
    'bg-transparent text-accent border border-accent/40 hover:bg-accent/10 hover:border-accent',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
};

interface ButtonBaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<'button'>, keyof ButtonBaseProps> & {
    href?: never;
  };

type ButtonAsLinkProps = ButtonBaseProps & {
  href: string;
};

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-200 cursor-pointer',
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if ('href' in props && props.href !== undefined) {
    const { href } = props;
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButtonProps & {
    href?: never;
  };
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
