import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const owner = req.nextUrl.searchParams.get('owner');
  const repo = req.nextUrl.searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json({ error: 'owner dan repo wajib diisi' }, { status: 400 });
  }

  const token = process.env.GITHUB_TOKEN || '';
  const url = `https://api.github.com/repos/${owner}/${repo}`;

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
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Repository lookup gagal',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
