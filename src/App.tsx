import { Box } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'
import { Outlet } from 'react-router-dom'
import Nav from './components/Nav'
import { ToastContainer } from 'react-toastify'
// import seed from './seed'
// import { useEffect } from 'react'

export default function App() {
  // useEffect(() => {
  //   const onKeydown = (e: KeyboardEvent) => {
  //     if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
  //       e.preventDefault()
  //       seed()
  //     }
  //   }

  //   window.addEventListener('keydown', onKeydown)

  //   return () => {
  //     window.removeEventListener('keydown', onKeydown)
  //   }
  // }, [])

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
