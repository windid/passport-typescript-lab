import { Strategy as GitHubStrategy } from 'passport-github2'
import { PassportStrategy } from '../../interfaces/index'
import { Request } from 'express'

const githubStrategy: GitHubStrategy = new GitHubStrategy(
  {
    clientID: '',
    clientSecret: '',
    callbackURL: '',
    passReqToCallback: true,
  },

  /* FIX ME 😭 */
  async (
    req: Request,
    accessToken: string,
    refreshToken: string,
    profile: unknown,
    done: (err?: Error | null, user?: Express.User, info?: object) => void
  ) => {}
)

const passportGitHubStrategy: PassportStrategy = {
  name: 'github',
  strategy: githubStrategy,
}

export default passportGitHubStrategy
