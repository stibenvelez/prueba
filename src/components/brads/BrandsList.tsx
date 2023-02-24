import { FC, useRef } from 'react';
import { Table, Thead } from '../ui/Table';
import useBrands from '../../hooks/useBrands';
import { getBrandAdapter } from '../../adapters/brands.adapter';
import {
  CheckCircleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { useMutation, useQueryClient } from 'react-query';
import { DELETE_BRAND } from '../../services/brands.services';
import { toast } from 'react-toastify';
import Toast from '../..//helpers/Toast';
import { useSearchParams } from 'react-router-dom';
interface BrandsListProps {
  setBrand: (brand: any) => void;
  setOpen: (open: boolean) => void;
  setFormMode: (mode: string) => void;
}

const BrandsList: FC<BrandsListProps> = ({
  setBrand,
  setOpen,
  setFormMode,
}) => {
  const toastId = useRef(null);

  const notify = ({ state }: any) =>
    (toastId.current = toast.loading(
      state.state === 'active' ? 'Eliminando marca...' : 'Restaurando marca...',
      {
        autoClose: false,
        isLoading: true,
      }
    ));
  const update = (data: any) => {
    return toast.update(toastId.current, {
      type: toast.TYPE.SUCCESS,
      autoClose: 3000,
      isLoading: false,
      render: data.messasge,
    });
  };

  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const { brands, isError } = useBrands({
    filters: Object.fromEntries([...searchParams]),
  });

  const { mutateAsync: deleteBrand } = useMutation(DELETE_BRAND, {
    onMutate: async (data: number) => {
      notify(data);
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries('brands');
      //toast.success('Marca eliminada con éxito');
      update(data);
    },
    onError: (err: any) => {
      toast.error(err.response.data.message);
    },
  });

  const handleEdit = (brand) => {
    setFormMode('UPDATE');
    setBrand(getBrandAdapter(brand));
    setOpen(true);
  };

  const handleView = (brand) => {
    setFormMode('VIEW');
    setBrand(brand);
    setOpen(true);
  };

  const handleDelete = (brand: any) => {
    deleteBrand(brand);
  };

  if (!brands?.length) {
    return (
      <div className='flex justify-center'>
        <p className='text-gray-500'>No hay marcas para mostrar</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <Thead>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Marca
            </th>
            <th scope='col' className='px-6 py-3'>
              Tipo
            </th>
            <th scope='col' className='px-6 py-3'>
              Estado
            </th>
            <th scope='col' className='px-6 py-3'>
              Acciones
            </th>
          </tr>
        </Thead>
        <tbody>
          {brands &&
            brands.map((brand, i) => (
              <tr
                key={i}
                className='bg-white border-b shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 '
              >
                <td className='px-6 py-2'>{brand.brand}</td>
                <td className='px-6 py-2'>{brand.productCategory.category}</td>
                <td className='px-6 py-2'>{brand.state.state}</td>
                <td className='px-6 py-2'>
                  <div className='flex gap-2 space-x-2'>
                    <EyeIcon
                      className='h-5 text-gray-300 transition duration-200 ease-in-out cursor-pointer hover:text-gray-600'
                      onClick={() => handleView(getBrandAdapter(brand))}
                    />
                    <PencilIcon
                      className='h-5 text-gray-300 transition duration-200 ease-in-out cursor-pointer hover:text-blue-700'
                      onClick={() => handleEdit(brand)}
                    />
                    {brand.state.state !== 'inactive' ? (
                      <TrashIcon
                        className='h-5 text-gray-300 transition duration-200 ease-in-out cursor-pointer hover:text-red-700'
                        onClick={() => handleDelete(brand)}
                      />
                    ) : (
                      <CheckCircleIcon
                        className='h-5 text-gray-300 transition duration-200 ease-in-out cursor-pointer hover:text-green-700'
                        onClick={() => handleDelete(brand)}
                      />
                    )}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <Toast />
    </>
  );
};

export default BrandsList;
