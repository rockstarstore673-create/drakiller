import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!prompt) {
    return NextResponse.json({ error: 'Prompt harus diisi' }, { status: 400 });
  }

  if (!process.env.GROQ_API_KEY) {
    return NextResponse.json({
      error: 'GROQ_API_KEY belum dikonfigurasi. AI Studio tidak dapat diproses sampai provider siap.',
      provider: 'groq',
      status: 'not_configured',
    }, { status: 503 });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: 'Anda adalah AI assistant untuk Drakiller. Jawab dalam bahasa Indonesia atau Inggris sesuai kebutuhan.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Groq API gagal diakses', status: response.status }, { status: 500 });
    }

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || 'Tidak ada respons.';

    return NextResponse.json({ message: text });
  } catch (error: any) {
    return NextResponse.json({ error: 'AI provider error', message: error.message }, { status: 500 });
  }
}
