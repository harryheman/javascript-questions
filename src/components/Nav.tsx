import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from '@clerk/clerk-react'
import { AppBar, Box, Button, Toolbar } from '@mui/material'
import { Link, Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

const pages = [
  {
    name: 'Главная',
    to: '/',
  },
  {
    name: 'Рекорды',
    to: '/dashboard',
  },
]

export default function Nav() {
  return (
    <>
      <AppBar position='static'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: 'flex', ml: 2 }}>
            {pages.map(({ name, to }) => (
              <Link key={name} to={to}>
                <Button sx={{ color: 'white' }}>{name}</Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ mr: 2 }}>
            <SignedOut>
              <SignInButton>
                <Button variant='contained' color='success'>
                  Войти
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}
