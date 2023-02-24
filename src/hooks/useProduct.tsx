import { useQuery, useQueryClient } from 'react-query';
import { GET_PRODUCT } from '../services/product.services';

const useProduct = ({ id }) => {
  // const queryClient = useQueryClient();
  return useQuery(['product', id], GET_PRODUCT, {
    suspense: true,
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};

export default useProduct;
