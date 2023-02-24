
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { AuthStateType } from "../../types/products.types";

const AuthLayout = () => {

    const { loading, auth }: any = useSelector(
        ({ auth }: AuthStateType) => auth
    );


    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-screen animate-pulse bg-gray-50">
                <img
                    src={`${
                        import.meta.env.VITE_PUBLIC_URL
                    }/img/app/logo.svg`}
                    className="fill-red-500 w-52"
                    alt="React Logo"
                />
            </div>
        );
    }
    return <>{auth ? <Navigate to="/dashboard" /> : <Outlet />}</>;
};

export default AuthLayout;
