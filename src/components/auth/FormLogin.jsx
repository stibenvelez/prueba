import React, { useEffect, useRef, useState } from 'react';
import { EyeIcon, EyeOffIcon, LockClosedIcon } from '@heroicons/react/solid';
import Card from '../../shared/Card';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { LoginFormSchema } from './schemas/LoginFormSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import Input from '../../shared/Input';
import Button from '../../shared/Button';
import useLogin from '../../hooks/useLogin';
import { toast } from 'react-toastify';
import Toast from '../../shared/Toast';

const initialState = { user: '', password: '' };

const FormLogin = () => {
  const [user, setUser] = useState(initialState);
  const [showPassword, setshowPassword] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const { login, isLoadingLogin } = useLogin();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user, {
      onError: (error) => {
        toast.error(error.response.data.message);
      },
    });
  };

  useEffect(() => {
    if (user.user !== '' && user.password !== '') {
      return setIsValid(true);
    }

    setIsValid(false);
  }, [user]);
  return (
    <>
      <Card>
        <div className='flex items-center justify-center min-h-full px-6 py-6 sm:px-6 lg:px-8'>
          <div className='w-full max-w-md'>
            <div>
              <div className='flex justify-center w-full'>
                <img
                  src={`/img/app/logo.svg`}
                  className='fill-red-500'
                  alt='React Logo'
                />
              </div>
              <h2 className='text-3xl font-extrabold text-center text-gray-900 md:mx-10'>
                Iniciar Sesión
              </h2>
            </div>

            <form className='space-y-4' onSubmit={handleSubmit}>
              <div className='space-y-2 rounded-md shadow-sm'>
                <Input
                  label='Usuario'
                  name='user'
                  required={true}
                  onChange={handleChange}
                  value={user.user}
                />
                <Input
                  label='Contraseña'
                  name='password'
                  required={true}
                  type={showPassword ? 'text' : 'password'}
                  onChange={handleChange}
                  value={user.password}
                />
              </div>
              <div className='flex items-center justify-between'>
                <a
                  href='forgot-password'
                  className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Olvidé mi contraseña
                </a>
                {!showPassword && (
                  <EyeIcon
                    onClick={() => setshowPassword(!showPassword)}
                    className='h-5 text-indigo-400 cursor-pointer hover:text-indigo-500'
                  >
                    Mostrar
                  </EyeIcon>
                )}
                {showPassword && (
                  <EyeOffIcon
                    onClick={() => setshowPassword(!showPassword)}
                    className='h-5 text-indigo-400 cursor-pointer hover:text-indigo-500'
                  >
                    Ocultar
                  </EyeOffIcon>
                )}
              </div>

              <div>
                <Button isValid={isValid} type='submit'>
                  <div className='relative'>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                      <LockClosedIcon
                        className={`${
                          !isValid
                            ? 'bg-blue-400'
                            : 'text-indigo-500 group-hover:text-indigo-400 '
                        }w-5 h-5 `}
                        aria-hidden='true'
                      />
                    </span>
                    {isLoadingLogin ? 'Cargando...' : 'Ingresar'}
                  </div>
                </Button>
              </div>
            </form>
          </div>
        </div>
        <Toast />
      </Card>
    </>
  );
};

export default FormLogin;
