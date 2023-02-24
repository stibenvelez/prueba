import { InputProps } from '../../models';
import { forwardRef } from 'react';

const BUTTON_SIZE = {
  sm: 'p-2',
  md: 'p-2',
  lg: 'p-4',
};

const HORIENTATION = {
  vertical: 'flex-col justify-start',
  horizontal: 'flex-row items-center',
};

const DEFAULT_CLASSNAME = `w-full text-base transition-all duration-200 ease-in-out border border-gray-200 rounded-md bg-gray-50 focus:outline-indigo-500 outline-transparent mt-0 `;


const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name = '',
      label = '',
      type = 'text',
      disabled = false,
      required = false,
      placeholder = '',
      autoComplete = 'off',
      onChange,
      error,
      sizeClass = 'md',
      className = '',
      horientation = 'vertical',
      ...args
    },
    ref
  ) => {
    return (
      <div className={`flex gap-2  ${HORIENTATION[horientation]}`}>
        {label && (
          <label
            htmlFor={name}
            className='block space-x-2 text-sm text-gray-700 capitalize'
          >
            {label}
            {required && <span className='ml-1 text-red-600'>*</span>}
          </label>
        )}
        <input
          className={`${className} ${DEFAULT_CLASSNAME} ${BUTTON_SIZE[sizeClass]}`}
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          disabled={disabled}
          placeholder={placeholder}
          onChange={onChange}
          {...args}
          ref={ref}
        />
        {error && error?.[name] && (
          <span className='text-red-600'>{error?.[name]}</span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
