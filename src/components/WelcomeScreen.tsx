import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'

type Props = {
  questionCount: number
  setQuestionCount: (v: number) => void
  setGameStarted: (v: boolean) => void
}

export default function WelcomeScreen({
  questionCount,
  setQuestionCount,
  setGameStarted,
}: Props) {
  const isError = questionCount <= 0

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
      }}
    >
      <Typography variant='h3' textAlign='center' sx={{ textWrap: 'balance' }}>
        Добро пожаловать в игру "JavaScript Questions"!
      </Typography>
      <Typography
        variant='subtitle1'
        textAlign='center'
        sx={{ textWrap: 'balance' }}
      >
        Готов ли ты проверить свои знания JavaScript и доказать всем, что ты -
        настоящий JS-ниндзя?
      </Typography>
      <FormControl sx={{ width: 160 }}>
        <InputLabel id='question-count-select'>Количество вопросов</InputLabel>
        <Select
          labelId='question-count-select'
          value={questionCount}
          label='Количество вопросов'
          onChange={(e) => setQuestionCount(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((v) => (
            <MenuItem key={v} value={v}>
              {v}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        variant='contained'
        onClick={() => {
          if (!isError) {
            setGameStarted(true)
          }
        }}
        disabled={isError}
      >
        Начать игру
      </Button>
    </Box>
  )
}
