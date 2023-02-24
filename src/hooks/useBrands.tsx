import { useQuery } from 'react-query';
import { GET_BRANDS } from '../../src/services/brands.services';

const useBrands = (options?: any, config?: any) => {
  const { data: brands, ...rest } = useQuery(
    ['brands', { ...options?.filters }],
    GET_BRANDS,
    {
      refetchOnWindowFocus: false,
      retry: 0,
      suspense: true,
      ...config,
    }
  );
  return { brands, ...rest };
};

export default useBrands;
