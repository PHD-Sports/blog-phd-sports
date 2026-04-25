'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Tag {
  id: number;
  nome: string;
  slug: string;
}

interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  conteudo: string;
  imagem: string;
  categoria: string;
  autor: string;
  data: string;
  destaque?: boolean;
  local?: string;
  citacao_ceo?: boolean;
}

interface Props {
  noticia: Noticia;
  outrasNoticias: Noticia[];
  tags: Tag[];
  tempoLeitura: number;
}

type ContentBlock =
  | { type: 'text'; value: string }
  | { type: 'gallery'; images: string[] };

function isImageUrl(text: string): boolean {
  return /^https?:\/\/[^\s]+\.(?:png|jpe?g|webp|gif)(?:\?.*)?$/i.test(text.trim());
}

function buildContentBlocks(content: string): ContentBlock[] {
  const paragraphs = content.split('\n\n');
  const blocks: ContentBlock[] = [];

  for (let i = 0; i < paragraphs.length; i++) {
    const current = paragraphs[i].trim();

    if (isImageUrl(current)) {
      const images = [current];
      while (i + 1 < paragraphs.length && isImageUrl(paragraphs[i + 1].trim())) {
        images.push(paragraphs[i + 1].trim());
        i++;
      }
      blocks.push({ type: 'gallery', images });
      continue;
    }

    blocks.push({ type: 'text', value: paragraphs[i] });
  }

  return blocks;
}

// Helper: convert inline markdown (bold, links, italic, emoji) to HTML
function renderInlineMarkdown(text: string): string {
  let html = text;
  // Escape HTML entities first
  html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#2563eb] underline hover:text-[#1d4ed8] font-medium">$1</a>');
  // Auto-link bare URLs (not already in href)
  html = html.replace(/(?<!href=")(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer" class="text-[#2563eb] underline hover:text-[#1d4ed8] font-medium">$1</a>');
  // Bold: **text**
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic: *text* (single asterisk, not inside bold)
  html = html.replace(/(?<!\*)\*([^*]+)\*(?!\*)/g, '<em>$1</em>');
  return html;
}

export default function NoticiaClient({ noticia, outrasNoticias, tags, tempoLeitura }: Props) {
  const shareUrl = `https://noticias.academiaphdsports.com.br/noticia/${noticia.slug}`;
  const shareText = encodeURIComponent(noticia.titulo);
  const shareUrlEncoded = encodeURIComponent(shareUrl);
  const contentBlocks = buildContentBlocks(noticia.conteudo);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="gradient-bg sticky top-0 z-50 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <img 
                  src="https://www.academiaphdsports.com.br/logo-phd-sports.png" 
                  alt="Ph.D Sports" 
                  className="h-12 brightness-0 invert"
                />
              </motion.div>
            </Link>
            
            <a href="https://www.academiaphdsports.com.br/seja-franqueado" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ffdc61] text-[#131d2f] px-6 py-2 rounded-full font-semibold hover:bg-[#ffe580] transition-colors shadow-lg"
              >
                Seja Franqueado
              </motion.button>
            </a>
          </div>
        </div>
      </motion.header>

      {/* Hero da Notícia */}
      <div className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          src={noticia.imagem} 
          alt={noticia.titulo}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131d2f] via-[#131d2f]/50 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-4xl mx-auto">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block bg-[#ffdc61] text-[#131d2f] px-4 py-2 rounded-full text-sm font-semibold mb-4"
            >
              {noticia.categoria}
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight"
            >
              {noticia.titulo}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-6 text-gray-300"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#ffdc61] flex items-center justify-center text-white font-bold">
                  {noticia.autor.charAt(0)}
                </div>
                <span>{noticia.autor}</span>
              </div>
              <span>•</span>
              <time dateTime={noticia.data}>
                {new Date(noticia.data + 'T12:00:00').toLocaleDateString('pt-BR', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </time>
              <span>•</span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {tempoLeitura} min de leitura
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          itemScope
          itemType="https://schema.org/NewsArticle"
        >
          {/* Resumo destacado */}
          <p className="text-xl md:text-2xl text-[#131d2f] font-medium leading-relaxed mb-8 border-l-4 border-[#ffdc61] pl-6" itemProp="description">
            {noticia.resumo}
          </p>

          {/* Conteúdo principal */}
          <div className="prose prose-lg max-w-none" itemProp="articleBody">
            {contentBlocks.map((block, idx) => {
              if (block.type === 'gallery') {
                return (
                  <section key={idx} className="not-prose my-10 rounded-3xl bg-[#131d2f] p-4 md:p-6 shadow-xl">
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#ffdc61]">Galeria</p>
                        <h3 className="text-lg font-bold text-white md:text-xl">Cobertura visual do evento</h3>
                      </div>
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
                        {block.images.length} {block.images.length === 1 ? 'foto' : 'fotos'}
                      </span>
                    </div>

                    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
                      {block.images.map((src, imageIndex) => (
                        <figure
                          key={src}
                          className="min-w-[85%] snap-center overflow-hidden rounded-2xl bg-white shadow-lg md:min-w-[70%]"
                        >
                          <img
                            src={src}
                            alt={`Imagem ${imageIndex + 1} da notícia ${noticia.titulo}`}
                            className="h-[260px] w-full object-cover md:h-[420px]"
                            loading="lazy"
                          />
                          <figcaption className="flex items-center justify-between px-4 py-3 text-sm text-gray-600">
                            <span>Ph.D Sports em destaque</span>
                            <span className="font-semibold text-[#131d2f]">{imageIndex + 1}/{block.images.length}</span>
                          </figcaption>
                        </figure>
                      ))}
                    </div>

                    <p className="mt-3 text-sm text-white/70">Arraste para o lado para ver a sequência.</p>
                  </section>
                );
              }

              const paragraph = block.value;
              // Headers
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-[#131d2f] mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }

              // List blocks (lines starting with - )
              const lines = paragraph.split('\n');
              const isListBlock = lines.every(l => l.trim().startsWith('- ') || l.trim() === '');
              if (isListBlock && lines.some(l => l.trim().startsWith('- '))) {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-2 mb-6 text-gray-700 text-lg">
                    {lines.filter(l => l.trim().startsWith('- ')).map((line, li) => (
                      <li key={li} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line.replace(/^\-\s+/, '')) }} />
                    ))}
                  </ul>
                );
              }

              // Ordered list blocks (lines starting with number.)
              const isOrderedList = lines.every(l => /^\d+\.\s/.test(l.trim()) || l.trim() === '');
              if (isOrderedList && lines.some(l => /^\d+\.\s/.test(l.trim()))) {
                return (
                  <ol key={idx} className="list-decimal list-inside space-y-2 mb-6 text-gray-700 text-lg">
                    {lines.filter(l => /^\d+\.\s/.test(l.trim())).map((line, li) => (
                      <li key={li} dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line.replace(/^\d+\.\s+/, '')) }} />
                    ))}
                  </ol>
                );
              }

              // Blockquote
              if (paragraph.startsWith('> ') || paragraph.startsWith('*"')) {
                const text = paragraph.replace(/^>\s*/, '').replace(/^\*"/, '"').replace(/"\*$/, '"');
                return (
                  <blockquote key={idx} className="bg-gray-100 border-l-4 border-[#ffdc61] p-6 rounded-r-xl my-6 italic text-gray-700 text-lg">
                    {text}
                  </blockquote>
                );
              }

              // Instagram embed (when paragraph is a single Instagram URL)
              const instaMatch = paragraph.trim().match(/^https?:\/\/(?:www\.)?instagram\.com\/(reel|p)\/([^\/?#]+)\/?(?:\?.*)?$/i);
              if (instaMatch) {
                const [, type, code] = instaMatch;
                const embedSrc = `https://www.instagram.com/${type}/${code}/embed`;
                return (
                  <div key={idx} className="my-8">
                    <div className="relative w-full" style={{ paddingBottom: '125%' }}>
                      <iframe
                        src={embedSrc}
                        className="absolute inset-0 w-full h-full rounded-xl border border-gray-200"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        loading="lazy"
                        title="Instagram Reel"
                      />
                    </div>
                  </div>
                );
              }

              // Direct image URL (single line)
              const imageMatch = paragraph.trim().match(/^https?:\/\/[^\s]+\.(?:png|jpe?g|webp|gif)(?:\?.*)?$/i);
              if (imageMatch) {
                const src = paragraph.trim();
                return (
                  <figure key={idx} className="my-8">
                    <img src={src} alt="Imagem da notícia" className="w-full rounded-xl border border-gray-200" loading="lazy" />
                  </figure>
                );
              }

              // Direct video URL (single line)
              const videoMatch = paragraph.trim().match(/^https?:\/\/[^\s]+\.(?:mp4|webm|ogg)(?:\?.*)?$/i);
              if (videoMatch) {
                const src = paragraph.trim();
                return (
                  <div key={idx} className="my-8">
                    <video controls className="w-full rounded-xl border border-gray-200" preload="metadata">
                      <source src={src} />
                      Seu navegador não suporta vídeo.
                    </video>
                  </div>
                );
              }

              // Regular paragraphs with inline markdown
              return (
                <p key={idx} className="text-gray-700 leading-relaxed text-lg mb-6" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(paragraph) }} />
              );
            })}

            {noticia.citacao_ceo !== false && (
              <blockquote className="bg-[#131d2f] text-white p-8 rounded-2xl my-8 border-l-4 border-[#ffdc61]">
                <p className="text-xl italic mb-4">
                  &ldquo;Nosso objetivo é transformar vidas através do esporte, oferecendo estrutura de qualidade e suporte completo aos nossos franqueados.&rdquo;
                </p>
                <cite className="text-[#ffdc61] font-semibold">— Viktor Rossa, CEO Ph.D Sports</cite>
              </blockquote>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-gray-200">
            {tags.map(tag => (
              <span 
                key={tag.id}
                className="bg-gray-100 text-[#131d2f] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#131d2f] hover:text-white transition-colors cursor-pointer"
              >
                #{tag.nome}
              </span>
            ))}
          </div>

          {/* Compartilhar */}
          <div className="flex items-center gap-4 mt-8 p-6 bg-gray-100 rounded-2xl">
            <span className="font-semibold text-[#131d2f]">Compartilhar:</span>
            <div className="flex gap-3">
              <motion.a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                title="Facebook"
              >
                📘
              </motion.a>
              <motion.a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                title="Twitter"
              >
                🐦
              </motion.a>
              <motion.a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                title="LinkedIn"
              >
                💼
              </motion.a>
              <motion.a
                href={`https://api.whatsapp.com/send?text=${shareText}%20${shareUrlEncoded}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
                title="WhatsApp"
              >
                📱
              </motion.a>
            </div>
          </div>
        </motion.article>

        {/* CTA Franqueado */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 gradient-bg rounded-3xl p-8 md:p-12 text-center relative overflow-hidden"
        >
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Quer fazer parte dessa história?
            </h3>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Seja um franqueado Ph.D Sports e tenha um negócio de sucesso no mercado fitness.
            </p>
            <a href="https://www.academiaphdsports.com.br/seja-franqueado" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ffdc61] text-[#131d2f] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#ffe580] transition-colors pulse-glow"
              >
                Quero Ser Franqueado →
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Outras Notícias */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-[#131d2f] mb-8 flex items-center gap-3">
            <span className="w-12 h-1 bg-[#ffdc61] rounded-full"></span>
            Leia Também
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {outrasNoticias.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-hover group bg-gray-50 rounded-2xl overflow-hidden shadow-lg"
              >
                <Link href={`/noticia/${item.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={item.imagem} 
                      alt={item.titulo}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[#ffdc61] text-sm font-semibold">{item.categoria}</span>
                    <h4 className="text-lg font-bold text-[#131d2f] mt-2 group-hover:text-[#ffdc61] transition-colors line-clamp-2">
                      {item.titulo}
                    </h4>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1019] text-white py-12 px-4 text-center">
        <img 
          src="https://www.academiaphdsports.com.br/logo-phd-sports.png" 
          alt="Ph.D Sports" 
          className="h-10 brightness-0 invert mx-auto mb-4"
        />
        <p className="text-gray-500">© 2026 Ph.D Sports - Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
