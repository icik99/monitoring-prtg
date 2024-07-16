import apiService from "@/utils/apiService"
import { withSessionRoute } from "@/utils/sessionWrapper"


const api = withSessionRoute(async (req, res) => {
    const { username, password } = req.body
    switch (req.method) {
        case 'POST': {
            try {
                const result = await apiService.request({
                    method: 'POST',
                    url: 'login',
                    data: { username, password }
                })
                
                req.session.auth = {
					access_token: result.data.accessToken
                }
                await req.session.save()


				res.status(200).json({
                    username: result.data.fullname, 
                    role: result.data.role,
                })
                console.log(result, 'reslogin')
                // return res.json({ result })
            } catch (error) {
				console.log(error)
                // if (error.response && error.response.data) {
                //     const {
                //         data: { message, errors },
                //         status
                //     } = error.response
                //     return res.status(status).send({ message, status, errors })
                // } else {
                //     // Handle error without response data
                //     return res.status(500).send({ message: 'Internal Server Error' })
                // }
            }
        }
        // default: {
        //     return res.status(405).send({ message: 'Method not allowed' })
        // }
    }
})
export default api
