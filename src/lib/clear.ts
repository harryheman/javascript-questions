import { supabase } from '../main'

export default async function clear() {
  try {
    await supabase.from('results').delete()
    console.log('Таблица "results" очищена')
  } catch (e) {
    console.error(e)
  }
}
