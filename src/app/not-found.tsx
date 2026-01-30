'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="relative z-10 px-4 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-4">
            <img 
              src="https://www.academiaphdsports.com.br/logo-phd-sports.png" 
              alt="Ph.D Sports" 
              className="h-12 brightness-0 invert"
            />
            <div className="hidden md:block">
              <h1 className="text-white font-bold text-xl">Ph.D Sports</h1>
              <p className="text-gray-300 text-sm">Blog de Notícias</p>
            </div>
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
      </header>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#ffdc61] rounded-full opacity-20"
            initial={{ 
              x: Math.random() * 1200, 
              y: Math.random() * 800,
              scale: Math.random() * 2
            }}
            animate={{ 
              y: [null, Math.random() * -200],
              opacity: [0.1, 0.4, 0.1],
              scale: [null, Math.random() * 3, Math.random()]
            }}
            transition={{ 
              duration: 4 + Math.random() * 6,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Number */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative mb-8"
          >
            <span className="text-[180px] md:text-[240px] font-black text-white/5 leading-none select-none block">
              404
            </span>
            <motion.div 
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <motion.span 
                  className="text-7xl md:text-9xl font-black text-[#ffdc61]"
                  animate={{ rotate: [0, -5, 5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  4
                </motion.span>
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 360]
                  }}
                  transition={{ 
                    scale: { duration: 2, repeat: Infinity },
                    rotate: { duration: 8, repeat: Infinity, ease: 'linear' }
                  }}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full border-4 border-[#ffdc61] border-dashed flex items-center justify-center"
                >
                  <span className="text-4xl md:text-5xl">🏋️</span>
                </motion.div>
                <motion.span 
                  className="text-7xl md:text-9xl font-black text-[#ffdc61]"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                >
                  4
                </motion.span>
              </div>
            </motion.div>
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Ops! Essa página foi
              <span className="text-[#ffdc61] block">fazer um treino</span>
            </h2>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed">
              A notícia ou página que você está procurando não existe, foi removida ou está descansando entre as séries. 💪
            </p>
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 20px 40px rgba(255, 220, 97, 0.3)' }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#ffdc61] text-[#131d2f] px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:bg-[#ffe580] transition-colors pulse-glow w-full sm:w-auto"
              >
                ← Voltar para o Início
              </motion.button>
            </Link>
            <a href="https://www.academiaphdsports.com.br/seja-franqueado" target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="glass text-white px-8 py-4 rounded-full font-bold text-lg border border-white/20 w-full sm:w-auto"
              >
                Conheça a Franquia
              </motion.button>
            </a>
          </motion.div>

          {/* Fun Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-3 gap-6 max-w-md mx-auto"
          >
            {[
              { number: '140+', label: 'Unidades' },
              { number: '9', label: 'Estados' },
              { number: '∞', label: 'Motivação' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + i * 0.15 }}
                className="text-center"
              >
                <div className="text-2xl md:text-3xl font-black text-[#ffdc61]">{stat.number}</div>
                <div className="text-gray-400 text-xs md:text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-4 py-6 text-center">
        <p className="text-gray-500 text-sm">© 2026 Ph.D Sports - Muito Além do Treino</p>
      </footer>
    </div>
  );
}
