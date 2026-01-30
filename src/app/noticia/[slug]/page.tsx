import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getNoticiaBySlug, getNoticias, getAllSlugs, getTagsFromNoticia, getSlugById } from '@/lib/supabase';
import NoticiaClient from './NoticiaClient';
import Link from 'next/link';

// Revalidar a cada 60 segundos (ISR)
export const revalidate = 60;

// Permitir rotas dinâmicas (IDs antigos que não estão no generateStaticParams)
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  // Se for ID numérico, busca pelo slug real
  if (/^\d+$/.test(slug)) {
    const realSlug = await getSlugById(Number(slug));
    if (realSlug) {
      const noticiaById = await getNoticiaBySlug(realSlug);
      if (noticiaById) {
        return {
          title: `${noticiaById.titulo} | Ph.D Sports Blog`,
          alternates: { canonical: `https://noticias.academiaphdsports.com.br/noticia/${realSlug}` },
        };
      }
    }
  }

  const noticia = await getNoticiaBySlug(slug);
  
  if (!noticia) {
    return {
      title: 'Notícia não encontrada | Ph.D Sports Blog',
      description: 'A página que você procura não foi encontrada.',
    };
  }

  const baseUrl = 'https://noticias.academiaphdsports.com.br';
  const url = `${baseUrl}/noticia/${noticia.slug}`;
  const imageUrl = noticia.imagem.startsWith('http') 
    ? noticia.imagem 
    : `${baseUrl}${noticia.imagem}`;

  const tags = getTagsFromNoticia(noticia);
  const keywords = [
    noticia.categoria,
    'Ph.D Sports',
    'fitness',
    'academia',
    'franquia',
    'musculação',
    'saúde',
    'bem-estar',
    'empreendedorismo fitness',
    'rede de academias',
    ...tags.map(t => t.nome),
    ...noticia.titulo.split(' ').filter(word => word.length > 4)
  ];

  return {
    title: `${noticia.titulo} | Ph.D Sports Blog`,
    description: noticia.resumo,
    keywords: [...new Set(keywords)],
    authors: [{ name: noticia.autor }],
    creator: 'Ph.D Sports',
    publisher: 'Ph.D Sports',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'article',
      locale: 'pt_BR',
      url: url,
      title: noticia.titulo,
      description: noticia.resumo,
      siteName: 'Ph.D Sports Blog',
      publishedTime: `${noticia.data}T12:00:00-03:00`,
      modifiedTime: `${noticia.data}T12:00:00-03:00`,
      authors: [noticia.autor],
      section: noticia.categoria,
      tags: keywords,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: noticia.titulo,
          type: 'image/jpeg',
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: noticia.titulo,
      description: noticia.resumo,
      images: [imageUrl],
      creator: '@phdsports',
      site: '@phdsports',
    },
    alternates: {
      canonical: url,
    },
    category: noticia.categoria,
  };
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params;

  // Redirect de URLs antigas com ID numérico para o slug correto
  if (/^\d+$/.test(slug)) {
    const realSlug = await getSlugById(Number(slug));
    if (realSlug) {
      redirect(`/noticia/${realSlug}`);
    }
  }

  const noticia = await getNoticiaBySlug(slug);

  if (!noticia) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#131d2f] mb-4">Notícia não encontrada</h1>
          <p className="text-gray-600 mb-6">O conteúdo que você procura não existe ou foi removido.</p>
          <Link href="/" className="bg-[#ffdc61] text-[#131d2f] px-6 py-3 rounded-full font-semibold hover:bg-[#ffe580] transition-colors">
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  const todasNoticias = await getNoticias();
  const outrasNoticias = todasNoticias.filter(n => n.id !== noticia.id).slice(0, 3);
  const tags = getTagsFromNoticia(noticia);

  const baseUrl = 'https://noticias.academiaphdsports.com.br';
  const imageUrl = noticia.imagem.startsWith('http') 
    ? noticia.imagem 
    : `${baseUrl}${noticia.imagem}`;

  // Schema.org - NewsArticle
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: noticia.titulo,
    description: noticia.resumo,
    image: [imageUrl],
    datePublished: `${noticia.data}T12:00:00-03:00`,
    dateModified: `${noticia.data}T12:00:00-03:00`,
    author: {
      '@type': 'Person',
      name: noticia.autor,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Ph.D Sports',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.academiaphdsports.com.br/logo-phd-sports.png',
        width: 300,
        height: 60,
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/noticia/${noticia.slug}`
    },
    articleSection: noticia.categoria,
    keywords: tags.map(t => t.nome).join(', '),
    inLanguage: 'pt-BR',
    isAccessibleForFree: true,
    wordCount: noticia.conteudo.split(/\s+/).length,
    url: `${baseUrl}/noticia/${noticia.slug}`,
  };

  // Schema.org - BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: baseUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: noticia.categoria,
        item: `${baseUrl}/?categoria=${encodeURIComponent(noticia.categoria)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: noticia.titulo,
        item: `${baseUrl}/noticia/${noticia.slug}`,
      }
    ]
  };

  // Schema.org - Organization
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Ph.D Sports',
    url: 'https://www.academiaphdsports.com.br',
    logo: 'https://www.academiaphdsports.com.br/logo-phd-sports.png',
    sameAs: [
      'https://www.instagram.com/academiaphdsports/',
      'https://www.facebook.com/academiaphdsports/',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <NoticiaClient noticia={noticia} outrasNoticias={outrasNoticias} tags={tags} />
    </>
  );
}
