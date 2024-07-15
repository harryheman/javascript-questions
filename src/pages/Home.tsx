import { useLocalStorage } from 'react-use'
import QuestionList from '../components/QuestionList'
import WelcomeScreen from '../components/WelcomeScreen'
import shuffle from '../lib/shuffle'
import questions from '../questions'

export default function Home() {
  const [questionCount, setQuestionCount] = useLocalStorage(
    'javascript-question:questionCount',
    10,
  )
  const [isGameStarted, setGameStarted] = useLocalStorage(
    'javascript-question:isGameStarted',
    false,
  )

  return isGameStarted ? (
    <QuestionList
      questions={shuffle(questions).slice(0, questionCount)}
      setGameStarted={setGameStarted}
    />
  ) : (
    <WelcomeScreen
      questionCount={Number(questionCount)}
      setQuestionCount={setQuestionCount}
      setGameStarted={setGameStarted}
    />
  )
}
