import { type NextRequest, NextResponse } from 'next/server';
import { checkRateLimit, getRequestIdentifier, rateLimitResponse } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  const identifier = getRequestIdentifier(req);
  const rateLimit = checkRateLimit({
    identifier,
    key: 'replicate-photo',
    limit: 5,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit, 'Photo enhancement rate limit exceeded. Please wait before trying again.');
  }

  try {
    const body = await req.json();
    const { imageUrl } = body;

    if (!imageUrl) {
      return NextResponse.json({ error: 'imageUrl harus diisi' }, { status: 400 });
    }

    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        {
          error: 'REPLICATE_API_TOKEN belum dikonfigurasi',
          status: 'not_configured',
          provider: 'replicate',
        },
        { status: 503 }
      );
    }

    const model = 'black-forest-labs/flux-schnell';
    const res = await fetch('https://api.replicate.com/v1/models/' + model + '/predictions', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: {
          image: imageUrl,
          prompt: 'enhance image quality ultra detailed high resolution clean sharpen',
          width: 2048,
          height: 2048,
          num_outputs: 1,
        },
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Replicate request failed');
    }

    const data = await res.json();
    return NextResponse.json({ predictionId: data.id, status: data.status, output: data.output });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Photo enhancement gagal',
        message: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const identifier = getRequestIdentifier(req);
  const rateLimit = checkRateLimit({
    identifier,
    key: 'replicate-photo-status',
    limit: 20,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return rateLimitResponse(rateLimit, 'Photo status poll rate limit exceeded. Please wait before trying again.');
  }

  const predictionId = req.nextUrl.searchParams.get('prediction_id');
  if (!predictionId) {
    return NextResponse.json({ error: 'prediction_id harus diisi' }, { status: 400 });
  }

  if (!process.env.REPLICATE_API_TOKEN) {
    return NextResponse.json({ error: 'REPLICATE_API_TOKEN belum dikonfigurasi' }, { status: 503 });
  }

  try {
    const res = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      throw new Error('Replicate status fetch failed');
    }

    const data = await res.json();
    return NextResponse.json({ status: data.status, output: data.output, error: data.error });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: 'Status enhancement gagal',
        message: error.message,
      },
      { status: 500 }
    );
  }
}
