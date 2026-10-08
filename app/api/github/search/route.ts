import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || 'next.js';

  const token = process.env.GITHUB_TOKEN || '';
  const url = `https://api.github.com/search/repositories?q=${encodeURIComponent(q)}&per_page=5`;

  try {
    const res = await fetch(url, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'drakiller',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const msg = await res.text();
      return NextResponse.json({ error: 'GitHub API limit or configuration issue', detail: msg }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: 'GitHub search failed', message: error.message }, { status: 500 });
  }
}
