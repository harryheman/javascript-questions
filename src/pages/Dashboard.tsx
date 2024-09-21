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
import { Doc } from '../convex/_generated/dataModel'
import { useGetResults } from '../hooks/useGetResults'

const columns: MRT_ColumnDef<Doc<'results'>>[] = [
  {
    accessorKey: 'userName',
    header: 'Пользователь',
  },
  {
    accessorKey: 'questionCount',
    header: 'Вопросы',
  },
  {
    accessorKey: 'correctAnswerCount',
    header: 'Ответы',
  },
  {
    accessorKey: 'correctAnswerPercent',
    header: 'Процент',
  },
  {
    accessorKey: '_creationTime',
    header: 'Дата и время',
    Cell: ({ renderedCellValue }) => {
      return new Date(renderedCellValue as string).toLocaleString()
    },
  },
]

export default function Dashboard() {
  const { data, isLoading } = useGetResults()

  const theme = useTheme()

  if (isLoading) {
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
          data={data}
          columns={columns}
          localization={MRT_Localization_RU}
        />
      </ThemeProvider>
    </Box>
  )
}
