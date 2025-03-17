import axios from "axios"

const SERVER_URL = import.meta.env.VITE_APP_SERVER_URL;


// get user by id 
export const getUserByid = (id) => {
    return axios.get(`${SERVER_URL}api/user/${id}`)
}