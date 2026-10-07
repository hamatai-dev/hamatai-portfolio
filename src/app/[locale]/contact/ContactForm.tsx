'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { sendContactEmail } from './actions';
import { TurnstileWidget, type TurnstileWidgetHandle } from './TurnstileWidget';

const schema = z.object({
  name: z.string().min(1),
  company: z.string().optional(),
  email: z.string().email(),
  type: z.string().min(1),
  message: z.string().min(10),
});

type FormData = z.infer<typeof schema>;

const typeIds = ['web', 'mobile', 'ai', 'other'] as const;

interface Props {
  locale: string;
}

const inputClass =
  'w-full border-0 border-b border-line bg-transparent pb-4 text-lg text-paper placeholder:text-paper/30 transition-colors focus:border-accent focus:outline-none';

function Field({
  label,
  required,
  error,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3.5">
      <span className="flex items-center gap-2 text-[13px] font-medium text-muted">
        {label}
        {required && <span className="font-mono text-accent">*</span>}
      </span>
      {children}
      {error && <p className="text-xs text-accent">{error}</p>}
    </div>
  );
}

export function ContactForm({ locale }: Props) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isTurnstileError, setIsTurnstileError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const defaultType = t(`types.${typeIds[0]}`);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { type: defaultType },
  });

  const onSubmit = async (data: FormData) => {
    if (!turnstileToken) {
      setStatus('error');
      setIsTurnstileError(true);
      return;
    }

    const result = await sendContactEmail(data, turnstileToken);
    if (result.success) {
      setStatus('success');
      reset({ type: defaultType });
    } else {
      setStatus('error');
      setIsTurnstileError(result.error === 'turnstile');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col gap-5 border-t border-accent py-12">
        <p className="font-mono text-xs tracking-[0.08em] text-accent">SENT</p>
        <h2 className="font-display text-5xl leading-none text-paper lg:text-6xl">
          {t('successTitle')}
        </h2>
        <p className="max-w-[520px] text-base leading-[1.9] text-paper-dim">{t('successMessage')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10" noValidate>
      <div className="grid gap-10 sm:grid-cols-2">
        <Field label={t('name')} required error={errors.name && t('errors.name')}>
          <input
            {...register('name')}
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            className={inputClass}
          />
        </Field>
        <Field label={t('company')}>
          <input
            {...register('company')}
            type="text"
            autoComplete="organization"
            placeholder={t('companyPlaceholder')}
            className={inputClass}
          />
        </Field>
      </div>

      <Field label={t('email')} required error={errors.email && t('errors.email')}>
        <input
          {...register('email')}
          type="email"
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          className={inputClass}
        />
      </Field>

      <Field label={t('type')} required error={errors.type && t('errors.type')}>
        <div role="radiogroup" className="flex flex-wrap gap-3">
          {typeIds.map((id) => {
            const label = t(`types.${id}`);
            return (
              <label key={id} className="cursor-pointer">
                <input
                  {...register('type')}
                  type="radio"
                  value={label}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-paper transition-colors hover:border-paper peer-checked:border-accent peer-checked:bg-accent peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-accent/50">
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </Field>

      <Field label={t('message')} required error={errors.message && t('errors.message')}>
        <textarea
          {...register('message')}
          rows={5}
          placeholder={t('messagePlaceholder')}
          className={`${inputClass} min-h-[160px] resize-none`}
        />
      </Field>

      <TurnstileWidget
        ref={turnstileRef}
        locale={locale}
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken(null)}
        onError={() => setTurnstileToken(null)}
      />

      {status === 'error' && (
        <p
          role="alert"
          className="border-l-2 border-accent bg-accent/10 px-4 py-3 text-sm text-paper"
        >
          {isTurnstileError ? t('errors.turnstile') : t('errorMessage')}
        </p>
      )}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-muted">{t('privacyNote')}</p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full bg-accent px-9 py-[18px] text-[15px] font-bold text-ink transition-colors hover:bg-paper disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? t('submitting') : t('submit')}
          <span aria-hidden>↗</span>
        </button>
      </div>
    </form>
  );
}
