// import apiService from '@/utils/apiService'

// const registerApi = async (req, res) => {
// 	const {  nik, fullname, date_birth, gender, addresss, work, phone } = req.body

// 	switch (req.method) {
// 		case 'POST': {
// 			try {
// 				const result = await apiService.request({
// 					method: 'POST',
// 					url: 'register-patient',
// 					data: {  nik, fullname, date_birth, gender, addresss, work, phone }
// 				})
// 				const { data: _data, status } = result
// 				const { data, message } = _data
// 				return res.status(status).send({ message, data })
// 			} catch (error) {
// 				const {
// 					data: { message, errors },
// 					status
// 				} = error.response
// 				return res.status(status).send({ message, status, errors })
// 			}
// 		}
// 		default: {
// 			return res.status(405).send({ message: 'Method not allowed' })
// 		}
// 	}
// }
// export default registerApi
