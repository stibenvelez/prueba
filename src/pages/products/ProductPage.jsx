import React, { Suspense } from 'react';

import Template from '../../components/ui/Template';
import { useNavigate } from 'react-router-dom';
import ProductDetail from '../../components/products/ProductDetail';
import SkeletonFormProduct from '../../components/products/skeletons/SkeletonFormProduct';

const ProductPage = () => {
  const navigate = useNavigate();

  return (
    <Template
      title='Informacion del producto'
      description='Informacion detalalda del producto'
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
          <ProductDetail />
        </Suspense>
      </div>
    </Template>
  );
};

export default ProductPage;
