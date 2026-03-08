'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function FranqueadoPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    cidade: '',
    estado: '',
    capitalDisponivel: '',
    experiencia: '',
    comoConheceu: '',
    mensagem: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const nextStep = () => setStep(s => Math.min(s + 1, 3));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const beneficios = [
    { icon: '🏆', title: 'Marca Consolidada', desc: 'Mais de 10 anos de experiência no mercado fitness' },
    { icon: '📈', title: 'Alto Retorno', desc: 'ROI médio de 24 a 36 meses com faturamento crescente' },
    { icon: '🎓', title: 'Treinamento Completo', desc: 'Capacitação total para você e sua equipe' },
    { icon: '🛠️', title: 'Suporte 360°', desc: 'Acompanhamento em marketing, gestão e operação' },
    { icon: '📍', title: '+200 Unidades', desc: 'Rede presente em 9 estados do Brasil' },
    { icon: '💡', title: 'Inovação Constante', desc: 'Tecnologia e metodologias sempre atualizadas' },
  ];

  const investimentos = [
    { tipo: 'Express', area: '200-400m²', valor: 'R$ 250.000', cor: 'from-blue-500 to-blue-600' },
    { tipo: 'Standard', area: '400-800m²', valor: 'R$ 450.000', cor: 'from-[#ffdc61] to-yellow-500' },
    { tipo: 'Premium', area: '800m²+', valor: 'R$ 700.000', cor: 'from-yellow-500 to-yellow-600' },
  ];

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
            
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="text-white hover:text-[#ffdc61] font-semibold transition-colors"
              >
                ← Voltar ao Blog
              </motion.button>
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero */}
      <section className="gradient-bg relative overflow-hidden py-20 md:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffdc61] rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block bg-[#ffdc61]/20 text-[#ffdc61] px-6 py-2 rounded-full text-sm font-bold mb-6 border border-[#ffdc61]/30"
            >
              🚀 SEJA UM FRANQUEADO
            </motion.span>
            
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Transforme Sua Vida em um
              <span className="text-gradient block mt-2">Negócio de Sucesso</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Faça parte da maior rede de academias do Brasil. 
              Investimento seguro, retorno garantido e suporte completo.
            </p>

            <div className="flex flex-wrap justify-center gap-8 mt-12">
              {[
                { num: '200+', label: 'Unidades' },
                { num: '500K+', label: 'Alunos' },
                { num: '98%', label: 'Satisfação' },
                { num: '10+', label: 'Anos' },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-black text-[#ffdc61]">{stat.num}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f9fafb" d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"/>
          </svg>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#131d2f] mb-4">
              Por que ser um <span className="text-[#ffdc61]">Franqueado PHD?</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos todo o suporte necessário para você ter sucesso no mercado fitness
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {beneficios.map((ben, i) => (
              <motion.div
                key={ben.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all border border-gray-100"
              >
                <div className="text-4xl mb-4">{ben.icon}</div>
                <h3 className="text-xl font-bold text-[#131d2f] mb-2">{ben.title}</h3>
                <p className="text-gray-600">{ben.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modelos de Investimento */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#131d2f] mb-4">
              Modelos de <span className="text-[#ffdc61]">Investimento</span>
            </h2>
            <p className="text-gray-600">Escolha o formato ideal para seu perfil</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {investimentos.map((inv, i) => (
              <motion.div
                key={inv.tipo}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-gradient-to-br ${inv.cor} p-8 rounded-3xl text-white overflow-hidden`}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">{inv.tipo}</h3>
                  <p className="opacity-80 mb-6">Área: {inv.area}</p>
                  <div className="text-4xl font-black mb-2">{inv.valor}</div>
                  <p className="opacity-80 text-sm">Investimento inicial</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-20 px-4 gradient-bg relative overflow-hidden" id="formulario">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {/* Header do Form */}
                  <div className="bg-[#131d2f] p-8 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                      Comece Sua Jornada
                    </h2>
                    <p className="text-gray-400">Preencha o formulário e nossa equipe entrará em contato</p>
                    
                    {/* Progress Steps */}
                    <div className="flex justify-center gap-4 mt-8">
                      {[1, 2, 3].map(s => (
                        <div 
                          key={s}
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                            s === step 
                              ? 'bg-[#ffdc61] text-[#131d2f] scale-110' 
                              : s < step 
                                ? 'bg-green-500 text-white' 
                                : 'bg-gray-700 text-gray-400'
                          }`}
                        >
                          {s < step ? '✓' : s}
                        </div>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 md:p-12">
                    <AnimatePresence mode="wait">
                      {/* Step 1 - Dados Pessoais */}
                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-bold text-[#131d2f] mb-6">📋 Seus Dados</h3>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Completo *</label>
                            <input
                              type="text"
                              name="nome"
                              value={formData.nome}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                              placeholder="Digite seu nome completo"
                            />
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">E-mail *</label>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                                placeholder="seu@email.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp *</label>
                              <input
                                type="tel"
                                name="telefone"
                                value={formData.telefone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                                placeholder="(00) 00000-0000"
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Cidade *</label>
                              <input
                                type="text"
                                name="cidade"
                                value={formData.cidade}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                                placeholder="Sua cidade"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-semibold text-gray-700 mb-2">Estado *</label>
                              <select
                                name="estado"
                                value={formData.estado}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                              >
                                <option value="">Selecione</option>
                                {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                                  <option key={uf} value={uf}>{uf}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2 - Perfil do Investidor */}
                      {step === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-bold text-[#131d2f] mb-6">💰 Perfil de Investimento</h3>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Capital Disponível para Investimento *</label>
                            <select
                              name="capitalDisponivel"
                              value={formData.capitalDisponivel}
                              onChange={handleChange}
                              required
                              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                            >
                              <option value="">Selecione</option>
                              <option value="ate-300k">Até R$ 300.000</option>
                              <option value="300k-500k">R$ 300.000 a R$ 500.000</option>
                              <option value="500k-800k">R$ 500.000 a R$ 800.000</option>
                              <option value="acima-800k">Acima de R$ 800.000</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Experiência com Negócios</label>
                            <select
                              name="experiencia"
                              value={formData.experiencia}
                              onChange={handleChange}
                              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                            >
                              <option value="">Selecione</option>
                              <option value="nenhuma">Nenhuma experiência</option>
                              <option value="pouca">Pouca experiência</option>
                              <option value="media">Experiência moderada</option>
                              <option value="muita">Muita experiência</option>
                              <option value="empresario">Já sou empresário</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Como conheceu a Ph.D Sports?</label>
                            <select
                              name="comoConheceu"
                              value={formData.comoConheceu}
                              onChange={handleChange}
                              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors text-gray-800"
                            >
                              <option value="">Selecione</option>
                              <option value="google">Google</option>
                              <option value="instagram">Instagram</option>
                              <option value="facebook">Facebook</option>
                              <option value="indicacao">Indicação</option>
                              <option value="unidade">Conheci uma unidade</option>
                              <option value="outro">Outro</option>
                            </select>
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 - Mensagem Final */}
                      {step === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="space-y-6"
                        >
                          <h3 className="text-xl font-bold text-[#131d2f] mb-6">💬 Mensagem Final</h3>
                          
                          <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                              Conte-nos mais sobre você e seus objetivos
                            </label>
                            <textarea
                              name="mensagem"
                              value={formData.mensagem}
                              onChange={handleChange}
                              rows={5}
                              className="w-full px-4 py-4 rounded-xl border-2 border-gray-200 focus:border-[#ffdc61] focus:outline-none transition-colors resize-none text-gray-800"
                              placeholder="O que te motivou a buscar uma franquia? Qual sua expectativa?"
                            />
                          </div>

                          <div className="bg-gray-50 p-6 rounded-xl">
                            <h4 className="font-semibold text-[#131d2f] mb-4">📝 Resumo do seu cadastro:</h4>
                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                              <p><strong>Nome:</strong> {formData.nome}</p>
                              <p><strong>Email:</strong> {formData.email}</p>
                              <p><strong>Telefone:</strong> {formData.telefone}</p>
                              <p><strong>Cidade:</strong> {formData.cidade} - {formData.estado}</p>
                            </div>
                          </div>

                          <label className="flex items-start gap-3 cursor-pointer">
                            <input type="checkbox" required className="mt-1 w-5 h-5 accent-[#ffdc61]" />
                            <span className="text-sm text-gray-600">
                              Concordo em receber contato da equipe Ph.D Sports sobre oportunidades de franquia.
                            </span>
                          </label>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Botões de Navegação */}
                    <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                      {step > 1 ? (
                        <motion.button
                          type="button"
                          onClick={prevStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-6 py-3 text-[#131d2f] font-semibold hover:text-[#ffdc61] transition-colors"
                        >
                          ← Voltar
                        </motion.button>
                      ) : <div />}

                      {step < 3 ? (
                        <motion.button
                          type="button"
                          onClick={nextStep}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#ffdc61] text-[#131d2f] px-8 py-3 rounded-full font-semibold hover:bg-[#ffe580] transition-colors"
                        >
                          Próximo →
                        </motion.button>
                      ) : (
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-[#ffdc61] text-[#131d2f] px-8 py-3 rounded-full font-semibold hover:bg-[#ffe580] transition-colors pulse-glow"
                        >
                          Enviar Cadastro 🚀
                        </motion.button>
                      )}
                    </div>
                  </form>
                </motion.div>
              ) : (
                /* Sucesso */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-12 md:p-20 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
                  >
                    <span className="text-5xl">✓</span>
                  </motion.div>
                  
                  <h2 className="text-3xl font-bold text-[#131d2f] mb-4">
                    Cadastro Enviado com Sucesso!
                  </h2>
                  
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Obrigado pelo interesse em ser um franqueado Ph.D Sports! 
                    Nossa equipe entrará em contato em até 48 horas.
                  </p>

                  <Link href="/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#131d2f] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#1e2d47] transition-colors"
                    >
                      Voltar ao Blog
                    </motion.button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
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
