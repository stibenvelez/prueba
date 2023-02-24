import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

interface GoBackButtonProps {
  size: 'sm' | 'md' | 'lg';
  path: string;
}

const SIZE = {
  sm: 'py-1 px-2',
  md: 'py-2 px-4',
  lg: 'py-3 px-6',
};

const GoBackButton: FC<GoBackButtonProps> = ({ size, path }) => {
  const navigate = useNavigate();

  const valueNavigate = () => {
    if (!path || path === '') {
      return navigate(-1);
    }
    return navigate(path);
  };
  return (
    <button
      onClick={() => valueNavigate()}
      className={` text-white bg-gray-500 rounded-md shadow-sm hover:bg-gray-400 hover:cursor-pointer ${SIZE[size]}`}
    >
      Volver
    </button>
  );
};

GoBackButton.defaultProps = {
  size: 'sm',
  path: null,
};

export default GoBackButton;
