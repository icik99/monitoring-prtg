import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next'
import sessionOptions from './sessionOptions'

export const withSessionRoute = (handler) => {
	return withIronSessionApiRoute(handler, sessionOptions)
}

export const withSession = (handler) => {
	return withIronSessionSsr(handler, sessionOptions)
}
