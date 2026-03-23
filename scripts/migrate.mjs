import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const noticias = JSON.parse(readFileSync('./src/data/noticias.json', 'utf-8')).noticias;

async function migrate() {
  console.log('🚀 Iniciando migração...\n');

  // 1. Criar categorias únicas
  const categoriasUnicas = [...new Set(noticias.map(n => n.categoria))];
  const categoriaMap = {};

  for (const nome of categoriasUnicas) {
    const slug = nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const cores = {
      'Expansão': '#2563eb',
      'Empreendedorismo': '#16a34a',
      'Institucional': '#7c3aed',
      'Tecnologia': '#0891b2',
      'Tendências': '#ea580c',
      'Resultados': '#dc2626',
      'Investimento': '#ca8a04',
    };

    const { data, error } = await supabase
      .from('categorias')
      .upsert({ nome, slug, cor: cores[nome] || '#131d2f' }, { onConflict: 'nome' })
      .select()
      .single();

    if (error) {
      console.error(`❌ Categoria "${nome}":`, error.message);
    } else {
      categoriaMap[nome] = data.id;
      console.log(`✅ Categoria: ${nome} (id: ${data.id})`);
    }
  }

  // 2. Criar tags
  const tagNomes = [
    'Fitness', 'Academia', 'Franquia', 'Empreendedorismo', 'Saúde',
    'Bem-estar', 'Musculação', 'Investimento', 'Negócios', 'Tecnologia',
    'Wearables', 'Inteligência Artificial', 'Longevidade', 'Treino',
    'Expansão', 'Mercado Fitness', 'Ph.D Sports', 'VS Gold', 'Flex Fit',
    'Santa Catarina', 'Paraná', 'Consolidação', 'Aquisição', 'Fé',
    'Propósito', 'Liderança'
  ];
  const tagMap = {};

  for (const nome of tagNomes) {
    const slug = nome.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

    const { data, error } = await supabase
      .from('tags')
      .upsert({ nome, slug }, { onConflict: 'nome' })
      .select()
      .single();

    if (error) {
      console.error(`❌ Tag "${nome}":`, error.message);
    } else {
      tagMap[nome] = data.id;
    }
  }
  console.log(`\n✅ ${Object.keys(tagMap).length} tags criadas\n`);

  // 3. Migrar notícias
  for (const noticia of noticias) {
    const row = {
      id: noticia.id,
      slug: noticia.slug,
      titulo: noticia.titulo,
      resumo: noticia.resumo,
      conteudo: noticia.conteudo,
      imagem: noticia.imagem,
      categoria: noticia.categoria,
      autor: noticia.autor,
      data: noticia.data,
      destaque: noticia.destaque || false,
      local: noticia.local || null,
      citacao_ceo: noticia.citacaoCeo || false,
      categoria_id: categoriaMap[noticia.categoria] || null,
    };

    const { error } = await supabase
      .from('noticias')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error(`❌ Notícia ${noticia.id}:`, error.message);
    } else {
      console.log(`✅ Notícia ${noticia.id}: ${noticia.titulo.substring(0, 60)}...`);
    }
  }

  // 4. Vincular tags às notícias
  const tagMapping = {
    14: ['Ph.D Sports', 'Flex Fit', 'Santa Catarina', 'Paraná', 'Aquisição', 'Consolidação', 'Expansão', 'Mercado Fitness'],
    13: ['Ph.D Sports', 'Empreendedorismo', 'Fé', 'Propósito', 'Liderança', 'Negócios'],
    12: ['Ph.D Sports', 'VS Gold', 'Franquia', 'Investimento', 'Consolidação', 'Mercado Fitness', 'Negócios'],
    7: ['Inteligência Artificial', 'Tecnologia', 'Treino', 'Fitness', 'Academia'],
    8: ['Wearables', 'Tecnologia', 'Fitness', 'Saúde', 'Bem-estar'],
    9: ['Treino', 'Longevidade', 'Musculação', 'Fitness', 'Saúde', 'Academia'],
    1: ['Ph.D Sports', 'Expansão', 'Franquia', 'Mercado Fitness'],
    2: ['Franquia', 'Empreendedorismo', 'Negócios', 'Investimento', 'Fitness'],
    4: ['Ph.D Sports', 'Franquia', 'Negócios', 'Mercado Fitness'],
    5: ['Ph.D Sports', 'Franquia', 'Investimento', 'Negócios', 'Fitness'],
  };

  console.log('\n📎 Vinculando tags...');
  for (const [noticiaId, tags] of Object.entries(tagMapping)) {
    for (const tagNome of tags) {
      if (tagMap[tagNome]) {
        const { error } = await supabase
          .from('noticias_tags')
          .upsert({ noticia_id: Number(noticiaId), tag_id: tagMap[tagNome] });

        if (error) {
          console.error(`  ❌ Tag "${tagNome}" → Notícia ${noticiaId}:`, error.message);
        }
      }
    }
    console.log(`  ✅ Notícia ${noticiaId}: ${tags.length} tags`);
  }

  console.log('\n🎉 Migração completa!');
}

migrate();
