import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!
);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Verifica se é /noticia/ seguido de um número
  const match = pathname.match(/^\/noticia\/(\d+)$/);
  if (!match) return NextResponse.next();

  const id = Number(match[1]);

  // Busca o slug pelo ID no Supabase
  const { data } = await supabase
    .from('noticias')
    .select('slug')
    .eq('id', id)
    .single();

  if (data?.slug) {
    // Redirect 301 (permanente) para a URL com slug
    return NextResponse.redirect(
      new URL(`/noticia/${data.slug}`, request.url),
      301
    );
  }

  // Se não encontrou, deixa seguir (vai cair na 404)
  return NextResponse.next();
}

export const config = {
  matcher: '/noticia/:path*',
};
