'use server';

import { Resend } from 'resend';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, 'お名前を入力してください'),
  company: z.string().optional(),
  email: z.string().email('有効なメールアドレスを入力してください'),
  type: z.string().min(1, 'お問い合わせ種別を選択してください'),
  message: z.string().min(10, '10文字以上入力してください'),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export async function sendContactEmail(data: unknown) {
  const parsed = contactSchema.safeParse(data);

  if (!parsed.success) {
    return { success: false, error: 'Invalid form data' };
  }

  const { name, company, email, type, message } = parsed.data;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not set');
    return { success: false, error: 'Mail service not configured' };
  }

  const resend = new Resend(resendApiKey);

  try {
    await resend.emails.send({
      // 本番環境では自分のドメイン（例: noreply@yourdomain.com）を設定してください
      // Resend でドメイン認証後に変更が必要です
      from: process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev',
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

    return { success: true };
  } catch (err) {
    console.error('Resend error:', err);
    return { success: false, error: 'Failed to send email' };
  }
}
