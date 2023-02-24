import FormNewSale from '../../components/sales/newSale/FormNewSale';
import Template from '../../components/ui/Template';

const NewSalePage = () => {
  return (
    <Template title='Nuevo ingreso' description='Registre una nueva venta'>
      <FormNewSale />
    </Template>
  );
};

export default NewSalePage;
