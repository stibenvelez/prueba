import { Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

import FormProduct from '../../components/products/FormProduct';
import SkeletonFormProduct from '../../components/products/skeletons/SkeletonFormProduct';
import Template from '../../components/ui/Template';

const EditProductPage = () => {
  const navigate = useNavigate();

  return (
    <Template
      title={'Editar Producto'}
      description={'Edite los datos del producto'}
      className='container mx-auto'
    >
      <div className='space-y-4'>
        <div>
          <button
            onClick={() => navigate(-1)}
            className='px-2 py-1 text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-400 hover:cursor-pointer'
          >
            Volver
          </button>
        </div>
        <Suspense fallback={<SkeletonFormProduct />}>
          <FormProduct />
        </Suspense>
      </div>
    </Template>
  );
};

export default EditProductPage;
