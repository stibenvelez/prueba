import { useMutation, useQueryClient } from 'react-query';
import { CREATE_PRODUCT } from '../services/product.services';

const useNewProduct = () => {
  const queryClient = useQueryClient();
  const { mutate: addNewProduct, isLoading: isLoadingAddProduct, ...rest } = useMutation(CREATE_PRODUCT, {
    onSuccess: () => {
      queryClient.invalidateQueries('products');
    },
  });
  return { addNewProduct, isLoadingAddProduct, ...rest };
};

export default useNewProduct;
