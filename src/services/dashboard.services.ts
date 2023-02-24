import clienteAxios from '../../src/config/axios';
import tokenAuth from '../config/tokenAuth';

export const GET_FEATURED_PRODUCTS = async () => {
  tokenAuth();
  const { data } = await clienteAxios('/dashboard/featured-products');
  return data;
};
