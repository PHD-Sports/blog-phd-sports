import { MetadataRoute } from 'next';
import { getNoticias, getCategorias } from '@/lib/supabase';

export const revalidate = 3600; // Revalida a cada 1 hora

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://noticias.academiaphdsports.com.br';
  
  const noticias = await getNoticias();
  const categorias = await getCategorias();

  // Páginas estáticas
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/franqueado`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Páginas de notícias
  const noticiaPages: MetadataRoute.Sitemap = noticias.map((noticia) => ({
    url: `${baseUrl}/noticia/${noticia.slug}`,
    lastModified: new Date(noticia.data + 'T12:00:00-03:00'),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...noticiaPages];
}
