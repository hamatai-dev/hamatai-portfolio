'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
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

const typeIds = [
  'webapp',
  'homepage',
  'notion',
  'mobile',
  'rebuild',
  'consulting',
  'other',
] as const;

interface Props {
  locale: string;
}

export function ContactForm({ locale }: Props) {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isTurnstileError, setIsTurnstileError] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    if (!turnstileToken) {
      setStatus('error');
      setIsTurnstileError(true);
      return;
    }

    const result = await sendContactEmail(data, turnstileToken);
    if (result.success) {
      setStatus('success');
      reset();
    } else {
      setStatus('error');
      setIsTurnstileError(result.error === 'turnstile');
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    }
  };

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CheckCircleIcon className="h-14 w-14 text-success mb-4" />
        <h3 className="text-primary font-bold text-xl mb-2">{t('successTitle')}</h3>
        <p className="text-secondary text-sm">{t('successMessage')}</p>
      </div>
    );
  }

  const inputClass =
    'w-full bg-surface-card border border-white/10 rounded-xl px-4 py-3 text-primary text-sm placeholder:text-muted focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/30 transition-colors';
  const labelClass = 'block text-primary text-sm font-medium mb-1.5';
  const errorClass = 'text-red-400 text-xs mt-1';

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <label className={labelClass}>{t('name')} *</label>
        <input
          {...register('name')}
          type="text"
          placeholder={t('namePlaceholder')}
          className={inputClass}
        />
        {errors.name && <p className={errorClass}>{t('errors.name')}</p>}
      </div>

      {/* Company */}
      <div>
        <label className={labelClass}>{t('company')}</label>
        <input
          {...register('company')}
          type="text"
          placeholder={t('companyPlaceholder')}
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>{t('email')} *</label>
        <input
          {...register('email')}
          type="email"
          placeholder={t('emailPlaceholder')}
          className={inputClass}
        />
        {errors.email && <p className={errorClass}>{t('errors.email')}</p>}
      </div>

      {/* Type */}
      <div>
        <label className={labelClass}>{t('type')} *</label>
        <select
          {...register('type')}
          className={`${inputClass} appearance-none cursor-pointer`}
          defaultValue=""
        >
          <option value="" disabled>
            {t('typePlaceholder')}
          </option>
          {typeIds.map((id) => (
            <option key={id} value={t(`types.${id}`)}>
              {t(`types.${id}`)}
            </option>
          ))}
        </select>
        {errors.type && <p className={errorClass}>{t('errors.type')}</p>}
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>{t('message')} *</label>
        <textarea
          {...register('message')}
          rows={6}
          placeholder={t('messagePlaceholder')}
          className={`${inputClass} resize-none`}
        />
        {errors.message && <p className={errorClass}>{t('errors.message')}</p>}
      </div>

      {/* Turnstile */}
      <TurnstileWidget
        ref={turnstileRef}
        locale={locale}
        onVerify={setTurnstileToken}
        onExpire={() => setTurnstileToken(null)}
        onError={() => setTurnstileToken(null)}
      />

      {/* Error */}
      {status === 'error' && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
          <ExclamationCircleIcon className="h-5 w-5 text-red-400 shrink-0" />
          <p className="text-red-400 text-sm">
            {isTurnstileError ? t('errors.turnstile') : t('errorMessage')}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-4 bg-accent text-white rounded-xl font-semibold text-sm hover:bg-accent-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? t('submitting') : t('submit')}
      </button>
    </form>
  );
}
