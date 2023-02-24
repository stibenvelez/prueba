import ItemProduct from './ItemProduct';
import { Table, Thead } from '../ui/Table';
import { useSearchParams } from 'react-router-dom';
import useProducts from '../../hooks/useProducts';
import { FC, useEffect } from 'react';
interface ProductsList {
  products: [];
  loading: boolean;
  setDataProducts: (poduct: any) => void;
}

const ProductsList: FC<ProductsList> = ({ setDataProducts }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = searchParams.get('page');

  const { products, isLoadingProducts } = useProducts(
    Object.fromEntries([...searchParams])
  );

  useEffect(() => {
    setDataProducts(products);
  }, [products]);

  useEffect(() => {
    const result = parseInt(currentPage) > products.pages;
    if (result) {
      setSearchParams({
        ...Object.fromEntries([...searchParams]),
        page: '1',
      });
    }
  }, [currentPage, products.pages]);

  if (!products.results?.length && !isLoadingProducts) {
    return (
      <div className='hidden p-5 py-3 text-sm text-yellow-800 border border-yellow-200 shadow-md lg:block bg-amber-100'>
        <p>No se encontraron resultados</p>
      </div>
    );
  }

  return (
    <div className='hidden lg:block'>
      <Table>
        <Thead>
          <tr>
            <th scope='col' className='px-6 py-3'>
              Producto
            </th>
            <th scope='col' className='px-6 py-3'>
              Precio de venta
            </th>
            <th scope='col' className='px-6 py-3'>
              Costo unitario
            </th>
            <th scope='col' className='hidden px-6 py-3 lg:table-cell'>
              % de comision
            </th>
            <th scope='col' className='px-6 py-3'>
              Estado
            </th>
            <th scope='col' className='px-6 py-3'>
              Accions
            </th>
          </tr>
        </Thead>
        <tbody>
          {products.results &&
            products.results.map((productData, i) => (
              <ItemProduct
                i={i}
                productData={productData}
                key={productData.idProduct}
              />
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ProductsList;
