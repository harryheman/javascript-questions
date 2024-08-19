import { supabase } from '../main'
import type { Results } from '../types'

export default async function clear() {
  try {
    const { data } = await supabase.from('results').select().returns<Results>()
    if (data && data.length > 0) {
      const ids = data.map((i) => i.id)
      const { error } = await supabase.from('results').delete().in('id', ids)
      if (error) throw error
    }
    console.log('Таблица "results" очищена')
    return true
  } catch (e) {
    console.error(e)
  }
  return false
}
