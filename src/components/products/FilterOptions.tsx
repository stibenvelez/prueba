import React, { useCallback, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { debounce } from 'debounce';
import useProductsCategories from '../../hooks/useProductsCategories';

const FilterOptions = () => {
  const searchRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const { productCategoriesOptions } = useProductsCategories();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeDebounce = useCallback(
    debounce(handleChange, 500, true),
    []
  );

  return (
    <div>
      <div className='py-3'>
        <Link
          to='new-product'
          className='px-3 py-2 text-white rounded-md bg-slate-800 hover:bg-slate-700'
        >
          Agregar producto
        </Link>
      </div>
      <div className='grid grid-cols-1 gap-4 py-2 lg:grid-cols-6'>
        <div className='flex flex-wrap gap-4 lg:col-span-4'>
          <div className='space-x-1'>
            <label htmlFor='category'>Categoría</label>
            <select
              className='px-2 py-2 border rounded bg-gray-50'
              name='category'
              id='category'
              onChange={handleChange}
              value={Object.fromEntries([...searchParams])?.category}
            >
              <option value=''>Todas</option>
              {productCategoriesOptions.map((category) => (
                <option key={category.value} value={category.label}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className='space-x-1'>
            <label htmlFor='state'>Estado</label>
            <select
              className='px-2 py-2 border rounded bg-gray-50'
              id='state'
              name='state'
              onChange={handleChange}
              value={Object.fromEntries([...searchParams])?.state}
            >
              <option value='active'>Activo</option>
              <option value='inactive'>Inactivo</option>
            </select>
          </div>
        </div>
        <div className='justify-end lg:col-start-5 lg:col-end-7'>
          <div className='flex items-center align-middle'>
            <label htmlFor='simple-search' className='sr-only'>
              Search
            </label>
            <div className='relative w-full'>
              <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                <svg
                  className='w-5 h-5 text-gray-500 dark:text-gray-400'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                    clipRule='evenodd'
                  ></path>
                </svg>
              </div>
              <input
                type='text'
                id='search'
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:outline-none  focus:border-indigo-800 block w-full pl-10 py-2.5  dark:bg-gray-700 dark:indigo-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-600 dark:focus:border-indigo-800'
                placeholder=' Buscar'
                name='search'
                onChange={handleChange}
                ref={searchRef}
                value={Object.fromEntries([...searchParams])?.search}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterOptions;
