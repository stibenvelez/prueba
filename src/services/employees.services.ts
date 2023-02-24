import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';

export const GET_EMPLOYEES = async () => {
  tokenAuth();
  const { data } = await clienteAxios('/employees');
  return data;
};
