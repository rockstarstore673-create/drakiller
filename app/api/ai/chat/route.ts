import { type NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRequestIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const identifier = getRequestIdentifier(req);
  const rateLimit = checkRateLimit({
    identifier,
    key: 'groq-chat',
    limit: 10,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit, 'AI chat rate limit exceeded. Please wait before trying again.');
  }

  const body = await req.json().catch(() => ({}));
  const prompt = body.prompt || '';

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt harus diisi' }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json(
      {
        error: 'GROQ_API_KEY belum dikonfigurasi. AI provider belum aktif.',
        provider: 'groq',
        status: 'not_configured',
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        temperature: 0.7,
        messages: [
          { role: 'system', content: 'Kamu adalah AI assistant Drakiller. Jawab singkat, jelas, dan profesional.' },
          { role: 'user', content: prompt },
        ],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Groq API gagal');
    }

    const data = await res.json();
    const message = data.choices?.[0]?.message?.content || 'Tidak ada jawaban dari model.';

    return NextResponse.json({ message });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'AI request gagal',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
