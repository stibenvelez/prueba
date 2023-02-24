import clientAxios from '../config/axios';
import { getEnvVariables } from '../helpers/getEnvVariables';
import tokenAuth from '../config/tokenAuth';
const { VITE_API_URL } = getEnvVariables();

const apiUrl = VITE_API_URL;
const productsUrl = `${apiUrl}/products`;

export const GET_PRODUCTS = async ({ queryKey }) => {
  tokenAuth();
  const { data } = await clientAxios.get('/products', { params: queryKey[1] });
  return data;
};

export const GET_PRODUCT = async ({ queryKey }) => {
  tokenAuth();
  const { data } = await clientAxios.get(`${productsUrl}/${queryKey[1]}`);
  return data;
};

export const CREATE_PRODUCT = async (product) => {
  const formData = new FormData();
  formData.append('product', product.product);
  formData.append('brandId', product.brandId);
  formData.append('idProductCategory', product.idProductCategory);
  formData.append('commissionPercentage', product.commissionPercentage);
  formData.append('unitCost', product.unitCost);
  formData.append('unitPrice', product.unitPrice);
  formData.append('observations', product.observations);
  product.image && formData.append('image', product.image);
  tokenAuth();
  const { data } = await clientAxios.post(productsUrl, formData);
  return data;
};

export const UPDATE_PRODUCT = async (product) => {
  const formData = new FormData();
  formData.append('idProduct', product.idProduct);
  formData.append('product', product.product);
  formData.append('brandId', product.brandId);
  formData.append('idProductCategory', product.idProductCategory);
  formData.append('commissionPercentage', product.commissionPercentage);
  formData.append('unitCost', product.unitCost);
  formData.append('unitPrice', product.unitPrice);
  formData.append('observations', product.observations);
  formData.append('description', product.description);
  formData.append('fixedPrice', product.fixedPrice ? '1' : '0');
  product.image && formData.append('image', product.image);
  tokenAuth();
  const { data } = await clientAxios.put(
    `${productsUrl}/${product.idProduct}`,
    formData
  );
  return data;
};

export const DELETE_PRODUCT = async (idProduct: number) => {
  tokenAuth();
  const { data } = await clientAxios.put(`products/disable/${idProduct}`);
  return data;
};

export const DELETE_IMAGE_PRODUCT = async (idProduct: number|string) => {
  tokenAuth();
  const { data } = await clientAxios.put(`products/delete-image/${idProduct}`);
  return data;
};
