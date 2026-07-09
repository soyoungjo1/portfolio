import { Resend } from 'resend'

interface ContactPayload {
  name?: string
  email?: string
  message?: string
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactPayload>(event)
  const name = body?.name?.trim() ?? ''
  const email = body?.email?.trim() ?? ''
  const message = body?.message?.trim() ?? ''

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, message: '이름, 이메일, 메시지를 모두 입력해주세요.' })
  }
  if (!EMAIL_RE.test(email)) {
    throw createError({ statusCode: 400, message: '이메일 형식이 올바르지 않습니다.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw createError({ statusCode: 500, message: 'RESEND_API_KEY env var is not set' })
  }

  const to = process.env.CONTACT_TO_EMAIL || 'whthdud9628@gmail.com'
  const from = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev'

  const resend = new Resend(apiKey)

  const escape = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

  const { error } = await resend.emails.send({
    from: `JSY Portfolio <${from}>`,
    to: [to],
    replyTo: email,
    subject: `[Portfolio Contact] ${name}`,
    text: `이름: ${name}\n이메일: ${email}\n\n${message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#111">
        <h2 style="margin:0 0 16px">새 문의가 도착했습니다</h2>
        <p style="margin:0"><strong>이름:</strong> ${escape(name)}</p>
        <p style="margin:0 0 16px"><strong>이메일:</strong> ${escape(email)}</p>
        <div style="white-space:pre-wrap;border-top:1px solid #eee;padding-top:16px">${escape(message)}</div>
      </div>
    `,
  })

  if (error) {
    throw createError({ statusCode: 502, message: `메일 전송 실패: ${error.message}` })
  }

  return { ok: true }
})
