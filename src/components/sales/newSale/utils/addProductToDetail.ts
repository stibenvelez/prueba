import { v4 as uuid } from 'uuid';
import clienteAxios from '../../../../config/axios';
import validateAddProduct from './validateAddProduct';
import { toast } from 'react-toastify';

const findProduct = async (id: number) => {
  try {
    const res = await clienteAxios.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

const addProductToDetail = async (newProduct) => {
    console.log('newProduct', newProduct);
  if (!newProduct?.product) {
    return {
      result: newProduct,
      errors: { product: 'Seleccione un producto' },
    };
  }

  const product = await findProduct(newProduct.product);

  const id = newProduct.id || uuid();
  newProduct.id = id;
  newProduct.totalDiscount =
    parseInt(newProduct.quantity) * newProduct.unitDiscount;
  newProduct.totalPrice = newProduct.quantity * product.unitPrice;
  newProduct.productName = product.product;
  newProduct.commissionValue =
    (newProduct.totalPrice * product.commissionPercentage) / 100;
  newProduct.commissionPercentage = product.commissionPercentage;

  const errors = validateAddProduct(newProduct);

  if (Object.keys(errors).length) {
    toast.error('Complete los campos obligatorios', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  }

  return { result: newProduct, errors };
};

export default addProductToDetail;
