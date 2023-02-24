import React, { FC, useCallback, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  GET_PAYMENT_METHOD,
  UPDATE_PAYMENT_METHOD,
} from '../../services/paymentMethods.services';

import Button from '../../shared/Button';
import Input from '../../shared/Input';
import Textarea from '../../shared/Texarea';

interface FormEditPaymentMethodProps {
  setOpenSlideOver: (value: boolean) => void;
  selectedPaymentMethod: string;
}

const FormEditPaymentMethod: FC<FormEditPaymentMethodProps> = ({
  setOpenSlideOver,
  selectedPaymentMethod,
}) => {
  const queryClient = useQueryClient();
  const [updatedPaymentMethod, setUpdatedPaymentMethod] = React.useState({
    paymentMethod: '',
    description: '',
  });

  const { data: paymentMethod } = useQuery(
    ['paymentMethod', selectedPaymentMethod],
    GET_PAYMENT_METHOD,
    {
      suspense: true,
      enabled: !!selectedPaymentMethod,
    }
  );

  const { mutate: updatePaymentMethod, isLoading: isLoadingUpdate } =
    useMutation(UPDATE_PAYMENT_METHOD, {
      onSuccess: () => {
        setOpenSlideOver(false);
        toast.success('Método de pago actualizado');
        queryClient.invalidateQueries('paymentMethods');
        queryClient.invalidateQueries(['paymentMethod', selectedPaymentMethod]);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
      },
    });

  useEffect(() => {
    setUpdatedPaymentMethod(paymentMethod);
  }, [paymentMethod]);

  const handleChange = (e) => {
    setUpdatedPaymentMethod({
      ...updatedPaymentMethod,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePaymentMethod(updatedPaymentMethod);
  };

  const handleCancel = () => {
    setOpenSlideOver(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          <div className='flex flex-col gap-4'>
            <Input
              label='Método de pago'
              name='paymentMethod'
              type='text'
              placeholder='Método de pago'
              onChange={handleChange}
              value={updatedPaymentMethod?.paymentMethod}
            />
            <Textarea
              label='Descripción'
              name='description'
              placeholder='Descripción'
              onChange={handleChange}
              value={updatedPaymentMethod?.description}
            />
          </div>
          <div className='flex gap-4'>
            <Button isLoading={isLoadingUpdate} type='submit'>
              Editar
            </Button>
            <Button onClick={() => handleCancel()} variant='secondary'>
              Cancelar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormEditPaymentMethod;
