import { useMutation, useQueryClient } from 'react-query';
import { UPDATE_PRODUCT } from '../services/product.services';

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const {
    mutate: updateProduct,
    isLoading: isLoadingUpdateProduct,
    ...rest
  } = useMutation(UPDATE_PRODUCT, {
    onSuccess: (data) => {
      queryClient.invalidateQueries('products');
      queryClient.invalidateQueries(['product', `${data.idProduct}`]);
    },
  });
  return { updateProduct, isLoadingUpdateProduct, ...rest };
};

export default useUpdateProduct;
