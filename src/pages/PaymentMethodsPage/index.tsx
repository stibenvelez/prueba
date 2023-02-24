import React, { Suspense } from 'react';
import Template from '../../shared/Template';
import PaymentMethodsList from '../../components/PaymentMethods/PaymentMethodsList';
import Options from '../../components/PaymentMethods/Options';

const PaymentMethodsPage = () => {
  return (
    <Template title='Metodos de pago'>
      <Options/>
      <Suspense fallback={<div>Loading...</div>}>
        <PaymentMethodsList />
      </Suspense>
    </Template>
  );
};

export default PaymentMethodsPage;
