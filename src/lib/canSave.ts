import { Doc } from '../convex/_generated/dataModel'

export default async function canSave(
  results: Doc<'results'>[],
  correctAnswerCount: number,
) {
  try {
    if (!results || results.length < 100) {
      return true
    }

    // Находим худший результат
    const worstResult = results[results.length - 1]

    if (correctAnswerCount >= worstResult.correctAnswerCount) {
      return worstResult._id
    }

    // Находим результат с равным количеством правильных ответов
    const sameResult = results.find(
      (i) => i.correctAnswerCount === correctAnswerCount,
    )
    if (sameResult) {
      return sameResult._id
    }
  } catch (e) {
    console.error(e)
  }

  return false
}
