import React, { Suspense, useEffect, useState } from 'react';
import FilterOptions from '../../components/products/FilterOptions';
import ProductsList from '../../components/products/ProductsList';
import Template from '../../components/ui/Template';
import SkeletonTable from '../../shared/SkeletonTable';
import ProductsListMobile from '../../components/products/ProductsListMobile';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Button from '../../shared/Button';
import Pagination from '../../components/products/Pagination';

const ProductsPages = () => {
  const [dataProducts, setDataProducts] = useState([]);

  return (
    <Template
      title={'Productos'}
      description={'Administre aqui los productos de la empresa'}
    >
      <div className='flex flex-col gap-4'>
        <div>
          {/* <FilterOptionsMobile/> */}
          <Suspense
            fallback={
              <div className='flex flex-col gap-4'>
                <div className='flex'>
                  <div className='h-5 rounded-md w-36 bg-slate-300 animate-pulse' />
                </div>
                <div className='flex justify-between py-2 animate-pulse '>
                  <div className='flex gap-4'>
                    <div className='w-24 h-4 bg-gray-200 rounded-lg'></div>
                    <div className='w-24 h-4 bg-gray-200 rounded-lg'></div>
                    <div className='w-24 h-4 bg-gray-200 rounded-lg'></div>
                  </div>
                  <div className='w-56 h-4 bg-gray-200 rounded-lg'></div>
                </div>
              </div>
            }
          >
            <FilterOptions />
          </Suspense>
        </div>

        <div className='grid grid-cols-1'>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <div className='flex flex-col w-full gap-4 p-4 rounded-lg bg-red-50'>
                    <div className='flex items-center gap-2'>
                      <ExclamationCircleIcon className='h-8 text-red-600' />
                      <h3 className='text-red-900'>
                        {error.response.data.title || 'Error inesperado'}
                      </h3>
                    </div>
                    <p className='text-gray-700'>
                      {error.response.data.message ||
                        'Ha ocurrido un error, intenta más tarde'}
                    </p>
                    <Button onClick={() => resetErrorBoundary()}>
                      Recargar
                    </Button>
                  </div>
                )}
                onReset={reset}
              >
                <Suspense
                  fallback={
                    <SkeletonTable
                      columns={6}
                      rows={5}
                      paddingYRows={4}
                      arrayTitles={[
                        'Producto',
                        'Precio de venta',
                        'Consto unitario',
                        '% de comision',
                        'Estado',
                        'Acciones',
                      ]}
                    />
                  }
                >
                  <ProductsList setDataProducts={setDataProducts} />
                  <ProductsListMobile />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
          <Pagination products={dataProducts} />
        </div>
      </div>
    </Template>
  );
};

export default ProductsPages;
