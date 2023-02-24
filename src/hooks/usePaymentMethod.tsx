import { useQuery } from 'react-query';
import { GET_PAYMENT_METHODS } from '../services/paymentMethods.services';

const usePaymentMethod = () => {
  const {
    data: paymentMethods,
    isLoading: isLoadingPaymentMethod,
    ...rest
  } = useQuery(['paymentMethods'], GET_PAYMENT_METHODS, {
    refetchOnWindowFocus: false,
    suspense: true,
  });

  const optionPaymentMethods = paymentMethods?.map(
    ({ paymentMethod, id }) => ({
        value: id,
        label: paymentMethod,
    })
    );

  return { paymentMethods, isLoadingPaymentMethod, optionPaymentMethods, ...rest };
};

export default usePaymentMethod;
