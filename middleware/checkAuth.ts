import { NextFunction, Request, Response } from 'express'

export const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/auth/login')
}

export const forwardAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/dashboard')
}
