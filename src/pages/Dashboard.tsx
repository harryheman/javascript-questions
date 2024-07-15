import {
  Box,
  CircularProgress,
  ThemeProvider,
  createTheme,
  useTheme,
} from '@mui/material'
import { ruRU } from '@mui/material/locale'
import { MaterialReactTable, type MRT_ColumnDef } from 'material-react-table'
import { MRT_Localization_RU } from 'material-react-table/locales/ru'
import { useEffect, useState } from 'react'
import { getAllResults } from '../actions/results'
import type { Result, Results } from '../types'

const columns: MRT_ColumnDef<Result>[] = [
  {
    accessorKey: 'user_name',
    header: 'Пользователь',
  },
  {
    accessorKey: 'question_count',
    header: 'Вопросы',
  },
  {
    accessorKey: 'correct_answer_count',
    header: 'Правильные ответы',
  },
  {
    accessorKey: 'correct_answer_percent',
    header: 'Процент',
  },
  {
    accessorKey: 'created_at',
    header: 'Дата и время',
    Cell: ({ renderedCellValue }) => {
      return new Date(renderedCellValue as string).toLocaleString()
    },
  },
]

export default function Dashboard() {
  const [results, setResults] = useState<Results | null>(null)

  useEffect(() => {
    getAllResults().then((results) => setResults(results || []))
  }, [])

  const theme = useTheme()

  if (!results) {
    return (
      <Box sx={{ mt: 3 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={createTheme(theme, ruRU)}>
        <MaterialReactTable
          data={results}
          columns={columns}
          localization={MRT_Localization_RU}
        />
      </ThemeProvider>
    </Box>
  )
}
