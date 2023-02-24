import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Toast from '../../helpers/Toast';
import { FORGOT_PASSWORD } from '../../services';
import Button from '../../shared/Button';
import Input from '../../shared/Input';


const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [emailSent, setEmailSent] = React.useState(false);

  const { mutate: sendEmail, isLoading } = useMutation(FORGOT_PASSWORD);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendEmail(email, {
      onSuccess: (data) => {
        navigate(`/new-password/${data.token}`)
      },
      onError: (error: any) => {
        toast.error(error.response.data.message);
      },
    });
  };

  if (emailSent) {
    return (
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold'>Email enviado</h1>
        <p>
          puedes revisar tu bandeja de entrada para continuar con el proceso de
          restable contraseña
        </p>
        <Button type='button' variant='transparent' onClick={()=>navigate('/')}>Volver</Button>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col w-full max-w-xl gap-8 '>
          <img src='/img/app/logo.svg' alt='logo' className='h-40' />

          <p className='text-gray-600'>
            Ingresa el email asociado a tu cuenta y te enviaremos un email para
            restablecer tu contraseña
          </p>
          <div className='space-y-4'>
            <Input
              name='email'
              label='Email'
              type='email'
              placeholder='Email'
              required
              onChange={handleChange}
            />
            <Button type='submit' isLoading={isLoading}>
              Continuar
            </Button>
          </div>
        </div>
      </form>
      <Toast />
    </div>
  );
};

export default ForgotPasswordPage;
