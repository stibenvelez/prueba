import { Suspense, useState } from 'react';
import BrandsList from '../../components/brads/BrandsList';
import FormBrand from '../../components/brads/FormBrand';
import SlideOver from '../../components/ui/SlideOver';
import Template from '../../components/ui/Template';
import SkeletonTable from '../../shared/SkeletonTable';
import GoBackButton from '../../shared/GoBackButton';
import Filters from '../../components/brads/Filters';
import { QueryErrorResetBoundary } from 'react-query';
import { ErrorBoundary } from 'react-error-boundary';
import Button from '../../shared/Button';
import { ExclamationCircleIcon } from '@heroicons/react/outline';

const BrandsPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [brand, setBrand] = useState(null);
  const [formMode, setFormMode] = useState('ADD');

  const handleCreateBrand = () => {
    setOpen(true);
    setFormMode('ADD');
  };

  return (
    <Template
      title='Marcas registradas'
      description='Aqui encontrara todas las marcas registradas en el sistema'
    >
      <SlideOver setOpen={setOpen} isOpen={isOpen}>
        <FormBrand
          formMode={formMode}
          setOpen={setOpen}
          brand={brand}
          setFormMode={setFormMode}
        />
      </SlideOver>
      <div>
        <div className='flex gap-2 py-3'>
          <GoBackButton />
          <button
            type='button'
            onClick={handleCreateBrand}
            className='px-3 py-2 text-white rounded-md bg-slate-800 hover:bg-slate-700'
          >
            Agregar marca
          </button>
        </div>
        <div>
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                fallbackRender={({ error, resetErrorBoundary }) => (
                  <div className='flex flex-col w-full gap-4 p-4 rounded-lg bg-red-50'>
                    <div className='flex items-center gap-2'>
                      <ExclamationCircleIcon className='h-8 text-red-600' />
                      <h3 className='text-red-900'>Error inesperado</h3>
                    </div>
                    <p className='text-gray-700'>{error.message}</p>
                    <Button onClick={() => resetErrorBoundary()}>
                      Recargar
                    </Button>
                  </div>
                )}
                onReset={reset}
              >
                <Suspense
                  fallback={
                    <div className="flex gap-4 py-4">
                      <div
                        className={`bg-gray-200
                         w-36 h-2  rounded-md my-1`}
                      />
                      <div
                        className={`bg-gray-200
                         w-36 h-2  rounded-md my-1`}
                      />
                    </div>
                  }
                >
                  <Filters />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div className='flex flex-col w-full gap-4 p-4 rounded-lg bg-red-50'>
                  <div className='flex items-center gap-2'>
                    <ExclamationCircleIcon className='h-8 text-red-600' />
                    <h3 className='text-red-900'>Error inesperado</h3>
                  </div>
                  <p className='text-gray-700'>{error.message}</p>
                  <Button onClick={() => resetErrorBoundary()}>Recargar</Button>
                </div>
              )}
              onReset={reset}
            >
              <Suspense fallback={<SkeletonTable columns={4} rows={8} />}>
                <BrandsList
                  setFormMode={setFormMode}
                  isOpen={isOpen}
                  setOpen={setOpen}
                  setBrand={setBrand}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </Template>
  );
};

export default BrandsPage;
