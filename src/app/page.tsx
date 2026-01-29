import { getNoticias, getCategorias } from '@/lib/supabase';
import HomeClient from './HomeClient';

// Revalidar a cada 60 segundos (ISR)
export const revalidate = 60;

export default async function Home() {
  const noticias = await getNoticias();
  const categorias = await getCategorias();

  return <HomeClient noticias={noticias} categorias={categorias} />;
}
