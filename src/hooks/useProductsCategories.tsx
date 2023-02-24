import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { GET_PRODUCT_CATEGORIES } from '../services/productsCategories.services';

const useProductsCategories = () => {
  const { data: productsCategories, ...rest } = useQuery(
    'productCategories',
    GET_PRODUCT_CATEGORIES,
    {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      suspense: true,
    }
  );
  const productCategoriesOptions = useMemo(
    () =>
      productsCategories?.map((category) => ({
        value: category.category,
        label: category.category,
      })) || [],
    [productsCategories]
  );

  return { productsCategories, productCategoriesOptions, ...rest };
};

export default useProductsCategories;
