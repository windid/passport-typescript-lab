import { Strategy } from 'passport'

export interface PassportStrategy {
  name: string
  strategy: Strategy
}

declare global {
  namespace Express {
    interface User {
      id: number
      name: string
      role: 'admin' | 'user'
      email?: string
      password?: string
    }
  }
}
