import React, { forwardRef } from 'react';

interface CheckBoxProps {
  name?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: any;
  sizeClass?: 'sm' | 'md' | 'lg';
  checked?: boolean;
  className?: string;
  horientation?: 'vertical' | 'horizontal';
}

const HORIENTATION = {
  vertical: 'flex-col justify-center',
  horizontal: 'flex-row items-center',
};

const DEFAULT_CLASSNAME = `text-base transition-all duration-200 ease-in-out border border-gray-200 rounded-md bg-gray-50 focus:outline-indigo-500 outline-transparent mt-0 `;

const formValidation = (errors, errorkey) => {
  if (errors[errorkey]) {
    return (
      errors[errorkey] && <div className='text-red-500'>{errors[errorkey]}</div>
    );
  }
};

const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  (
    {
      name = '',
      label = '',
      disabled = false,
      required = false,
      onChange,
      error,
      sizeClass = 'md',
      checked = false,
      className = '',
      horientation = 'horizontal',
      ...args
    },
    ref
  ) => {
    return (
      <div className={`flex gap-2 itmes-center ${HORIENTATION[horientation]}`}>
        {label && (
          <label
            htmlFor={name}
            className='block space-x-2 text-gray-700 capitalize'
          >
            {label}
            {required && <span className='ml-1 text-red-600'>*</span>}
          </label>
        )}
        <input
          className={`${className} ${DEFAULT_CLASSNAME}`}
          id={name}
          name={name}
          type='checkbox'
          disabled={disabled}
          checked={checked}
          onChange={onChange}
          {...args}
          ref={ref}
        />
        {error && Object.keys.length && formValidation(error, name)}
      </div>
    );
  }
);
CheckBox.displayName = 'CheckBox';

export default CheckBox;
