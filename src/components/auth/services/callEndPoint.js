import clienteAxios from "../../../config/axios"

export const callEndPoint = async () => {
    return clienteAxios.get('/auth/me')
