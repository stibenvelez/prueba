import { createBrandAdapter, updateBrandAdapter } from '../../src/adapters/brands.adapter';
import clienteAxios from '../../src/config/axios';
import tokenAuth from '../config/tokenAuth';

export const GET_BRANDS = async ({queryKey}) => {
  tokenAuth();
  const { data } = await clienteAxios('brands', {
    params: {...queryKey[1]}
  });
  return data;
};

export const CREATE_BRAND = async (brand: any) => {
  tokenAuth();
  const { data } = await clienteAxios.post('brands', createBrandAdapter(brand));
  return data;
};

export const UPDATE_BRAND = async (brand: any) => {
  tokenAuth();
  const { data } = await clienteAxios.put(
    `brands/${brand.brandId}`,
    updateBrandAdapter(brand)
  );
  return data;
};

export const DELETE_BRAND = async (brand) => {
  tokenAuth();
  const { data } = await clienteAxios.put(`brands/delte-brand/${brand.brandId}`);
  return data;
}
