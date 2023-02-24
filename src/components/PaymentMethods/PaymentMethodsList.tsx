import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import React, { Suspense, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { DELETE_PAYMENT_METHOD } from '../../services/paymentMethods.services';
import ModalConfirm from '../../shared/ModalConfirm';
import usePaymentMethod from '../../hooks/usePaymentMethod';
import Table from '../../shared/Table';
import { toast } from 'react-toastify';
import SlideOver from '../../shared/SlideOver';
import FormEditPaymentMethod from './FormEditPaymentMethod';

const headers = [
  {
    header: 'Metodo de pago',
    accessor: 'paymentMethod',
  },
  {
    header: 'Acciones',
    accessor: 'aqctions',
  },
];

const PaymentMethodsList = () => {
  const queryClient = useQueryClient();
  const { paymentMethods } = usePaymentMethod();
  const [openModal, setopenModal] = useState(false);
  const [openSlideOver, setOpenSlideOver] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<string>('');

  const { mutate: deletePaymentMethod } = useMutation(DELETE_PAYMENT_METHOD, {
    onMutate: async (id) => {
      const previousPaymentMethods = queryClient.getQueryData('paymentMethods');
      queryClient.setQueryData('paymentMethods', (old: any) => {
        return old.filter((paymentMethod) => paymentMethod.id !== id);
      });
      return { previousPaymentMethods };
    },
    onError: (err: any, id, context) => {
      queryClient.setQueryData(
        'paymentMethods',
        context.previousPaymentMethods
      );
      toast.error(err.response.data.message);
      queryClient.invalidateQueries('paymentMethods');
    },
    onSuccess: () => {
      toast.success('Método de pago eliminado');
      queryClient.invalidateQueries('paymentMethods');
    },
  });

  const handleConfirm = (id) => {
    setopenModal(true);
    setSelectedPaymentMethod(id);
  };

  const handleEdit = (id) => {
    setOpenSlideOver(true);
    setSelectedPaymentMethod(id);
  };

  const onConfirm = () => {
    deletePaymentMethod(selectedPaymentMethod);
  };

  const data =
    paymentMethods &&
    paymentMethods.map(({ id, paymentMethod }) => ({
      paymentMethod,
      actions: id && (
        <div className='flex gap-4'>
          <button
            className='transition duration-200 ease-in-out hover:text-blue-600'
            onClick={() => handleEdit(id)}
          >
            <PencilIcon className='h-5' />
          </button>
          <button
            className='transition duration-200 ease-in-out hover:text-red-600'
            onClick={() => handleConfirm(id)}
          >
            <TrashIcon className='h-5' />
          </button>
        </div>
      ),
    }));

  return (
    <div className='
    '>
      <Table headers={headers} data={data} fullWidth={false}/>
      <ModalConfirm
        openModal={openModal}
        setOpenModal={setopenModal}
        onConfirm={onConfirm}
        textConfirm='Eliminar'
        text='¿Está seguro que desea eliminar el método de pago?'
        title='Eliminar método de pago'
      />
      <SlideOver isOpen={openSlideOver} setIsOpen={setOpenSlideOver}>
        <Suspense fallback={<div>Loading...</div>}>
          <FormEditPaymentMethod
            setOpenSlideOver={setOpenSlideOver}
            selectedPaymentMethod={selectedPaymentMethod}
          />
        </Suspense>
      </SlideOver>
    </div>
  );
};

export default PaymentMethodsList;
