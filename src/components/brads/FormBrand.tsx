import { useState, FC, useEffect } from 'react';
import useProductsCategories from '../../hooks/useProductsCategories';
import { useMutation, useQueryClient } from 'react-query';
import { CREATE_BRAND, UPDATE_BRAND } from '../../services/brands.services';
import { toast } from 'react-toastify';
import { Brand } from '../../models';

interface FormBrandProps {
  setOpen: (open: boolean) => void;
  brand?: any;
  formMode?: string;
  modeForm?: string;
  setFormMode?: (mode: string) => void;
}

const INITIAL_STATE_BRAND = {
  brand: '',
  brandCategory: '',
  description: '',
};

const FormBrand: FC<FormBrandProps> = ({
  setOpen,
  brand,
  formMode = 'ADD',
  setFormMode,
}) => {
  const queryClient = useQueryClient();
  const [newBrand, setNewBrand] = useState(INITIAL_STATE_BRAND);
  const { productCategoriesOptions } = useProductsCategories();
  const { mutate: addNewBrand, isLoading: isLoadingAddBrand } = useMutation(
    CREATE_BRAND,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('brands');
        toast.success('Marca creada con éxito');
        setOpen(false);
      },
      onError: (err: any) => {
        toast.error(err.response.data.message);
        rollback();
      },
    }
  );
  const { mutate: updateBrand, isLoading: isLoadingUpdateBrand } = useMutation(
    UPDATE_BRAND,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('brands');
        toast.success('Marca actualizada con éxito');
        setOpen(false);
      },
    }
  );

  useEffect(() => {
    if (formMode === 'UPDATE' || (formMode === 'VIEW' && brand)) {
      setNewBrand(brand);
    }
  }, [formMode]);

  const handleChange = (e) => {
    setNewBrand({ ...newBrand, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'ADD') {
      addNewBrand(newBrand);
      return;
    }
    if (formMode === 'UPDATE') {
      updateBrand(newBrand);
    }
    setFormMode('UPDATE');
    //socket.emit("created_brand", newBrand);
    //setOpen(false)
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap mb-4 -mx-3'>
          <div className='w-full px-3'>
            <label className='block mb-2 text-gray-700' htmlFor='brand'>
              marca
            </label>

            <input
              className='block w-full px-4 py-3 mb-3 leading-tight text-gray-500 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-gray-50 focus:border-indigo-600'
              id='brand'
              type='text'
              placeholder='Pionner, JBC, Bose, etc.'
              name='brand'
              value={newBrand.brand}
              onChange={handleChange}
            />
          </div>
          <div className='w-full px-3'>
            <label className='block mb-2 text-gray-700' htmlFor='brandCategory'>
              Categoría
            </label>

            <select
              className='block w-full px-4 py-3 mb-3 leading-tight text-gray-500 border border-gray-200 rounded focus:outline-none focus:bg-gray-50 focus:border-indigo-600'
              id='brandCategory'
              name='brandCategory'
              value={newBrand.brandCategory}
              onChange={handleChange}
            >
              <option value=''>Seleccione una categoría</option>
              {productCategoriesOptions &&
                productCategoriesOptions.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
            </select>
          </div>
          <div className='w-full px-3'>
            <label className='block mb-2 text-gray-700' htmlFor='description'>
              Descripción
            </label>

            <textarea
              className='block w-full px-4 py-3 mb-3 leading-tight text-gray-500 border border-gray-200 rounded appearance-none focus:outline-none focus:bg-gray-50 focus:border-indigo-600'
              id='description'
              placeholder='Descripción de la marca'
              name='description'
              value={newBrand.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className='flex flex-wrap gap-2'>
          <button
            type='submit'
            className='px-4 py-2 text-white rounded bg-slate-800 hover:bg-slate-700 focus:outline-none focus:shadow-outline'
          >
            {formMode === 'ADD' && !isLoadingAddBrand && 'Guardar'}
            {formMode === 'ADD' && isLoadingAddBrand && 'Guardando...'}
            {formMode === 'UPDATE' && !isLoadingUpdateBrand && 'Actualizar'}
            {formMode === 'UPDATE' && isLoadingUpdateBrand && 'Actualizando...'}
            {formMode === 'VIEW' && 'Editar'}
          </button>
          {formMode !== 'VIEW' && (
            <button
              onClick={() => setOpen(false)}
              type='button'
              className='px-4 py-2 text-white bg-gray-400 rounded hover:bg-gray-500 focus:outline-none focus:shadow-outline'
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormBrand;
function rollback() {
  throw new Error('Function not implemented.');
}
