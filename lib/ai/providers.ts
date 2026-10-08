export type AIProviderResponse = {
  ok: boolean;
  message?: string;
  error?: string;
};

export class GroqProvider {
  static async chat(prompt: string): Promise<AIProviderResponse> {
    const key = process.env.GROQ_API_KEY;
    if (!key) {
      return { ok: false, error: 'GROQ_API_KEY belum dikonfigurasi.' };
    }

    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: 'Kamu adalah AI assistant Drakiller.' },
            { role: 'user', content: prompt },
          ],
        }),
      });

      if (!res.ok) {
        return { ok: false, error: 'Provider Groq gagal merespons.' };
      }

      const data = await res.json();
      return {
        ok: true,
        message: data.choices?.[0]?.message?.content || 'Tidak ada respons dari provider.',
      };
    } catch (error: any) {
      return { ok: false, error: error.message || 'AI provider error' };
    }
  }
}
