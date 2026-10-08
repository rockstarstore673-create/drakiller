import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || 'drakiller';

  if (!process.env.SEARCH_API_URL || !process.env.SEARCH_API_KEY) {
    return NextResponse.json(
      {
        error: 'Search provider belum dikonfigurasi. Tambahkan SEARCH_API_URL dan SEARCH_API_KEY di environment variable.',
        query: q,
        fallback: true,
      },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${process.env.SEARCH_API_URL}?q=${encodeURIComponent(q)}`, {
      headers: {
        Authorization: `Bearer ${process.env.SEARCH_API_KEY}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error('Search provider failed');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Search provider gagal dipanggil. Periksa konfigurasi API search.',
        query: q,
      },
      { status: 500 }
    );
  }
}
