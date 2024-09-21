import { Box, createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLocalStorage } from 'react-use'
import Nav from './components/Nav'

export default function App() {
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>(
    'javascript-question:mode',
    'light',
  )

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        alignItems: 'center',
        maxWidth: 1280,
        margin: '0 auto',
      }}
    >
      <ThemeProvider theme={theme}>
        <Nav mode={mode} setMode={setMode} />
        <Outlet />
        <ToastContainer
          position='bottom-center'
          autoClose={3000}
          theme='colored'
          hideProgressBar
          closeOnClick
        />
        <CssBaseline />
      </ThemeProvider>
    </Box>
  )
}
