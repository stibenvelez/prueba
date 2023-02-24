export interface UserError {
    user: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    currentPassword: string;
    passwordConfirm: string;
    newPassword: string;
}

export interface User {
    id: number;
    user: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    currentPassword: string;

}

export interface CreateUser {
    user: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    password: string;
    passwordConfirm: string;
    newPassword: string;
}

export interface NewPassword {
    idUser?: string;
    currentPassword: string;
    newPassword: string;
    passwordConfirm?: string;
}
export const EmptyNewPassword: NewPassword = {
    idUser: "",
    currentPassword: "",
    newPassword: "",
    passwordConfirm: "",
};
