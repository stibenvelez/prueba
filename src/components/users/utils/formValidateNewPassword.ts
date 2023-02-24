import { NewPassword, User, UserError } from "@/models";
import { UserAddIcon } from "@heroicons/react/outline";

interface Erros {
    currentPassword: string;
    passwordConfirm: string;
    newPassword: string;
}


export const formValidateNewPassword = (user: NewPassword) => {

    const errors: Partial<Erros> = {};
    if (user.currentPassword === "") {
        errors.currentPassword = "La contraseña es requerida";
    }
    if (user.passwordConfirm === "") {
        errors.passwordConfirm = "La confirmación de contraseña es requerida";
    }
    if (user.newPassword !== user.passwordConfirm) {
        errors.passwordConfirm = "Las contraseñas no coinciden";
    }
    return errors;
};
