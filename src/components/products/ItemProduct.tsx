import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import formatMoney from '../../helpers/formatMoney';
import Badge from '../ui/Badge';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import {
  CheckCircleIcon,
  EyeIcon,
  PencilAltIcon,
  TrashIcon,
} from '@heroicons/react/outline';
import { DELETE_PRODUCT } from '../../../src/services/product.services';
import { useMutation, useQueryClient } from 'react-query';
import Toast from '../../../src/helpers/Toast';
import { toast } from 'react-toastify';

const ItemProduct = ({ productData, i }: any) => {
  const {
    idProduct,
    product,
    unitPrice,
    unitCost,
    category,
    commissionPercentage,
    state,
    brand,
    imageProduct,
  } = productData;

  const COLOR_STATE = {
    active: 'success',
    inactive: 'danger',
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();
  const { mutate: deleteProduct } = useMutation(DELETE_PRODUCT, {
    onMutate: () => {
      queryClient.cancelQueries('products');
      const previousProducts = queryClient.getQueryData([
        'products',
        Object.fromEntries([...searchParams]),
      ]);

      return () =>
        queryClient.setQueryData(
          ['products', Object.fromEntries([...searchParams])],
          previousProducts
        );
    },
    onError: () => {
      toast.error('Error al eliminar el producto');
    },
  });

  const handleDesactivate = (id) => {
    Swal.fire({
      title: `Estás seguro de eliminar el producto ${product}?`,
      text: 'No puedes revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProduct(id);
        Swal.fire('Eliminado!', 'El producto ha sido eliminado', 'success');
      }
    });
  };
  return (
    <tr className='w-full py-2 bg-white border-b shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50'>
      <th
        scope='row'
        className='flex items-center gap-2 p-2 font-medium text-gray-900 capitalize dark:text-white whitespace-nowrap'
      >
        <img
          src={
            imageProduct[0]?.url
              ? imageProduct[0].url
              : '/img/products/productDefault.png'
          }
          className='object-cover w-12 h-12 rounded-full cursor-pointer'
          onClick={() => navigate(`${idProduct}`)}
        />

        <div className='flex flex-col'>
          <Link to={`${idProduct}`}>{product}
          </Link>
          <p className='text-sm font-normal text-gray-400'>{brand && brand}</p>
          <p className='text-sm font-normal text-gray-400'>{category}</p>
        </div>
      </th>
      <td className='px-6 py-2 font-bold '>{formatMoney.format(unitPrice)}</td>
      <td className='px-6 py-2'>{formatMoney.format(unitCost)}</td>
      <td className='hidden px-6 py-2 lg:table-cell'>
        {commissionPercentage}%
      </td>
      <td className='px-6 py-2'>
        <Badge type={COLOR_STATE[state.state]}>{state.state}</Badge>
      </td>
      <td>
        <div className='flex items-center gap-2 py-2'>
          <EyeIcon
            onClick={() => navigate(`${idProduct}`)}
            className='h-5 text-gray-400 transition duration-200 ease-in-out cursor-pointer hover:text-gray-600'
            data-tooltip-target='view'
          />
          <PencilAltIcon
            onClick={() => navigate(`edit-product/${idProduct}`)}
            className='h-5 text-gray-400 transition duration-200 ease-in-out cursor-pointer hover:text-blue-800'
          />
          {state.state === 'active' && (
            <TrashIcon
              onClick={() => handleDesactivate(idProduct)}
              className='h-5 text-gray-400 transition duration-200 ease-in-out cursor-pointer hover:text-red-600'
            />
          )}
          {state.state === 'inactive' && (
            <CheckCircleIcon
              onClick={() => deleteProduct(idProduct)}
              className='h-5 text-gray-400 transition duration-200 ease-in-out cursor-pointer hover:text-green-600'
            />
          )}
          <Toast />
        </div>
      </td>
      <Toast />
    </tr>
  );
};

export default ItemProduct;
