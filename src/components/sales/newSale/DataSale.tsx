import React, { useState, FC, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import usePaymentMethod from '../../../hooks/usePaymentMethod.js';
import Select from '../../../shared/Select/index.js';
import { readDatasaleAction } from '../../../redux/sales/sales.action.js';
import Input from '../../../shared/Input/index.js';

interface DataSaleProps {
  handleChange: (data: ChangeEvent) => void;
  errors: any;
}

const DataSale: FC<DataSaleProps> = ({ handleChange, errors }) => {
  const dispatch = useDispatch();
  const [isAnonymus, setIsAnonymus] = useState(false);
  const { date, document, documentType, payMethod } = useSelector(
    ({ sales }) => sales.dataSale
  );
  const { dataSale } = useSelector(({ sales }) => sales);

  const handleChangeAnonymus = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(readDatasaleAction({ ...dataSale, document: '0' }));
    setIsAnonymus(e.target.checked);
  };

  const { optionPaymentMethods } = usePaymentMethod();

  return (
    <div>
      <div className='col-span-6 sm:col-span-2'>
        <label
          htmlFor='date'
          className='block text-sm font-medium text-gray-700'
        >
          Fecha<span className='text-red-600'>*</span>
        </label>
        <input
          id='date'
          type='date'
          name='date'
          autoComplete='given-name'
          className='px-2 py-1 mt-1 border border-gray-200 rounded-md'
          onChange={handleChange}
          value={date}
        />
      </div>

      <div className='mt-3'>
        <div className='grid gap-6 lg:grid-cols-3'>
          <Select
            label='Tipo de documento'
            id='documentType'
            name='documentType'
            autoComplete='given-documentType'
            onChange={handleChange}
            value={documentType}
            options={[
              { value: '1', label: 'CC' },
              { value: '2', label: 'NIT' },
              { value: '3', label: 'CE' },
              { value: '4', label: 'PPE' },
            ]}
            disabled={isAnonymus}
          />
          <Input
            label='Documento'
            type='text'
            name='document'
            id='document'
            autoComplete='document'
            onChange={handleChange}
            disabled={isAnonymus}
            value={isAnonymus ? 0 : document}
          />
          <Select
            label='Metodo de pago'
            name='payMethod'
            value={payMethod}
            onChange={handleChange}
            options={optionPaymentMethods}
            error={errors}
          />

          <div className='flex items-center space-x-2'>
            <input
              type='checkbox'
              name='anonymousClient'
              //onChange={(e) => setIsAnonymus(e.target.checked)}
              onChange={handleChangeAnonymus}
            />
            <label className='ml-3'>Cliente anómino</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSale;
