import { Strategy as GitHubStrategy } from 'passport-github2'
import { PassportStrategy, User } from '../../interfaces/index'
import { Request } from 'express'
import { database, userModel } from '../../models/userModel'
require('dotenv').config()

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID || '',
    clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    callbackURL: `http://localhost:${process.env.PORT}/auth/github/callback`,
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (err?: Error | null, user?: Express.User, info?: object) => void
  ) => {
    try {
      const user = userModel.findById(profile.id)
      return done(null, user)
    } catch (error) {
      const newUser: User = {
        id: profile.id,
        name: profile.displayName,
      }
      database.push(newUser)
      return done(null, newUser)
    }
  }
)

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
}

export default passportGitHubStrategy
