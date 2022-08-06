import { Strategy as LocalStrategy } from 'passport-local'
import { User } from '../models/models-exports'

const passportLocalStrategy = new LocalStrategy((username, password, done) => {
	User.findOne(
		{ email: username },
		(err: any, user: { verifyPassword: (arg0: string) => any }) => {
			if (err) return done(err)
			if (!user) return done(null, false)
			if (!user.verifyPassword(password)) return done(null, false)

			return done(null, user)
		}
	)
})

export default passportLocalStrategy
