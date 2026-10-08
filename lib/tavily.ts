export type TavilyResult = {
  title: string;
  content: string;
  url: string;
  score?: number;
};

export async function tavilySearch(query: string): Promise<TavilyResult[]> {
  if (!process.env.TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY belum dikonfigurasi');
  }

  const res = await fetch('https://api.tavily.com/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.TAVILY_API_KEY}`,
    },
    body: JSON.stringify({
      query,
      max_results: 8,
      search_depth: 'basic',
    }),
  });

  if (!res.ok) {
    throw new Error('Tavily request failed');
  }

  const data = await res.json();
  return (data.results || []).map((item: any) => ({
    title: item.title || 'Untitled',
    content: item.content || item.snippet || 'No description',
    url: item.url,
    score: item.score,
  }));
}
