import React from "react";
import { Link, useParams } from "react-router-dom";
import { formatDateTime } from "../../helpers/FormatDate";
import NcImage from "../../shared/NcImage";
import Input from "../../shared/Input";
import Textarea from "../../shared/Texarea";
import { GET_PRODUCT } from "../../../src/services/product.services";
import { useQuery } from "react-query";

const ProductDetail = () => {
    const {id} = useParams();
    const { data: product } = useQuery(['product', id], GET_PRODUCT, {
        suspense: true,
      enabled: !!id
    });

    if (!product) {
      return (
        <div className='flex flex-col items-center justify-center h-full'>
          <h1 className='text-4xl font-semibold'>Producto no encontrado</h1>
        </div>
      );
    }
    return (
      <div className='grid grid-cols-1 gap-4 lg:grid-cols-8'>
        <div className='lg:col-span-2'>
          <div className='overflow-hidden bg-gray-300 rounded shadow-sm aspect-w-1 aspect-h-1 outline outline-4 outline-gray-300'>
            <NcImage
              src={
                product?.imageProduct[0]?.url ||
                '/image/products/productDefault.png'
              }
            />
          </div>
        </div>
        <div className='lg:col-span-6'>
          <div className='grid grid-cols-1 gap-4 '>
            <div className='flex flex-col gap-4 p-4 bg-white shadow round ed-md md:p-10'>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <Input
                    label='Producto'
                    id='product'
                    name='product'
                    type='text'
                    defaultValue={product?.product}
                    readOnly
                  />
                  <Input
                    label='Categoía'
                    id='idProductCategory'
                    name='idProductCategory'
                    defaultValue={product?.productCategory.category}
                    readOnly
                  />
                  {product?.brand && (
                    <Input
                      label='Marca'
                      id='brand'
                      name='brand'
                      defaultValue={product?.brand.brand}
                      readOnly
                    />
                  )}
                </div>

                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <Input
                    label='Precio de venta'
                    id='unitPrice'
                    name='unitPrice'
                    type='number'
                    defaultValue={product?.unitPrice}
                    readOnly
                  />
                  <Input
                    label='Costo unitario'
                    id='unitCost'
                    name='unitCost'
                    type='number'
                    defaultValue={product?.unitCost}
                    readOnly
                  />
                  <Input
                    label='% comisión'
                    id='commissionPercentage'
                    name='commissionPercentage'
                    type='number'
                    defaultValue={product?.commissionPercentage}
                    readOnly
                  />
                </div>
                <div>
                  <Textarea
                    label='Descripción'
                    id='description'
                    name='description'
                    defaultValue={product?.observations}
                    readOnly
                  />
                </div>
                <div className='grid grid-cols-1 gap-6 text-xs text-gray-500 lg:grid-cols-2'>
                  <div className=''>
                    <label
                      htmlFor='createdAt'
                      className='block text-sm font-medium '
                    >
                      Creado el:
                    </label>

                    {formatDateTime(product?.createAt)}
                  </div>
                  <div className=''>
                    <label
                      htmlFor='createdAt'
                      className='block text-sm font-medium '
                    >
                      Ultima modificación:
                    </label>

                    {formatDateTime(product?.updateAt)}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex gap-2 py-3'>
              <Link
                to={`/dashboard/products/edit-product/${product?.idProduct}`}
                className='px-3 py-2 text-white transition duration-150 ease-in-out rounded-md bg-slate-800 hover:bg-slate-700'
              >
                Editar producto
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ProductDetail;
