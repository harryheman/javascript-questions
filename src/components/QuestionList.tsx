import { useUser } from '@clerk/clerk-react'
import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useDeepCompareEffect, useLocalStorage } from 'react-use'
import { saveResult } from '../actions/results'
import type { TQuestions } from '../types'
import SyntaxHighlighter from './SyntaxHighlighter'
import canSave from '../lib/canSave'

type Props = {
  questions: TQuestions
  setGameStarted: (v: boolean) => void
}

export default function QuestionList({ questions, setGameStarted }: Props) {
  const [userAnswers, setUserAnswers] = useLocalStorage<
    Record<number, { selectedAnswerIndex: number; correct: boolean }>
  >('javascript-question:userAnswers', {})
  const [gameFinished, setGameFinished] = useLocalStorage(
    'javascript-question:gameFinished',
    false,
  )
  const [loading, setLoading] = useState(false)
  const [savingEnabled, setSavingEnabled] = useState<boolean | string>(false)

  const user = useUser()

  useDeepCompareEffect(() => {
    const newAnswers: Record<
      number,
      { selectedAnswerIndex: number; correct: boolean }
    > = {}
    for (let i = 0; i < questions.length; i++) {
      newAnswers[i] = {
        selectedAnswerIndex: 0,
        correct: questions[i].correctAnswerIndex === 0,
      }
    }
    setUserAnswers(newAnswers)
  }, [questions])

  const handleChange = (
    i: number,
    selectedAnswerIndex: number,
    correctAnswerIndex: number,
  ) => {
    const newAnswers = structuredClone(userAnswers)
    if (newAnswers) {
      newAnswers[i] = {
        selectedAnswerIndex,
        correct: selectedAnswerIndex === correctAnswerIndex,
      }
      setUserAnswers(newAnswers)
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameFinished(false)
    setUserAnswers({})
  }

  const finishGame = async () => {
    if (gameFinished) {
      return resetGame()
    }
    setGameFinished(true)
    const canSaveOrWorseResultId = await canSave({
      question_count: questions.length,
      correct_answer_percent: correctAnswerPercent,
    })
    if (canSaveOrWorseResultId) {
      setSavingEnabled(canSaveOrWorseResultId)
    }
  }

  console.log(savingEnabled)

  const correctAnswerCount = Object.values(userAnswers || {}).filter(
    ({ correct }) => correct,
  ).length
  const correctAnswerPercent = Math.round(
    (100 * correctAnswerCount) / questions.length,
  )
  const color =
    correctAnswerPercent < 50 ? 'red' : correctAnswerPercent > 75 ? 'green' : ''

  const handleSaveResult = async () => {
    if (!user.isSignedIn || !savingEnabled) return
    setLoading(true)
    const result = await saveResult(
      {
        user_id: user.user.id,
        user_name:
          user.user.fullName ||
          `${user.user.firstName} ${user.user.lastName}`.trim(),
        question_count: questions.length,
        correct_answer_count: correctAnswerCount,
        correct_answer_percent: correctAnswerPercent,
      },
      savingEnabled,
    )
    if (!result) {
      setLoading(false)
      return toast('При сохранении результата возникла ошибка.', {
        type: 'success',
      })
    }
    toast('Результат сохранен.', {
      type: 'success',
    })
    const timeoutId = setTimeout(() => {
      setLoading(false)
      resetGame()
      clearTimeout(timeoutId)
    }, 3000)
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Typography variant='h3'>Вопросы</Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={finishGame} variant='contained' disabled={loading}>
          {gameFinished ? 'Завершить' : 'Проверить'}
        </Button>
        {gameFinished && user.isSignedIn && savingEnabled && (
          <Button
            onClick={handleSaveResult}
            variant='contained'
            color='success'
            disabled={loading}
          >
            Сохранить
          </Button>
        )}
      </Box>
      {gameFinished && (
        <Typography variant='h6' sx={{ textWrap: 'balance' }} color={color}>
          Правильных ответов: {correctAnswerPercent}% ({correctAnswerCount} из{' '}
          {questions.length}).
        </Typography>
      )}
      <Box
        width='100%'
        sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
      >
        {questions.map((q, i) => {
          const { question, answers, correctAnswerIndex, explanation } = q

          const selectedAnswerIndex =
            (userAnswers && userAnswers[i]?.selectedAnswerIndex) || 0
          const isError =
            gameFinished && selectedAnswerIndex !== correctAnswerIndex

          return (
            <Box
              key={`question-${i}`}
              sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
            >
              <Typography variant='h5'>Вопрос {i + 1}</Typography>
              <SyntaxHighlighter code={question} />
              <FormControl error={isError} disabled={gameFinished}>
                <RadioGroup
                  value={selectedAnswerIndex}
                  onChange={(e) =>
                    handleChange(
                      i,
                      Number((e.target as HTMLInputElement).value),
                      correctAnswerIndex,
                    )
                  }
                >
                  {answers.map((a, j) => {
                    return (
                      <FormControlLabel
                        key={`question-${i}-answer-${j}`}
                        value={j}
                        control={<Radio />}
                        label={a}
                      />
                    )
                  })}
                </RadioGroup>
                {isError && (
                  <FormHelperText>
                    Вы выбрали неправильный ответ.
                  </FormHelperText>
                )}
              </FormControl>
              {isError && (
                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMore />}>
                    Правильный ответ и объяснение
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant='subtitle1' color='green'>
                      Правильный ответ: {answers[correctAnswerIndex]}
                    </Typography>
                    <SyntaxHighlighter code={explanation} />
                  </AccordionDetails>
                </Accordion>
              )}
            </Box>
          )
        })}
      </Box>
      {gameFinished && (
        <Typography variant='h6' sx={{ textWrap: 'balance' }} color={color}>
          Правильных ответов: {correctAnswerPercent}% ({correctAnswerCount} из{' '}
          {questions.length}).
        </Typography>
      )}
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button onClick={finishGame} variant='contained' disabled={loading}>
          {gameFinished ? 'Завершить' : 'Проверить'}
        </Button>
        {gameFinished && user.isSignedIn && savingEnabled && (
          <Button
            onClick={handleSaveResult}
            variant='contained'
            color='success'
            disabled={loading}
          >
            Сохранить
          </Button>
        )}
      </Box>
      <CssBaseline />
    </Box>
  )
}
