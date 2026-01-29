'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { getNoticiasPaginadas } from '@/lib/supabase';

interface Categoria {
  id: number;
  nome: string;
  slug: string;
  cor: string;
}

interface Noticia {
  id: number;
  slug: string;
  titulo: string;
  resumo: string;
  imagem: string;
  categoria: string;
  autor: string;
  data: string;
  destaque: boolean;
}

interface Props {
  noticias: Noticia[];
  categorias: Categoria[];
}

const PER_PAGE = 6;

export default function HomeClient({ noticias: noticiasIniciais, categorias }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');
  const [busca, setBusca] = useState('');
  const [buscaAtiva, setBuscaAtiva] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [todasNoticias, setTodasNoticias] = useState<Noticia[]>(noticiasIniciais);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(noticiasIniciais.length);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const noticiasDestaque = noticiasIniciais.filter(n => n.destaque);

  // Buscar notícias quando categoria ou busca mudar
  const fetchNoticias = useCallback(async (pageNum: number, reset: boolean = false) => {
    setLoading(true);
    try {
      const result = await getNoticiasPaginadas(
        pageNum, 
        PER_PAGE, 
        categoriaAtiva, 
        buscaAtiva
      );
      
      if (reset) {
        setTodasNoticias(result.data);
      } else {
        setTodasNoticias(prev => [...prev, ...result.data]);
      }
      
      setTotal(result.total);
      setHasMore((pageNum + 1) * PER_PAGE < result.total);
    } catch (err) {
      console.error('Erro ao buscar:', err);
    }
    setLoading(false);
  }, [categoriaAtiva, buscaAtiva]);

  // Reset ao mudar categoria ou busca
  useEffect(() => {
    setPage(0);
    fetchNoticias(0, true);
  }, [categoriaAtiva, buscaAtiva, fetchNoticias]);

  // Infinite scroll observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          const nextPage = page + 1;
          setPage(nextPage);
          fetchNoticias(nextPage, false);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loading, page, fetchNoticias]);

  // Abrir search com focus
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setBuscaAtiva(busca);
  };

  const clearSearch = () => {
    setBusca('');
    setBuscaAtiva('');
    setSearchOpen(false);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="gradient-bg sticky top-0 z-50 shadow-2xl"
      >
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src="https://www.academiaphdsports.com.br/logo-phd-sports.png" 
                alt="Ph.D Sports" 
                className="h-12 brightness-0 invert"
              />
              <div className="hidden md:block">
                <h1 className="text-white font-bold text-xl">Ph.D Sports</h1>
                <p className="text-gray-300 text-sm">Blog de Notícias</p>
              </div>
            </motion.div>
            
            <nav className="hidden md:flex items-center gap-8">
              {['Home', 'Franquias', 'Sobre', 'Contato'].map((item, i) => (
                <motion.a
                  key={item}
                  href="#"
                  className="text-white hover:text-[#ffdc61] transition-colors font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  whileHover={{ scale: 1.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              {/* Search Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchOpen(!searchOpen)}
                className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </motion.button>

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

          {/* Search Bar Expandida */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <form onSubmit={handleSearch} className="pt-4 pb-2">
                  <div className="relative max-w-2xl mx-auto">
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={busca}
                      onChange={(e) => setBusca(e.target.value)}
                      placeholder="Pesquisar notícias..."
                      className="w-full px-6 py-4 pl-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#ffdc61] focus:ring-2 focus:ring-[#ffdc61]/20 text-lg"
                    />
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                      {buscaAtiva && (
                        <motion.button
                          type="button"
                          onClick={clearSearch}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-3 py-1.5 bg-white/20 text-white rounded-full text-sm hover:bg-white/30 transition-colors"
                        >
                          ✕ Limpar
                        </motion.button>
                      )}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-5 py-1.5 bg-[#ffdc61] text-[#131d2f] rounded-full font-semibold text-sm hover:bg-[#ffe580] transition-colors"
                      >
                        Buscar
                      </motion.button>
                    </div>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Resultado de Busca Banner */}
      <AnimatePresence>
        {buscaAtiva && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#131d2f] border-b border-white/10 overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <p className="text-white">
                🔍 Resultados para <strong className="text-[#ffdc61]">&ldquo;{buscaAtiva}&rdquo;</strong>
                <span className="text-gray-400 ml-2">({total} {total === 1 ? 'notícia encontrada' : 'notícias encontradas'})</span>
              </p>
              <button onClick={clearSearch} className="text-gray-400 hover:text-white transition-colors text-sm">
                ✕ Limpar busca
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section - Esconde quando pesquisando */}
      {!buscaAtiva && (
        <section className="gradient-bg relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ 
                  x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                  y: -10,
                  opacity: 0 
                }}
                animate={{ 
                  y: typeof window !== 'undefined' ? window.innerHeight + 10 : 800,
                  opacity: [0, 1, 0]
                }}
                transition={{ 
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.span 
                className="inline-block bg-[#ffdc61]/20 text-[#ffdc61] px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-[#ffdc61]/30"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚀 Notícias & Empreendedorismo
              </motion.span>
              
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
                Transforme Seu Futuro com
                <span className="text-gradient block mt-2">Ph.D Sports</span>
              </h2>
              
              <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                Descubra as últimas novidades do mundo fitness, dicas de empreendedorismo 
                e oportunidades de negócio com a maior rede de academias do Brasil.
              </p>

              {/* Search CTA */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="max-w-xl mx-auto"
              >
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    onFocus={() => setSearchOpen(true)}
                    placeholder="🔍 O que você está procurando?"
                    className="w-full px-8 py-5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#ffdc61] focus:ring-2 focus:ring-[#ffdc61]/20 text-lg shadow-2xl"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#ffdc61] text-[#131d2f] px-6 py-3 rounded-full font-bold hover:bg-[#ffe580] transition-colors"
                  >
                    Buscar
                  </motion.button>
                </form>
              </motion.div>
            </motion.div>
          </div>

          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" className="w-full h-auto">
              <path 
                fill="#f8fafc" 
                d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              />
            </svg>
          </div>
        </section>
      )}

      {/* Featured News - Esconde quando pesquisando */}
      {!buscaAtiva && noticiasDestaque.length > 0 && (
        <section className="py-16 px-4 -mt-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.h3 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-[#131d2f] mb-8 flex items-center gap-3"
            >
              <span className="w-12 h-1 bg-[#ffdc61] rounded-full"></span>
              Destaques
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-8">
              {noticiasDestaque.map((noticia, index) => (
                <Link href={`/noticia/${noticia.slug}`} key={noticia.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="card-hover group relative overflow-hidden rounded-3xl shadow-2xl bg-white cursor-pointer"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={noticia.imagem} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131d2f] via-transparent to-transparent" />
                      <span className="absolute top-4 left-4 bg-[#ffdc61] text-[#131d2f] px-4 py-1 rounded-full text-sm font-semibold">
                        {noticia.categoria}
                      </span>
                    </div>
                    <div className="p-6 bg-[#131d2f]">
                      <h4 className="text-xl font-bold text-white mb-3 group-hover:text-[#ffdc61] transition-colors">
                        {noticia.titulo}
                      </h4>
                      <p className="text-gray-300 mb-4 line-clamp-2">{noticia.resumo}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm">{new Date(noticia.data + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                        <motion.span
                          whileHover={{ x: 5 }}
                          className="text-[#ffdc61] font-semibold flex items-center gap-2"
                        >
                          Ler mais 
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className={`py-8 px-4 ${buscaAtiva ? 'pt-12' : ''}`}>
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {['Todas', ...categorias.map(c => c.nome)].map((cat, index) => {
              const catObj = categorias.find(c => c.nome === cat);
              return (
                <motion.button
                  key={cat}
                  onClick={() => {
                    setCategoriaAtiva(cat);
                    if (buscaAtiva) clearSearch();
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    categoriaAtiva === cat 
                      ? 'text-[#131d2f] shadow-lg shadow-[#ffdc61]/30'
                      : 'bg-white text-[#131d2f] hover:bg-[#131d2f] hover:text-white shadow-md'
                  }`}
                  style={categoriaAtiva === cat ? { 
                    backgroundColor: catObj?.cor || '#ffdc61',
                    color: '#fff'
                  } : {}}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* All News Grid - Infinite Scroll */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex items-center justify-between mb-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-[#131d2f] flex items-center gap-3">
              <span className="w-12 h-1 bg-[#ffdc61] rounded-full"></span>
              {buscaAtiva ? 'Resultados' : categoriaAtiva === 'Todas' ? 'Todas as Notícias' : categoriaAtiva}
            </h3>
            <span className="text-gray-400 text-sm font-medium">
              {total} {total === 1 ? 'notícia' : 'notícias'}
            </span>
          </motion.div>

          {todasNoticias.length === 0 && !loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h4 className="text-2xl font-bold text-[#131d2f] mb-2">Nenhuma notícia encontrada</h4>
              <p className="text-gray-500 mb-6">
                {buscaAtiva 
                  ? `Não encontramos resultados para "${buscaAtiva}"`
                  : 'Nenhuma notícia nesta categoria ainda'}
              </p>
              <motion.button
                onClick={clearSearch}
                whileHover={{ scale: 1.05 }}
                className="bg-[#ffdc61] text-[#131d2f] px-6 py-3 rounded-full font-semibold"
              >
                Ver todas as notícias
              </motion.button>
            </motion.div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {todasNoticias.map((noticia, index) => (
                  <motion.div
                    key={`${noticia.id}-${categoriaAtiva}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: (index % PER_PAGE) * 0.08 }}
                    layout
                  >
                    <Link href={`/noticia/${noticia.slug}`}>
                      <article className="card-hover group bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={noticia.imagem} 
                            alt={noticia.titulo}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#131d2f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        
                        <div className="p-6 flex flex-col flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="bg-[#131d2f] text-white px-3 py-1 rounded-full text-xs font-semibold">
                              {noticia.categoria}
                            </span>
                            <span className="text-gray-400 text-sm">{new Date(noticia.data + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                          </div>
                          
                          <h4 className="text-lg font-bold text-[#131d2f] mb-2 group-hover:text-[#ffdc61] transition-colors line-clamp-2">
                            {noticia.titulo}
                          </h4>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{noticia.resumo}</p>
                          
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Por {noticia.autor}</span>
                            <span className="text-[#131d2f] font-semibold text-sm group-hover:text-[#ffdc61] transition-colors">
                              Leia →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          {/* Loading Spinner */}
          {loading && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center py-12"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-[#ffdc61] border-t-transparent rounded-full animate-spin" />
                <span className="text-gray-500 font-medium">Carregando mais notícias...</span>
              </div>
            </motion.div>
          )}

          {/* Infinite Scroll Trigger */}
          {hasMore && !loading && (
            <div ref={observerRef} className="h-20" />
          )}

          {/* End of List */}
          {!hasMore && todasNoticias.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-1 bg-[#ffdc61] rounded-full mx-auto mb-4" />
              <p className="text-gray-400 text-sm">Você viu todas as notícias 🎉</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 px-4 gradient-bg relative overflow-hidden">
        <motion.div 
          className="max-w-3xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Fique por Dentro das Novidades
          </h3>
          <p className="text-gray-300 mb-8">
            Receba as últimas notícias e oportunidades de negócio diretamente no seu email.
          </p>
          
          <motion.form 
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <input 
              type="email" 
              placeholder="Seu melhor email"
              className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#ffdc61] backdrop-blur-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-[#ffdc61] text-[#131d2f] px-8 py-4 rounded-full font-bold shadow-xl hover:bg-[#ffe580] transition-colors"
            >
              Inscrever
            </motion.button>
          </motion.form>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a1019] text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img 
                src="https://www.academiaphdsports.com.br/logo-phd-sports.png" 
                alt="Ph.D Sports" 
                className="h-12 brightness-0 invert mb-4"
              />
              <p className="text-gray-400">
                A maior rede de academias do Brasil. Transformando vidas através do esporte.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-[#ffdc61]">Links Rápidos</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Notícias</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Franquias</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-[#ffdc61]">Categorias</h5>
              <ul className="space-y-2 text-gray-400">
                {categorias.map(cat => (
                  <li key={cat.id}>
                    <button 
                      onClick={() => {
                        setCategoriaAtiva(cat.nome);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="hover:text-white transition-colors"
                    >
                      {cat.nome}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h5 className="font-bold mb-4 text-[#ffdc61]">Contato</h5>
              <ul className="space-y-2 text-gray-400">
                <li>contato@phdsports.com.br</li>
                <li>(41) 3000-0000</li>
                <li>Curitiba, PR - Brasil</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2026 Ph.D Sports - Todos os direitos reservados</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
