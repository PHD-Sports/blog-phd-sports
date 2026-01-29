import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Tag {
  id: number;
  nome: string;
  slug: string;
}

export interface Categoria {
  id: number;
  nome: string;
  slug: string;
  descricao?: string;
  cor: string;
  icone?: string;
}

export interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
  categoria: string;
  categoria_id?: number;
  autor: string;
  data: string;
  destaque: boolean;
  local?: string;
  citacao_ceo?: boolean;
  created_at?: string;
  categorias?: Categoria;
  noticias_tags?: { tags: Tag }[];
}

// Buscar todas as notícias com categorias e tags
export async function getNoticias(): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categorias (*),
      noticias_tags (
        tags (*)
      )
    `)
    .order('data', { ascending: false });

  if (error) {
    console.error('Erro ao buscar notícias:', error);
    return [];
  }

  return data || [];
}

// Buscar notícia por slug com tags
export async function getNoticiaBySlug(slug: string): Promise<Noticia | null> {
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categorias (*),
      noticias_tags (
        tags (*)
      )
    `)
    .eq('slug', slug)
    .single();

  if (error) {
    console.error('Erro ao buscar notícia:', error);
    return null;
  }

  return data;
}

// Buscar notícias em destaque
export async function getNoticiasDestaque(): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categorias (*),
      noticias_tags (
        tags (*)
      )
    `)
    .eq('destaque', true)
    .order('data', { ascending: false });

  if (error) {
    console.error('Erro ao buscar destaques:', error);
    return [];
  }

  return data || [];
}

// Buscar todos os slugs (para generateStaticParams)
export async function getAllSlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select('slug');

  if (error) {
    console.error('Erro ao buscar slugs:', error);
    return [];
  }

  return (data || []).map(n => n.slug);
}

// Buscar todas as categorias
export async function getCategorias(): Promise<Categoria[]> {
  const { data, error } = await supabase
    .from('categorias')
    .select('*')
    .order('nome');

  if (error) {
    console.error('Erro ao buscar categorias:', error);
    return [];
  }

  return data || [];
}

// Buscar todas as tags
export async function getTags(): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('nome');

  if (error) {
    console.error('Erro ao buscar tags:', error);
    return [];
  }

  return data || [];
}

// Buscar notícias por categoria
export async function getNoticiasByCategoria(categoriaSlug: string): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categorias!inner (*),
      noticias_tags (
        tags (*)
      )
    `)
    .eq('categorias.slug', categoriaSlug)
    .order('data', { ascending: false });

  if (error) {
    console.error('Erro ao buscar por categoria:', error);
    return [];
  }

  return data || [];
}

// Buscar notícias por tag
export async function getNoticiasByTag(tagSlug: string): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categorias (*),
      noticias_tags!inner (
        tags!inner (*)
      )
    `)
    .eq('noticias_tags.tags.slug', tagSlug)
    .order('data', { ascending: false });

  if (error) {
    console.error('Erro ao buscar por tag:', error);
    return [];
  }

  return data || [];
}

// Buscar notícias paginadas (para infinite scroll)
export async function getNoticiasPaginadas(
  page: number = 0,
  perPage: number = 6,
  categoria?: string,
  busca?: string
): Promise<{ data: Noticia[]; total: number }> {
  let query = supabase
    .from('noticias')
    .select(`
      *,
      categorias (*),
      noticias_tags (
        tags (*)
      )
    `, { count: 'exact' });

  if (categoria && categoria !== 'Todas') {
    query = query.eq('categoria', categoria);
  }

  if (busca && busca.trim()) {
    query = query.or(`titulo.ilike.%${busca}%,resumo.ilike.%${busca}%,conteudo.ilike.%${busca}%`);
  }

  const from = page * perPage;
  const to = from + perPage - 1;

  const { data, error, count } = await query
    .order('data', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Erro ao buscar notícias paginadas:', error);
    return { data: [], total: 0 };
  }

  return { data: data || [], total: count || 0 };
}

// Pesquisar notícias
export async function pesquisarNoticias(termo: string): Promise<Noticia[]> {
  const { data, error } = await supabase
    .from('noticias')
    .select(`
      *,
      categorias (*),
      noticias_tags (
        tags (*)
      )
    `)
    .or(`titulo.ilike.%${termo}%,resumo.ilike.%${termo}%,conteudo.ilike.%${termo}%`)
    .order('data', { ascending: false })
    .limit(20);

  if (error) {
    console.error('Erro na pesquisa:', error);
    return [];
  }

  return data || [];
}

// Helper: extrair tags de uma notícia
export function getTagsFromNoticia(noticia: Noticia): Tag[] {
  return (noticia.noticias_tags || []).map(nt => nt.tags).filter(Boolean);
}
