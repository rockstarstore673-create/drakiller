import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || '';

  if (!q.trim()) {
    return NextResponse.json({ results: [], query: q, error: null });
  }

  if (!process.env.TAVILY_API_KEY) {
    return NextResponse.json(
      {
        error: 'TAVILY_API_KEY belum dikonfigurasi. Tambahkan key di environment variable.',
        query: q,
        results: [],
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
      },
      body: JSON.stringify({
        query: q,
        max_results: 8,
        search_depth: 'basic',
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Tavily failed: ${text}`);
    }

    const data = await res.json();
    const results = (data.results || []).map((item: any, index: number) => ({
      id: item.url || `${index}`,
      title: item.title || 'Untitled result',
      description: item.content || item.snippet || 'No description available',
      url: item.url,
      type: 'search',
      tags: item.url ? ['web'] : [],
    }));

    return NextResponse.json({ results, query: q, error: null });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Tavily search gagal. Cek API key dan konfigurasi provider.',
        query: q,
        results: [],
        message: error.message,
      },
      { status: 500 }
    );
  }
}
