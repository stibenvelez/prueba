import React from 'react'

const LoadingView = () => {
    return (
        <div className="flex items-center justify-center w-full h-screen animate-pulse bg-gray-50">
            <img
                src={`${import.meta.env.VITE_PUBLIC_URL}/img/app/logo.svg`}
                className="fill-red-500 w-52"
                alt="React Logo"
            />
        </div>
    );
};

export default LoadingView;
