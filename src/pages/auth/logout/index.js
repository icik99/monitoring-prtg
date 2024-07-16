import { withSessionRoute } from "@/utils/sessionWrapper"

const api =  withSessionRoute(async (req, res) => {
	switch (req.method) {
		case 'POST': {
			try {
				await req.session.destroy()
				return res.json({ data: null, message: 'Logged out!, redirecting to Login Page', status: 200 }, { status: 200 })
			} catch (error) {
				return res.status(error.response.status ?? 500).send(error.response.data, error.response.data ?? error)
			}
		}
		default: {
			return res.status(405).send({ message: 'Method not allowed' })
		}
	}
})

export default api
