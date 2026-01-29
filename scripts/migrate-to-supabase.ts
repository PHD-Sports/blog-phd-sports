import { createClient } from '@supabase/supabase-js';
import noticias from '../src/data/noticias.json';

const supabaseUrl = 'https://pmsonnneoygqarauebuz.supabase.co';
const supabaseKey = 'sb_publishable_G7efhcOB0vQvdDJurCqJyg_P2S1eslG';

const supabase = createClient(supabaseUrl, supabaseKey);

async function migrate() {
  console.log('🚀 Iniciando migração para Supabase...\n');

  for (const noticia of noticias.noticias) {
    const row = {
      id: noticia.id,
      slug: (noticia as any).slug,
      titulo: noticia.titulo,
      resumo: noticia.resumo,
      conteudo: noticia.conteudo,
      imagem: noticia.imagem,
      categoria: noticia.categoria,
      autor: noticia.autor,
      data: noticia.data,
      destaque: noticia.destaque || false,
      local: (noticia as any).local || null,
      citacao_ceo: (noticia as any).citacaoCeo || false,
    };

    const { error } = await supabase
      .from('noticias')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Erro na notícia ${noticia.id}:`, error.message);
    } else {
      console.log(`✅ Notícia ${noticia.id}: ${noticia.titulo.substring(0, 50)}...`);
    }
  }

  console.log('\n🎉 Migração concluída!');
}

migrate();
