import { forwardRef, SelectHTMLAttributes } from 'react';

type Option = {
  value: string | number;
  label: string;
};
export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement | HTMLSelectElement> {
  className?: string;
  sizeClass?: string;
  name: string;
  label?: string;
  error?: any;
  render?: any;
  options?: Array<Option>;
  direction?: 'vertical' | 'horizontal';
  large?: boolean;
  emptyOption?: boolean;
  emptyOptionLabel?: string;
  emptyOptionValue?: string;
  whithLabel?: boolean;
}

export type Ref = HTMLSelectElement;

const DISABLED_CLASS = 'bg-gray-100 cursor-not-allowed text-gray-400';
const DIRECTION_CLASS = {
  vertical: 'flex-col ',
  horizontal: 'flex-row justify-center items-center',
};

const Select = forwardRef<Ref, SelectProps>(
  (
    {
      className = '',
      sizeClass = '',
      children,
      name = '',
      label = '',
      required = false,
      disabled = false,
      error = null,
      render = null,
      options = [],
      direction = 'vertical',
      large = true,
      emptyOption = false,
      value = '',
      emptyOptionLabel = 'Seleccione',
      emptyOptionValue = '',
      whithLabel = false,
      ...args
    },
    ref
  ) => {
    const EmptyOption = () => (
      <option hidden value={emptyOptionValue}>
        {emptyOptionLabel}
      </option>
    );

    const defaultClass = ` w-full h-full text-base
                 px-2 py-2 bg-gray-50 border rounded-md shadow-sm border-gray-200bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500
                ${className}
                 ${disabled && DISABLED_CLASS}`;

    const labelSelect =
      'px-3 py-2 mt-1 bg-gray-100 border border-gray-200 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm';

    return (
      <div className={`flex w-full gap-2 ${DIRECTION_CLASS[direction]}`}>
        {label && (
          <label
            htmlFor={name}
            className='block text-sm text-gray-700 capitalize'
          >
            {label}
            {required && <span className='text-red-600'>*</span>}
          </label>
        )}
        <div className='flex items-center w-full gap-2'>
          <select
            name={name}
            className={whithLabel ? labelSelect : defaultClass}
            ref={ref}
            value={value}
            {...args}
          >
            {children}
            {emptyOption && <EmptyOption />}
            {options.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          {render && render}
        </div>
        {error && Object.keys?.length && value === '' && (
          <span className='text-red-600'>{error[name]}</span>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';

export default Select;
