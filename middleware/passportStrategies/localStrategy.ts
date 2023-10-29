import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { getUserByEmailIdAndPassword, getUserById } from '../../controllers/userController'
import { PassportStrategy } from '../../interfaces/index'

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  (email, password, done) => {
    try {
      const user = getUserByEmailIdAndPassword(email, password)
      return user
        ? done(null, user)
        : done(null, false, {
            message: 'Your login details are not valid. Please try again',
          })
    } catch (error) {
      if (error instanceof Error) {
        return done(null, false, { message: error.message })
      }
    }
  }
)

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id: number, done) {
  let user = getUserById(id)
  if (user) {
    done(null, user)
  } else {
    done({ message: 'User not found' }, null)
  }
})

passport.deserializeUser(function (id: number, done) {
  let user = getUserById(id)
  if (user) {
    done(null, user)
  } else {
    done({ message: 'User not found' }, null)
  }
})

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localStrategy,
}

export default passportLocalStrategy
