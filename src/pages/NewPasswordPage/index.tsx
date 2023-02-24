import React, { useEffect } from 'react';
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../shared/Button';
import Input from '../../shared/Input';
import { NEW_PASSWORD, VALIDATE_TOKEN } from '../../services';
import { toast } from 'react-toastify';
import Toast from '../../helpers/Toast';
import FormCode from './FormCode';

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const [codeIsValid, setCodeIsValid] = React.useState(false);
  const [newPassword, setNewPassword] = React.useState({
    password: '',
    passwordConfirm: '',

  });
  const { token } = useParams<{ token: string }>();

  const {mutate: updatePassword, isLoading: isloadingNewPassword} = useMutation(NEW_PASSWORD, {
    onSuccess: () => {
      navigate('/');
    },
    onError: (error: any) => {
      toast.error(error.response.data.message)
    }
  });

  const handleChange = (e) => {
    setNewPassword({
      ...newPassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePassword({ ...newPassword, token });
  }

  return (
    <div className='container h-screen mx-auto'>
      <div className='h-screen space-y-8'>
        <div>
          <h1 className='text-4xl font-bold'>Crear contraseña nueva</h1>
          <p>establesca una nueva contraseña</p>
        </div>
        <div className='flex justify-center py-8 '>
          {!codeIsValid && <FormCode setCodeIsValid={setCodeIsValid} />}
          {codeIsValid && (
            <form onSubmit={handleSubmit}>
              <div className='space-y-4 w-80'>
                <Input
                  name='password'
                  type='password'
                  label='Nueva Password'
                  placeholder='Password'
                  value={newPassword.password}
                  onChange={handleChange}
                />
                <Input
                  name='passwordConfirm'
                  label='Confirmar Password'
                  type='password'
                  placeholder='Confirm password'
                  value={newPassword.passwordConfirm}
                  onChange={handleChange}
                />
                <Button type='submit' isLoading={isloadingNewPassword}>
                  Actualizar
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  type='button'
                  variant='transparent'
                >
                  Cancelar
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default NewPasswordPage;
