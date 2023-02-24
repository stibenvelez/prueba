import clienteAxios from '../../src/config/axios';
import tokenAuth from '../../src/config/tokenAuth';

export const GET_PRODUCT_CATEGORIES = async () => {
  tokenAuth();
  const { data } = await clienteAxios('/product-categories');
  return data;
};
