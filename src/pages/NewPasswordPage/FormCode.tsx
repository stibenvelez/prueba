import React from 'react'
import { useMutation } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { VALIDATE_TOKEN } from '../../services';
import Button from '../../shared/Button';
import Input from '../../shared/Input';

const FormCode = ({setCodeIsValid}:any) => {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();
    const [code, setCode] = React.useState('')


  const {
    mutate: validateToken,
    isLoading: isLoadingValidateToken,
    isError,
  } = useMutation(VALIDATE_TOKEN, {
    onSuccess: () => {
       setCodeIsValid(true)
    },
    onError: () => {
      navigate('/');
    },
  });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        validateToken({code, token})
        console.log(code)
    }
  return (
    <form onSubmit={handleSubmit}>
      <div className='space-y-4 w-80'>
        <Input
          name='code'
          type='text'
          label='Código'
          placeholder='####'
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type='submit' isLoading={isLoadingValidateToken}>
          Ingresar
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
  );
}

export default FormCode
