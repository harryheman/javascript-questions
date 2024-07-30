import { Box, createTheme, ThemeProvider } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useLocalStorage } from 'react-use'
import Nav from './components/Nav'
import clear from './lib/clear'
import seed from './lib/seed'

export default function App() {
  const [mode, setMode] = useLocalStorage<'light' | 'dark'>(
    'javascript-question:mode',
    'light',
  )

  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        seed()
      }

      if (e.key === 'c' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        clear()
      }
    }

    window.addEventListener('keydown', onKeydown)

    return () => {
      window.removeEventListener('keydown', onKeydown)
    }
  }, [])

  const theme = createTheme({
    palette: {
      mode,
    },
  })

  console.log(mode)

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
