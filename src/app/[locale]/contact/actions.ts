'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { headers } from 'next/headers';

const contactSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください'),
  company: z.string().optional(),
  email: z.string().email('有効なメールアドレスを入力してください'),
  type: z.string().min(1, 'お問い合わせ種別を選択してください'),
  message: z.string().min(10, '10文字以上入力してください'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY is not set');
    return false;
  }

  const params = new URLSearchParams();
  params.append('secret', secretKey);
  params.append('response', token);

  const hdrs = await headers();
  const remoteIp = hdrs.get('cf-connecting-ip');
  if (remoteIp) {
    params.append('remoteip', remoteIp);
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params,
    });
    const outcome = (await res.json()) as { success: boolean; 'error-codes'?: string[] };

    if (!outcome.success) {
      console.error('Turnstile verification failed:', outcome['error-codes']);
    }

    return outcome.success;
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return false;
  }
}

export async function sendContactEmail(data: unknown, turnstileToken: unknown) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' };
  }

  if (typeof turnstileToken !== 'string' || !turnstileToken) {
    return { success: false, error: 'turnstile' };
  }

  const isHuman = await verifyTurnstileToken(turnstileToken);
  if (!isHuman) {
    return { success: false, error: 'turnstile' };
  }

  const { name, company, email, type, message } = parsed.data;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not set');
    return { success: false, error: 'Mail service not configured' };
  }

  const resend = new Resend(resendApiKey);

  try {
    const { error } = await resend.emails.send({
      from: `hamatai.com お問い合わせ <${process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev'}>`,
      to: process.env.CONTACT_TO_EMAIL ?? 'thdev7109@gmail.com',
      replyTo: email,
      subject: `[お問い合わせ] ${type} — ${name}`,
      text: `
▼ お問い合わせ内容

お名前: ${name}
会社名: ${company ?? '—'}
メールアドレス: ${email}
種別: ${type}

▼ メッセージ
${message}
      `.trim(),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: 'Failed to send email' };
    }

    return { success: true };
  } catch (err) {
    console.error('Resend error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
