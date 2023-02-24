import React, {FC} from "react";
import SpinnerButton from "../SpinnerButton";


interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isValid?: boolean;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'transparent' | 'contained';
  isLoading?: boolean;
  fullWidth?: boolean;
  textLoading?: string;
}

const VARIANTS = {
  primary:
    'bg-slate-800 py-2 px-4 text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:shadow-outline cursor-pointer transition duration-150 ease-in-out disabled:bg-slate-400 disabled:text-gray-100 disabled:cursor-default',
  secondary:
    'bg-gray-500  py-2 px-4 text-white rounded-lg hover:bg-slate-500 focus:outline-none focus:shadow-outline cursor-pointer transition duration-150 ease-in-out disabled:bg-slate-400 disabled:text-gray-100 disabled:cursor-default',
  transparent:
    'bg-transparent border-0 text-center py-2 px-4  border-gray-300 text-gray-500 hover:text-slate-700 focus:outline-none focus:shadow-outline cursor-pointer transition duration-150 ease-in-out disabled:bg-gray-300 disabled:text-gray-100 disabled:cursor-default',
  contained: 'bg-slate-800 py-2 px-4 w-full text-white rounded-lg hover:bg-slate-700 focus:outline-none focus:shadow-outline cursor-pointer transition duration-150 ease-in-out disabled:bg-slate-400 disabled:text-gray-100 disabled:cursor-default',
};

const Button:FC<ButtonProps> = ({
  children,
  className,
  disabled,
  type,
  variant='primary',
  isLoading,
  fullWidth,
  textLoading,
  ...props
}) => {
  const classes = `${className}}`;
  return (
    <button
      className={` ${VARIANTS[variant]} ${classes}`}
      type={type}
      {...props}
      disabled={disabled}
    >
      {isLoading && (
        <div
          className={`flex items-center justify-center gap-2 ${
            fullWidth ? 'w-full' : ''
          }`}
        >
          <SpinnerButton /> {textLoading}
        </div>
      )}
      {!isLoading && children}
    </button>
  );
};

Button.defaultProps = {
  fullWidth: false,
  isLoading: false,
  variant: 'primary',
  disabled: false,
  type: 'button',
  textLoading: 'Cargando...',
};

export default Button;
