import { NewPassword } from './../models/user.type';
import clienteAxios from '../config/axios';

export const LOGIN = async (user) => {
  const { data } = await clienteAxios.post('/users/login', user);
  return data;
};

export const FORGOT_PASSWORD = async (email) => {
  const { data } = await clienteAxios.post('/users/forgot-password', { email });
  return data;
};

export const VALIDATE_TOKEN = async ({token, code}) => {
  const { data } = await clienteAxios.post(
    `/users/validate-token/${token}`,
    {code}
  );
  return data;
}

export const NEW_PASSWORD = async (NewPassword) => {
  const { data } = await clienteAxios.post(
    `/users/new-password/${NewPassword.token}`,
    {
      ...NewPassword,
    }
  );
  return data;
}
