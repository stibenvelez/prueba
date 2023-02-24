import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { validateFormProduct } from './utilities/validateFormProduct';
import { PlusSmIcon, TrashIcon } from '@heroicons/react/outline';
import Modal from '../ui/Modal';
import FormBrand from '../brads/FormBrand';
import NcImage from '../../shared/NcImage';
import socket from '../../helpers/Socket';
import { ProductEmptyState, ErrorProduct } from '../../models';
import Input from '../../shared/Input';
import Textarea from '../../shared/Texarea';
import Select from '../../shared/Select';
import { DELETE_IMAGE_PRODUCT } from '../../../src/services/product.services';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import Toast from '../../helpers/Toast';
import useBrands from '../../../src/hooks/useBrands';
import useProductsCategories from '../../../src/hooks/useProductsCategories';
import useProduct from '../../hooks/useProduct';
import useNewProduct from '../../hooks/useNewProduct';
import useUpdateProduct from '../../hooks/useUpdateProduct';
import SpinnerButton from '../../shared/SpinnerButton';
import CheckBox from '../../shared/CheckBox';

const ESTATE_PRODUCT = {
  add: 'ADD',
  edit: 'EDIT',
  view: 'VIEW',
};

const FormNewProduct = () => {
  // Ref
  const productCategoryRef = useRef<HTMLSelectElement>(null);
  const brandRef = useRef<HTMLSelectElement>(null);

  // State
  const navigate = useNavigate();
  const { id } = useParams();
  const [newProduct, setNewProduct] = useState(ProductEmptyState);
  const [errors, setErrors] = useState<ErrorProduct>({});
  const [stateForm, setStateForm] = useState('');
  const [openModalBrand, setOpenModalBrand] = useState(false);
  const [isModified, setIsModified] = useState(false);

  //Custom hooks
  const { productsCategories } =
    useProductsCategories();
  const { brands } = useBrands();
  const { data: product } = useProduct({ id });
  const { addNewProduct, isLoadingAddProduct } = useNewProduct();
  const { updateProduct, isLoadingUpdateProduct } = useUpdateProduct();
  const { mutate: deleteImage } = useMutation(DELETE_IMAGE_PRODUCT, {});


const productsCategoriesOptions = useMemo(
  () =>
  productsCategories?.map((category) => ({
    value: category.idProductCategory,
    label: category.category,
  })) || [],
  [productsCategories]
  );

  const brandsOptions = useMemo(
    () =>
      brands
        ?.map((brand) => ({
          value: brand.brandId,
          label: brand.brand,
          productCategory: brand?.productCategory.category,
          idProductCategory: brand?.idProductCategory,
        }))
        .filter(
          (brand) =>
            brand.idProductCategory === parseInt(newProduct.idProductCategory)
        ),
    [brands, newProduct]
  );

  useEffect(() => {
    setNewProduct({
      ...newProduct,
      brandId: '',
    });
  }, [productCategoryRef]);

  useEffect(() => {
    if (id && product) {
      setStateForm(ESTATE_PRODUCT.edit);
      setNewProduct({ ...product });
      return;
    }
    setStateForm(ESTATE_PRODUCT.add);
  }, [product]);

  useEffect(() => {
    const productInitial = { ...product };
    const productEdited = { ...newProduct };
    if (JSON.stringify(productInitial) === JSON.stringify(productEdited)) {
      setIsModified(false);
      return;
    }
    setIsModified(true);
  }, [newProduct]);

  const handleChange = ({ name, value }) => {
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = await validateFormProduct(newProduct, brandsOptions);

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    if (stateForm === ESTATE_PRODUCT.edit) {
      updateProduct(newProduct, {
        onSuccess: () => {
          toast.success('Producto actualizado');
        },
        onError: (data: any) => {
          toast.error(data.response.data.message);
        },
      });
      return;
    }
    addNewProduct(newProduct, {
      onSuccess: (data) => {
        navigate(`/dashboard/products/${data.idProduct}`);
      },
      onError: (error:any) => {
        console.log(error.response.data.message);
        toast.error(error.response.data.message||'error agregando el producto');
      },
    });
    // socket.emit("newProduct", newProduct);
  };

  const handleDeleImage = () => {
    if (stateForm === ESTATE_PRODUCT.edit) {
      deleteImage(id);
    }
  };

  const onCancel = () => {
    setOpenModalBrand(false);
  };

  const handleOpenModalBrand = () => {
    setOpenModalBrand(true);
    setStateForm(ESTATE_PRODUCT.add);
  };

  const rederImg = () => {
    if (
      (stateForm === ESTATE_PRODUCT.edit || stateForm === ESTATE_PRODUCT.add) &&
      newProduct.image &&
      newProduct.image.name
    ) {
      return <NcImage src={URL.createObjectURL(newProduct?.image)} />;
    }

    if (stateForm === ESTATE_PRODUCT.edit && !newProduct.image) {
      return <NcImage />;
    }

    if (stateForm === ESTATE_PRODUCT.add) {
      return (
        <div className='overflow-hidden bg-gray-300 rounded shadow-sm outline outline-4 outline-gray-300'>
          <NcImage src={`${newProduct.image}`} />
        </div>
      );
    }
    if (newProduct?.imageProduct[0]?.url) {
      return (
        <div className='overflow-hidden bg-gray-300 rounded shadow-sm outline outline-4 outline-gray-300'>
          <NcImage src={`${newProduct.imageProduct[0].url}`} />
        </div>
      );
    }
    if (
      stateForm === ESTATE_PRODUCT.edit ||
      stateForm === ESTATE_PRODUCT.view
    ) {
      return (
        <div className='overflow-hidden bg-gray-300 rounded shadow-sm outline outline-4 outline-gray-300'>
          <NcImage
            src={`${
              newProduct?.imageProduct[0]?.url ||
              '/img/products/productDefault.png'
            }`}
          />
        </div>
      );
    }
  };

  const SectionImgProduct = () => {
    return (
      <div className='flex flex-wrap lg:w-full lg:justify-center'>
        <div className='relative w-full overflow-hidden bg-gray-300 rounded shadow-sm outline outline-4 outline-gray-300'>
          {rederImg()}
          {product?.image && (
            <button
              onClick={handleDeleImage}
              className='absolute p-1 rounded-full cursor-pointer right-2 bottom-2 bg-gray-400/50 hover:bg-red-200'
            >
              <TrashIcon className='w-6 h-6 text-white ' />
            </button>
          )}
        </div>
        <div className='w-full py-4'>
          <label className='block'>
            <span className='sr-only'>Choose File</span>
            <input
              type='file'
              className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-white hover:file:bg-slate-600 hover:file:text-white focus:outline-none focus:shadow-outline hover:file:cursor-pointer'
              aria-describedby='user_avatar_help'
              id='user_avatar'
              name='image'
              onChange={(e) =>
                handleChange({
                  name: e.target.name,
                  value: e.target.files[0],
                })
              }
            />
          </label>
        </div>
      </div>
    );
  };

  return (
    <div className='grid grid-cols-1 gap-4 lg:grid-cols-8'>
      <Modal modalOpen={openModalBrand} onCancel={() => onCancel()}>
        <FormBrand setOpen={() => onCancel()} />
      </Modal>
      <div className='lg:col-span-2'>{SectionImgProduct()}</div>
      <div className='lg:col-span-6'>
        <div className='grid grid-cols-1 gap-4 '>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='flex flex-col gap-4 p-10 bg-white rounded-md shadow'>
              <div className='flex flex-col gap-4'>
                <div className='grid items-start grid-cols-1 gap-6 lg:grid-cols-2'>
                  <Input
                    name='product'
                    label='Producto'
                    onChange={(e) =>
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    className='col-span-2'
                    placeholder='Ejemplo: Pasacinta, Parlante 10 pulgadas, polarizado completo'
                    error={errors}
                    value={newProduct.product}
                  />
                  <Select
                    label='Categoria'
                    id='idProductCategory'
                    name='idProductCategory'
                    ref={productCategoryRef}
                    onChange={(e) =>
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    value={newProduct.idProductCategory}
                    disabled={!productsCategoriesOptions?.length}
                    error={errors}
                    emptyOption
                  >
                    <option hidden value=''>
                      --selecionar --
                    </option>
                    {productsCategoriesOptions &&
                      productsCategoriesOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                  </Select>
                  <div className='grid grid-cols-[1fr,auto] w-full  items-center gap-2'>
                    <Select
                      label='Marca'
                      id='brandId'
                      name='brandId'
                      placeholder='Pionneer, Bose, Focal, Kenwood'
                      autoComplete='brand'
                      ref={brandRef}
                      onChange={(e) =>
                        handleChange({
                          name: e.target.name,
                          value: e.target.value,
                        })
                      }
                      value={newProduct.brandId}
                      disabled={!brandsOptions?.length}
                      error={errors}
                      render={
                        <button
                          type='button'
                          onClick={handleOpenModalBrand}
                          className='flex w-5 h-5 p-1 bg-gray-500 rounded shadow hover:bg-indigo-400'
                        >
                          <PlusSmIcon className='w-4 text-white' />
                        </button>
                      }
                    >
                      <option hidden value=''>
                        {!brandsOptions?.length
                          ? 'sin marcas'
                          : '--selecionar --'}
                      </option>
                      {brandsOptions &&
                        brandsOptions.map((brand) => (
                          <option key={brand.value} value={brand.value}>
                            {brand.label}
                          </option>
                        ))}
                    </Select>
                  </div>
                </div>

                <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                  <Input
                    type='number'
                    label='Precio de Venta'
                    name='unitPrice'
                    onChange={({ target }) =>
                      handleChange({
                        name: target.name,
                        value: target.value.replace(/^0+/, ''),
                      })
                    }
                    className='col-span-2'
                    value={newProduct.unitPrice}
                    error={errors}
                  />
                  <Input
                    label='Costo unitario'
                    name='unitCost'
                    onChange={(e) =>
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    className='col-span-2'
                    value={newProduct.unitCost}
                  />
                  <Input
                    label='% comisión'
                    name='commissionPercentage'
                    onChange={(e) =>
                      handleChange({
                        name: e.target.name,
                        value: e.target.value,
                      })
                    }
                    className='col-span-2'
                    value={newProduct.commissionPercentage}
                  />
                  <CheckBox
                    label='Precio fijo'
                    name='fixedPrice'
                    onChange={(e) =>
                      handleChange({
                        name: e.target.name,
                        value: e.target.checked,
                      })
                    }
                    checked={!!newProduct.fixedPrice}
                    error={errors}
                  />
                </div>

                <Textarea
                  label='Observaciones'
                  name='observations'
                  onChange={(e) =>
                    handleChange({
                      name: e.target.name,
                      value: e.target.value,
                    })
                  }
                  defaultValue={newProduct.observations}
                />
              </div>
              <div className='flex gap-2'>
                <button
                  className={`${
                    stateForm === 'EDIT' && !isModified
                      ? 'bg-gray-300'
                      : 'bg-slate-800 hover:bg-slate-700 cursor-pointer  '
                  } px-4 py-2 text-white rounded-md `}
                  type='submit'
                  disabled={stateForm === 'EDIT' && !isModified ? true : false}
                >
                  {stateForm === 'ADD' && !isLoadingAddProduct && 'agregar'}
                  {stateForm === 'EDIT' && !isLoadingUpdateProduct && 'editar'}
                  {isLoadingAddProduct && (
                    <div className='flex items-center gap-2'>
                      <SpinnerButton /> Agregando...
                    </div>
                  )}
                  {isLoadingUpdateProduct && (
                    <div className='flex items-center gap-2'>
                      <SpinnerButton /> Editando...
                    </div>
                  )}
                </button>
                <input
                  type='button'
                  onClick={() => navigate(-1)}
                  className='block px-4 py-2 text-white bg-gray-400 rounded-md cursor-pointer hover:bg-gray-300'
                  value='Cancelar'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toast />
    </div>
  );
};

export default FormNewProduct;
