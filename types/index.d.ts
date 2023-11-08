declare global {
  namespace Express {
    export interface User {
      id: number
      name: string
      role: 'admin' | 'user'
      email?: string
      password?: string
    }
  }
}

declare module 'express-session' {
  export interface SessionData {
    messages?: string[]
  }
}

export {}
