import express from 'express'
import passport from 'passport'
import { forwardAuthenticated } from '../middleware/checkAuth'

const router = express.Router()

declare module 'express-session' {
  export interface SessionData {
    messages?: string[]
  }
}

router.get('/login', forwardAuthenticated, (req, res) => {
  res.render('login', {
    messages: req.session.messages || [],
  })
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    /* FIX ME: 😭 failureMsg needed when login fails */
    failureMessage: true,
  })
)

router.get('/github', passport.authenticate('github'))

router.get(
  '/github/callback',
  passport.authenticate('github', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login',
    failureMessage: true,
  })
)

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err)
  })
  req.session.destroy((err) => {
    if (err) console.log(err)
  })
  res.redirect('/auth/login')
})

export default router
