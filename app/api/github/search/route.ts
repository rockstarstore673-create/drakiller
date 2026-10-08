import { type NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRequestIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q') || 'drakiller';

  const identifier = getRequestIdentifier(req);
  const rateLimit = checkRateLimit({
    identifier,
    key: 'github-search',
    limit: 20,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit, 'GitHub search rate limit exceeded. Please wait before trying again.');
  }

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
      throw new Error(`GitHub API error: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json({ items: data.items || [] });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'GitHub search gagal',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
