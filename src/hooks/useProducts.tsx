import { FC } from 'react';
import { useQuery } from 'react-query';
import { GET_PRODUCTS } from '../services';


const useProducts = (filters?:any, options?:any) => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    ...rest
  } = useQuery(['products', { ...filters }], GET_PRODUCTS, {
    suspense: true,
    refetchOnWindowFocus: false,
    ...options,
  });

  const productsOptions = products?.results?.map((product) => ({
    label: product.product,
    value: product.idProduct,
  }));
  return { products, isLoadingProducts, productsOptions, ...rest };
};

useProducts.defaultProps = {

};


export default useProducts;
