import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { authAction } from './redux/auth/auth.action';
import Routers from './routes';
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vite/modulepreload-polyfill';
import { ReactQueryDevtools } from 'react-query/devtools';
import { FaInternetExplorer } from 'react-icons/fa';
import { StatusOfflineIcon } from '@heroicons/react/solid';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authAction());
  }, []);

  const onLine = navigator.onLine

  return (
    <div>
      {!onLine && (
        <div className='absolute p-2 text-red-800 rounded-md shadow-sm right-2 top-4 bg-red-50'>
          <div className='flex gap-2'>
            <StatusOfflineIcon className='h-6' />{' '}
            <p>No hay conexion a internet</p>
          </div>
        </div>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
      <Routers />
    </div>
  );
};

export default App;
