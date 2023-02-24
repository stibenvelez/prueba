import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from 'react-query';
import Template from '../../components/ui/Template';
import UsersList from '../../components/users/UsersList';
import Button from '../../shared/Button';
import SkeletonTable from '../../shared/SkeletonTable';

const UsersPage = () => {
  return (
    <Template title='Usuarios' description='Lista de usuarios'>
      <div className='max-w-2xl mx-auto'>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              fallbackRender={({ error, resetErrorBoundary }) => (
                <div className='flex flex-col w-full gap-4 p-4 rounded-lg bg-red-50'>
                  <div className='flex items-center gap-2'>
                    <ExclamationCircleIcon className='h-8 text-red-600' />
                    <h3 className='text-red-900'> {error.response.data.title || 'Error inesperado'}</h3>
                  </div>
                  <p className='text-gray-700'>
                    {error.response.data.message || 'Ha ocurrido un error, intenta más tarde'}
                  </p>
                  <Button onClick={() => resetErrorBoundary()}>Recargar</Button>
                </div>
              )}
              onReset={reset}
            >
              <Suspense fallback={<SkeletonTable columns={5} rows={5} />}>
                <UsersList />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </Template>
  );
};

export default UsersPage;
