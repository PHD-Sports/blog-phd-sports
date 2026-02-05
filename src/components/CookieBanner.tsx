'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const PRIVACY_URL = 'https://www.academiaphdsports.com.br/politica-cookies';
const STORAGE_KEY = 'phd_cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!saved) setVisible(true);
  }, []);

  const handleChoice = (value: 'accepted' | 'rejected') => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (e) {
      // ignore storage errors
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 z-[9999] max-w-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex items-center gap-2 text-[#1d4ed8] font-semibold">
            <span className="text-lg">📘</span>
            <span>Controle a sua privacidade</span>
          </div>
          <button
            onClick={() => setVisible(false)}
            aria-label="Fechar"
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-3">
          O nosso site utiliza cookies para melhorar a navegação.
        </p>

        <Link
          href={PRIVACY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#2563eb] hover:text-[#1d4ed8] underline"
        >
          Política de Privacidade
        </Link>

        <div className="flex items-center justify-between mt-4">
          <Link
            href={PRIVACY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-gray-700 underline"
          >
            As minhas opções
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleChoice('rejected')}
              className="px-4 py-1.5 rounded-full border border-gray-300 text-sm text-gray-700 hover:bg-gray-100"
            >
              Rejeitar
            </button>
            <button
              onClick={() => handleChoice('accepted')}
              className="px-4 py-1.5 rounded-full bg-[#2563eb] text-white text-sm hover:bg-[#1d4ed8]"
            >
              Aceitar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
