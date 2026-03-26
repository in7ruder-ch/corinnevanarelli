import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';
import { getSupabaseService } from '@/lib/supabaseService';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('session_id');

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseService();

    const { data: purchase, error } = await supabase
      .from('ebook_purchases')
      .select('id, status, stripe_session_id')
      .eq('stripe_session_id', sessionId)
      .eq('status', 'paid')
      .maybeSingle();

    if (error) {
      console.error('Supabase download validation error:', error);
      return NextResponse.json(
        { error: 'Purchase validation failed' },
        { status: 500 }
      );
    }

    if (!purchase) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 403 }
      );
    }

    const filePath = path.join(process.cwd(), 'storage', 'ebooks', 'ebook.pdf');
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="ebook.pdf"',
        'Content-Length': String(fileBuffer.length),
        'Cache-Control': 'private, no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Ebook download error:', error);
    return NextResponse.json(
      { error: 'Unable to download file' },
      { status: 500 }
    );
  }
}