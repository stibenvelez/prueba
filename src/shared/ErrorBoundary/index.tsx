import React, { FC } from 'react'
import { QueryErrorResetBoundary } from 'react-query'
import { ErrorBoundary } from 'react-error-boundary';
import { ExclamationCircleIcon } from '@heroicons/react/outline';
import Button from '../Button';

interface ErrorBoundaryProps {
    children: React.ReactNode;
}

const ErrorBoundary:FC<ErrorBoundaryProps> = ({children}) => {
  return (
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
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default ErrorBoundary
