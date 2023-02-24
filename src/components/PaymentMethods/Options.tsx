import { DocumentAddIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import SlideOver from '../../shared/SlideOver';
import Button from '../../shared/Button';
import FormAddPaymentMethod from './FormAddPaymentMethod';
import Toast from '../../shared/Toast';

const Options = () => {
  const [openSlideOver, setOpenSlideOver] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    paymentMethod: '',
    description: '',
  });

  const handleOpenModal = () => {
    setOpenSlideOver(!openSlideOver);
  };

  return (
    <div className='flex items-center gap-4 py-4'>
      <Button
        variant='primary'
        color='primary'
        onClick={() => handleOpenModal()}
      >
        Agregar metodo de pago
      </Button>
      <SlideOver isOpen={openSlideOver} setIsOpen={setOpenSlideOver}>
        <FormAddPaymentMethod
          newPaymentMethod={newPaymentMethod}
          setNewPaymentMethod={setNewPaymentMethod}
          setOpenSlideOver={setOpenSlideOver}
        />
      </SlideOver>
      <Toast />
    </div>
  );
};

export default Options;
