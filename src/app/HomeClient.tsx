'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

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

export default function HomeClient({ noticias, categorias }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todas');

  const categoriaNomes = ['Todas', ...categorias.map(c => c.nome)];
  
  const noticiasFiltradas = categoriaAtiva === 'Todas' 
    ? noticias 
    : noticias.filter(n => n.categoria === categoriaAtiva);

  const noticiasDestaque = noticias.filter(n => n.destaque);

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

      {/* Hero Section */}
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

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(255, 107, 53, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ffdc61] text-[#131d2f] px-8 py-4 rounded-full font-bold text-lg shadow-xl pulse-glow"
              >
                Ver Notícias
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass text-white px-8 py-4 rounded-full font-bold text-lg"
              >
                Conhecer Franquia
              </motion.button>
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

      {/* Featured News */}
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

      {/* Category Filter */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            {categoriaNomes.map((cat, index) => (
              <motion.button
                key={cat}
                onClick={() => setCategoriaAtiva(cat)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  categoriaAtiva === cat 
                    ? 'bg-[#ffdc61] text-[#131d2f] shadow-lg shadow-[#ffdc61]/30' 
                    : 'bg-white text-[#131d2f] hover:bg-[#131d2f] hover:text-white shadow-md'
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* All News Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.h3 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#131d2f] mb-8 flex items-center gap-3"
          >
            <span className="w-12 h-1 bg-[#ffdc61] rounded-full"></span>
            Todas as Notícias
          </motion.h3>

          <AnimatePresence mode="wait">
            <motion.div 
              key={categoriaAtiva}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {noticiasFiltradas.map((noticia, index) => (
                <Link href={`/noticia/${noticia.slug}`} key={noticia.id}>
                  <motion.article
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="card-hover group bg-white rounded-2xl overflow-hidden shadow-xl cursor-pointer h-full"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={noticia.imagem} 
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#131d2f]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="bg-[#131d2f] text-white px-3 py-1 rounded-full text-xs font-semibold">
                          {noticia.categoria}
                        </span>
                        <span className="text-gray-400 text-sm">{new Date(noticia.data + 'T12:00:00').toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      <h4 className="text-lg font-bold text-[#131d2f] mb-2 group-hover:text-[#ffdc61] transition-colors line-clamp-2">
                        {noticia.titulo}
                      </h4>
                      
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{noticia.resumo}</p>
                      
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <span className="text-sm text-gray-500">Por {noticia.autor}</span>
                        <motion.span
                          whileHover={{ scale: 1.1, color: '#ffdc61' }}
                          className="text-[#131d2f] font-semibold text-sm"
                        >
                          Leia →
                        </motion.span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              ))}
            </motion.div>
          </AnimatePresence>
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
                      onClick={() => setCategoriaAtiva(cat.nome)}
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
