import { supabase } from '../main'
import type { Result, Results } from '../types'

export const getAllResults = async () => {
  let results = null
  try {
    const { data } = await supabase.from('results').select().returns<Results>()
    if (data && data.length > 0) {
      results = data.sort(
        (a, b) => b.correct_answer_count - a.correct_answer_count,
      )
    }
  } catch (e) {
    console.error(e)
  }
  return results
}

export const saveResult = async (
  resultData: Omit<Result, 'id' | 'created_at'>,
  resultId: boolean | string,
) => {
  let result = null
  try {
    if (typeof resultId === 'string') {
      const { data } = await supabase
        .from('results')
        .update(resultData)
        .eq('id', resultId)
        .select()
        .returns<Result>()
      result = data
    } else {
      const { data } = await supabase
        .from('results')
        .insert([resultData])
        .select()
        .returns<Result>()
      result = data
    }
  } catch (e) {
    console.error(e)
  }
  return result
}
