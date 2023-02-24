import { FC, useEffect, useRef, useState } from 'react';
import clienteAxios from '../../../config/axios';

// Redux
import { useSelector } from 'react-redux';
import useEmployees from '../../../hooks/useEmployees';
import useProductsCategories from '../../../hooks/useProductsCategories';
import useProducts from './../../../hooks/useProducts';
import Input from '../../../shared/Input';
import Select from '.././../../shared/Select';

interface ProductDataProps {
  newProduct: any;
  setNewProduct: any;
  productSeleted: any;
  setProductSeleted: any;
}

const ProductData: FC<ProductDataProps> = ({
  newProduct,
  setNewProduct,
  productSeleted,
  setProductSeleted,
}) => {
  const [productsFiltered, setproductsFiltered] = useState([]);
  const errorsNewProduct = useSelector(({ sales }) => sales.errorsNewProduct);
  const productRef = useRef(null);
  const categoryRef = useRef(null);

  const { employeesOptions } = useEmployees();
  const { productCategoriesOptions } = useProductsCategories();
  const { products } = useProducts();

  useEffect(() => {
    (async () => {
      if (productRef.current.value) {
        const { data } = await clienteAxios(
          `/products/${productRef.current?.value}`
        );
        setProductSeleted(data);
        return;
      }
      setProductSeleted('');
      setNewProduct({
        ...newProduct,
        product: '',
      });
    })();
  }, [newProduct.category, newProduct.product]);

  useEffect(() => {
    setNewProduct({
      ...newProduct,
      product: '',
    });
    const idCategorySelected = parseInt(newProduct.category);

    const filterByCategory = (product) => {
      return product.idProductCategory === idCategorySelected;
    };

    const result = products?.results
    ?.filter(filterByCategory)
    .map((product) => {
        return {
          value: product.idProduct,
          label: product.product,
        };
      });
    setproductsFiltered(result);
  }, [newProduct.category]);

  const handleProduct = async (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className=''>
      <h3 className='mb-4 text-xl font-semibold text-gray-700'>
        Datos del producto:
      </h3>

      <div className='grid grid-cols-6 gap-6'>
        <div className='col-span-6 md:col-span-2'>
          <Select
            label='Categoría'
            name='category'
            options={productCategoriesOptions}
            onChange={handleProduct}
            onBlur={handleProduct}
            value={newProduct.category}
            ref={categoryRef}
            error={errorsNewProduct}
            autoComplete='category'
          />
        </div>
        <div className='col-span-6 md:col-span-2'>
          <Select
            label='Producto'
            name='product'
            options={productsFiltered}
            onChange={handleProduct}
            onBlur={handleProduct}
            value={newProduct.product}
            ref={productRef}
            error={errorsNewProduct}
            autoComplete='product'
            disabled={newProduct.category === ''}
            emptyOption
          />
        </div>
        <div className='col-span-6 md:col-span-2'>
          <Input
            label='Cantidad'
            name='quantity'
            type='number'
            onChange={handleProduct}
            onBlur={handleProduct}
            value={newProduct.quantity}
            error={errorsNewProduct}
            autoComplete='quantity'
          />
        </div>
        <div className='col-span-6 md:col-span-2'>
          <Input
            id='unitPrice'
            name='unitPrice'
            type='number'
            label='Precio por unidad'
            readOnly={!!productSeleted?.fixedPrice || false}
            value={newProduct.unitPrice}
            error={errorsNewProduct.unitPrice}
          />
        </div>

        <div className='col-span-6 md:col-span-2'>
          <Select
            id='employe'
            name='employe'
            label='Trabajador'
            options={employeesOptions}
            onChange={handleProduct}
            value={newProduct.employe}
            error={errorsNewProduct}
          />
        </div>
        <div className='col-span-6 md:col-span-2'>
          <Input
            id='unitDiscount'
            name='unitDiscount'
            type='number'
            label='Descuento por unidad'
            value={newProduct.unitDiscount}
            error={errorsNewProduct.unitDiscount}
          />
        </div>

        <div className='col-span-6 sm:col-span-6'>
          <label
            htmlFor='observations'
            className='block text-sm font-medium text-gray-700'
          >
            Notas
          </label>
          <textarea
            id='observations'
            name='observations'
            autoComplete='observations'
            className='block w-full px-3 py-2 mt-1 border rounded-md shadow-sm border-gray-200bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
            rows={4}
            onChange={handleProduct}
            value={newProduct.observations}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductData;
