import * as Yup from 'yup';

export const LoginFormSchema = Yup.object().shape({
    user: Yup.string().required('El usuario es requerido').max(12, 'El usuario no puede tener mas de 12 caracteres'),
    password: Yup.string().required('Introdusca la contraseña').max(12, 'El usuario no puede tener mas de 12 caracteres'),
})
