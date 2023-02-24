import React, { FC, useState } from 'react';
import Textarea from '../../shared/Texarea';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import { ADD_PAYMENT_METHODS } from '../../services/paymentMethods.services';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import Toast from '../../shared/Toast';

const EMPTY_PAYMENT_METHOD = {
  paymentMethod: '',
  description: '',
};

interface FormAddPaymentMethodProps {
  setOpenSlideOver: (value: boolean) => void;
  setNewPaymentMethod: (value: any) => void;
  newPaymentMethod: any;
}

const FormAddPaymentMethod: FC<FormAddPaymentMethodProps> = ({
  setOpenSlideOver,
  setNewPaymentMethod,
  newPaymentMethod,
}) => {
  const queryClient = useQueryClient();

  const { mutate: addPaymentMethod } = useMutation(ADD_PAYMENT_METHODS, {
    onMutate: async (newPaymentMethod) => {
      const previousPaymentMethods = queryClient.getQueryData('paymentMethods');
      queryClient.setQueryData('paymentMethods', (old: any) => [
        ...old,
        newPaymentMethod,
      ]);
      setOpenSlideOver(false);
      return { previousPaymentMethods };
    },
    onError: (err: any, newPaymentMethod, context) => {
      queryClient.setQueryData(
        'paymentMethods',
        context.previousPaymentMethods
      );
      setOpenSlideOver(true);
      toast.error(err.response.data.message);
    },
    onSuccess: () => {
      toast.success('Método de pago agregado');
      console.log('success');
      setNewPaymentMethod(EMPTY_PAYMENT_METHOD);
      queryClient.invalidateQueries('paymentMethods');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewPaymentMethod({
      ...newPaymentMethod,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setOpenSlideOver(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addPaymentMethod(newPaymentMethod);
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
            />
            <Textarea
              label='Descripción'
              name='description'
              placeholder='Descripción'
              onChange={handleChange}
            />
          </div>
          <div className='flex gap-4'>
            <Button type='submit'>Agregar</Button>
            <Button onClick={() => handleCancel()} variant='secondary'>
              Cancelar
            </Button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default FormAddPaymentMethod;
