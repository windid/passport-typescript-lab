import express from 'express'
const router = express.Router()
import { ensureAuthenticated } from '../middleware/checkAuth'
import session from 'express-session'

router.get('/', (req, res) => {
  res.send('welcome')
})

router.get('/dashboard', ensureAuthenticated, (req, res) => {
  if (req.user?.role === 'admin') {
    res.redirect('/admin')
  } else {
    res.render('dashboard', {
      user: req.user,
    })
  }
})

router.get('/admin', ensureAuthenticated, (req, res) => {
  if (req.user?.role === 'admin') {
    const store = req.sessionStore
    store.all &&
      store.all((err, sessions) => {
        console.log(sessions)
        res.render('admin', {
          user: req.user,
          sessions,
        })
      })
  } else {
    res.redirect('/dashboard')
  }
})

router.get('/admin/revoke/:id', ensureAuthenticated, (req, res) => {
  if (req.user?.role === 'admin') {
    const store = req.sessionStore
    store.destroy(req.params.id, (err) => {
      if (err) console.log(err)
      res.redirect('/admin')
    })
  } else {
    res.redirect('/dashboard')
  }
})

export default router
