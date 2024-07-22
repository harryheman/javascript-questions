import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Nav from './components/Nav'
import seed from './lib/seed'
import clear from './lib/clear'

export default function App() {
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
      <Nav />
      <Outlet />
      <ToastContainer
        position='bottom-center'
        autoClose={3000}
        theme='colored'
        hideProgressBar
        closeOnClick
      />
      <CssBaseline />
    </Box>
  )
}
