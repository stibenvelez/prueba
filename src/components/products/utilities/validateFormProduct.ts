import { ErrorProduct, Product } from "../../../models";

export const validateFormProduct = async (values: Product, brandsOptions: any) => {

  const errors: ErrorProduct = {};
  if (values.product === '') {
    errors.product = 'Indique el nombre del producto';
  }
  if (values.idProductCategory === '') {
    errors.idProductCategory = 'Seleccione una categoria';
  }

  if (values.brandId === '' && brandsOptions.length    ) {
    errors.brandId = 'Seleccione una marca';
  }
  if (
    values.unitPrice === 0 ||
    isNaN(values.unitPrice) ||
    values.unitPrice <= 0
  ) {
    errors.unitPrice = 'Indique un precio de venta';
  }
  if (values.unitPrice === 0) {
    errors.unitPrice = 'Required';
  }

  return errors;
};
