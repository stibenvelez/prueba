import React, {
    ChangeEvent,
    ChangeEventHandler,
    FormEvent,
    useEffect,
    useState,
} from "react";
import { formValidateNewPassword } from "../users/utils/formValidateNewPassword";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updatePasswordAction } from "../../redux/users/users.actions";
import { EmptyNewPassword, UserError } from "../..//models";

const FormNewPassword = ({ setOpenSlide }) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [updatePassword, setUpdatePassword] = useState(EmptyNewPassword);
    const [errors, setErrors] = useState<Partial<UserError> | null>({});

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdatePassword({
            ...updatePassword,
            [e.target.name]: e.target.value,
            idUser: id,
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errors = formValidateNewPassword(updatePassword);

        if (Object.keys(errors).length) {
            setErrors(errors);
            return;
        }
        dispatch(updatePasswordAction(updatePassword));
        setUpdatePassword(EmptyNewPassword);
    };
    useEffect(() => {
        const errors = formValidateNewPassword(updatePassword);
        if (
            updatePassword.newPassword
            !== updatePassword.passwordConfirm &&
            errors
        ) {
            setErrors(errors);
            return;
        }
    }, [updatePassword]);

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 p-4">
                    <div>
                        <label htmlFor="currentPassword">
                            Contraseña actual
                        </label>
                        <input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            autoComplete="password"
                            placeholder="Contraseña actual"
                            className="block w-full px-3 py-2 mt-1 capitalize border rounded-md shadow-sm border-gray-200bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={updatePassword.currentPassword}
                        />
                        {errors?.currentPassword &&
                            updatePassword.currentPassword === "" && (
                                <span className="text-sm text-red-500">
                                    {errors.currentPassword}
                                </span>
                            )}
                    </div>
                    <div>
                        <label htmlFor="newPassword">Nueva contraseña</label>
                        <input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            autoComplete="off"
                            placeholder="Contraseña actual"
                            className="block w-full px-3 py-2 mt-1 capitalize border rounded-md shadow-sm border-gray-200bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={updatePassword.newPassword}
                        />
                        {errors?.newPassword &&
                            updatePassword.newPassword === "" && (
                                <span className="text-sm text-red-500">
                                    {errors.newPassword}
                                </span>
                            )}
                    </div>
                    <div>
                        <label htmlFor="passwordConfirm">
                            Confirmar contraseña
                        </label>
                        <input
                            id="passwordConfirm"
                            name="passwordConfirm"
                            type="password"
                            autoComplete="off"
                            placeholder="Contraseña actual"
                            className="block w-full px-3 py-2 mt-1 capitalize border rounded-md shadow-sm border-gray-200bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            onChange={handleChange}
                            value={updatePassword.passwordConfirm}
                        />
                        {updatePassword.passwordConfirm !==
                            updatePassword.newPassword && (
                            <span className="text-sm text-red-500">
                                {errors.passwordConfirm}
                            </span>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <input
                            className="inline-block px-4 py-2 text-white rounded-md cursor-pointer bg-slate-700 hover:bg-slate-600"
                            type="submit"
                            value="Guardar cambios"
                        />

                        <input
                            className="inline-block px-4 py-2 text-white bg-gray-400 rounded-md cursor-pointer hover:bg-gray-500"
                            type="button"
                            value="Cancelar"
                            onClick={() => setOpenSlide(false)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default FormNewPassword;
