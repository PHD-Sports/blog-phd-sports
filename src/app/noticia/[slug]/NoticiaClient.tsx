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
}

interface Props {
  noticia: Noticia;
  outrasNoticias: Noticia[];
  tags: Tag[];
  tempoLeitura: number;
}

export default function NoticiaClient({ noticia, outrasNoticias, tags, tempoLeitura }: Props) {
  const shareUrl = `https://noticias.academiaphdsports.com.br/noticia/${noticia.slug}`;
  const shareText = encodeURIComponent(noticia.titulo);
  const shareUrlEncoded = encodeURIComponent(shareUrl);

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
            {noticia.conteudo.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-[#131d2f] mt-8 mb-4">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              // Render bold text within paragraphs
              const parts = paragraph.split(/(\*\*[^*]+\*\*)/g);
              return (
                <p key={idx} className="text-gray-700 leading-relaxed text-lg mb-6">
                  {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                      return <strong key={i}>{part.slice(2, -2)}</strong>;
                    }
                    return part;
                  })}
                </p>
              );
            })}

            <blockquote className="bg-[#131d2f] text-white p-8 rounded-2xl my-8 border-l-4 border-[#ffdc61]">
              <p className="text-xl italic mb-4">
                &ldquo;Nosso objetivo é transformar vidas através do esporte, oferecendo estrutura de qualidade e suporte completo aos nossos franqueados.&rdquo;
              </p>
              <cite className="text-[#ffdc61] font-semibold">— Viktor Rossa, CEO Ph.D Sports</cite>
            </blockquote>
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
