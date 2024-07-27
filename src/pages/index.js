import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'

const RedirectEmpty = () => {
	return <></>
}
export default RedirectEmpty
export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
	return routeGuard([isLoggedIn], '/auth/login', {
		redirect: {
			destination: '/home',
			permanent: false
		}
	})
})
