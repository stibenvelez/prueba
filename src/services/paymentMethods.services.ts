import clienteAxios from '../config/axios';
import tokenAuth from '../config/tokenAuth';

export const GET_PAYMENT_METHODS = async () => {
  tokenAuth();
  const { data } = await clienteAxios('/payment-methods');
  return data;
};

export const GET_PAYMENT_METHOD = async ({ queryKey }) => {
  tokenAuth();
  const { data } = await clienteAxios(`/payment-methods/${queryKey[1]}`);
  return data;
};

export const ADD_PAYMENT_METHODS = async (paymentMethod: any) => {
  tokenAuth();
  const { data } = await clienteAxios.post('/payment-methods', paymentMethod);
  return data;
};

export const DELETE_PAYMENT_METHOD = async (id: string) => {
  tokenAuth();
  const { data } = await clienteAxios.put(`/payment-methods/delete/${id}`);
  return data;
}

export const UPDATE_PAYMENT_METHOD = async (paymentMethod: any) => {
  tokenAuth();
  const { data } = await clienteAxios.put(`/payment-methods/${paymentMethod.id}`, paymentMethod);
  return data;
}
