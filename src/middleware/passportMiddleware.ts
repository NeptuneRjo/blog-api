import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models/models-exports'
import { compare } from 'bcryptjs'
import passport from 'passport'

const message = 'Incorrect password'

export function passportLocal() {
	passport.use(
		new LocalStrategy(
			{ usernameField: 'email', passwordField: 'password' },
			(email, password, done) => {
				console.log('local')
				User.findOne({ email }, (err: any, user: { password: string }) => {
					if (err) return done(err)
					if (!user) return done(null, false)

					if (password !== user.password) {
						compare(password, user.password, (err, res) => {
							if (res) {
								console.log(res)
								return done(null, user)
							} else {
								return done(null, false, { message: message })
							}
						})
					}
				})
			}
		)
	)

	passport.serializeUser((id, done) => done(null, id))

	passport.deserializeUser((id, done) => {
		User.findById(id, (err: any, user: any) => {
			done(err, user)
		})
	})
}
