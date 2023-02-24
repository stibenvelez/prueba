import clienteAxios from "../config/axios";
import tokenAuth from "../config/tokenAuth";

export const GET_USERS = async ({ queryKey }) => {
    tokenAuth();
    const { data } = await clienteAxios.get('users', { params: queryKey[1] });
    return data;
    };
