import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Select from '../../shared/Select';
import useProductsCategories from '../..//hooks/useProductsCategories';
import Input from '../../shared/Input';
import { SearchCircleIcon, SearchIcon } from '@heroicons/react/outline';

const Filters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { productCategoriesOptions } = useProductsCategories();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ): void => {
    console.log(productCategoriesOptions, searchParams);
    setSearchParams({
      ...Object.fromEntries([...searchParams]),
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='flex items-center justify-between w-full'>
      <div className='flex gap-4 py-4'>
        <div className='space-x-1'>
          <Select
            name='category'
            label='Categoría'
            options={[
              { value: '', label: 'Todas' },
              ...productCategoriesOptions,
            ]}
            onChange={handleChange}
            value={Object.fromEntries([...searchParams])?.category}
            direction='horizontal'
          />
        </div>
        <div className='space-x-1'>
          <label htmlFor='state'>Estado</label>
          <select
            className='px-2 py-2 border rounded bg-gray-50'
            name='state'
            id='state'
            onChange={handleChange}
            value={Object.fromEntries([...searchParams])?.state}
          >
            <option value='active'>Activo</option>
            <option value='inactive'>Inactivo</option>
          </select>
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <SearchIcon className='h-6 text-gray-400'/>
        <Input
          name='search'
          label=''
          type='search'
          onChange={handleChange}
          value={Object.fromEntries([...searchParams])?.search}
          horientation='horizontal'
          placeholder='Buscar...'
        />
      </div>
    </div>
  );
};

export default Filters;
