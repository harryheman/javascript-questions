export type TQuestion = {
  question: string
  answers: string[]
  correctAnswerIndex: number
  explanation: string
}

export type TQuestions = TQuestion[]

export type Result = {
  id: string
  user_id: string
  user_name: string
  question_count: number
  correct_answer_count: number
  correct_answer_percent: number
  created_at: string
}

export type Results = Result[]
