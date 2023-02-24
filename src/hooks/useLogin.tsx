import React from 'react';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { LOGIN } from '../services';
import { setLoginSuccess, setLoginError } from '../redux/auth/auth.slice.js';
import { toast } from 'react-toastify';
import Toast from '../shared/Toast';

const useLogin = () => {
  const dispatch = useDispatch();
  const {
    mutate: login,
    isLoading: isLoadingLogin,
    ...rest
  } = useMutation(LOGIN, {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      dispatch(setLoginSuccess(data));
    },
    onError: (error: any) => {

      if (error.code === 'ERR_NETWORK') {
        toast.error('No de coneccion');
      }
      dispatch(setLoginError(error.response.data.msg));
    },
  });
  <Toast />;
  return { login, isLoadingLogin, ...rest };
};

export default useLogin;
