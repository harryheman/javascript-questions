import { getAllResults } from '../actions/results'
import { Result } from '../types'

export default async function canSave(
  resultData: Pick<Result, 'question_count' | 'correct_answer_percent'>,
) {
  try {
    const results = await getAllResults()
    if (!results) return false
    if (results.length < 100) {
      return true
    }

    const worseResult = results[results.length - 1]

    console.log(worseResult)

    if (
      resultData.question_count >= worseResult.question_count &&
      resultData.correct_answer_percent >= worseResult.correct_answer_percent
    ) {
      return worseResult.id
    }

    return false
  } catch (e) {
    console.error(e)
  }
  return false
}
