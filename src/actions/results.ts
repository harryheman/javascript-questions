import { supabase } from '../main'
import type { Result, Results } from '../types'

export const getAllResults = async () => {
  let results = null
  try {
    const { data } = await supabase.from('results').select().returns<Results>()
    if (data && data.length > 0) {
      results = data.sort(
        (a, b) =>
          b.question_count - a.question_count ||
          b.correct_answer_percent - a.correct_answer_percent,
      )
    }
  } catch (e) {
    console.error(e)
  }
  return results
}

export const saveResult = async (
  resultData: Omit<Result, 'id' | 'created_at'>,
  worseResultId: boolean | string,
) => {
  let result = null
  try {
    if (typeof worseResultId === 'string') {
      const { data } = await supabase
        .from('results')
        .update(resultData)
        .eq('id', worseResultId)
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
