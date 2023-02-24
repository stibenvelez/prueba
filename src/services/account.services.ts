import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';

export const GET_ACCOUNT = async () => {
  tokenAuth();
  const { data } = await clienteAxios.get('/account');
  return data;
};
