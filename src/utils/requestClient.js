import axios from "axios";


const request = axios.create ({
    timeout: 200000,
    headers: {
        Accept: "application/json",
    },
    withCredentials: true,
})


export default request;