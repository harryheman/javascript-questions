import { supabase } from '../main'
import { Result } from '../types/index'
import clear from './clear'

export default async function seed() {
  const dataArr: Omit<Result, 'id' | 'created_at'>[] = []

  const success = await clear()
  if (!success) return

  for (let i = 0; i < 100; i++) {
    const question_count = i + 1
    const correct_answer_count = Math.floor(Math.random() * question_count) + 1
    const correct_answer_percent = Math.floor(
      (correct_answer_count / question_count) * 100,
    )
    const data: Omit<Result, 'id' | 'created_at'> = {
      user_id: `id-${question_count}`,
      user_name: `User ${question_count}`,
      question_count,
      correct_answer_count,
      correct_answer_percent,
    }
    dataArr.push(data)
  }
  try {
    const { error } = await supabase.from('results').insert(dataArr)
    if (error) throw error
    console.log('Таблица "results" заполнена фиктивными данными')
  } catch (e) {
    console.error(e)
  }
}
