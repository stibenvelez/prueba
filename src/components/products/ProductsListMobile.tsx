import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { GET_PRODUCTS } from "../../services/product.services";
import SkeletonTable from "../../shared/SkeletonTable";
import ItemProductMobile from "./ItemProductMobile";


const ProductsListMobile = () => {
  const [searchParams, setSearchParams] = useSearchParams();
      const { data: products, isLoading } = useQuery(
        ['products', Object.fromEntries([...searchParams])],
        GET_PRODUCTS,
        {
          suspense: true,
        }
      );

    // if (loading)
    //     return (
    //         <div className="justify-center block w-full lg:hidden">
    //             <SkeletonTable columns={2} rows={4} paddingYRows={8} />
    //         </div>
    //     );

    if (products.results.length === 0 && !isLoading) {
      return (
        <div className='block p-5 py-3 text-sm text-yellow-800 border border-yellow-200 shadow-md lg:hidden bg-amber-100'>
          <p>No se encontraron resultados</p>
        </div>
      );
    }

    return (
      <div className='block lg:hidden'>
        <div className='overflow-auto rounded-lg shadow'>
          <div className='bg-gray-800 text-gray-50'>
            <div className='px-6 py-3'>Productos</div>
          </div>
          <div>
            {products.results.map((productData, index) => (
              <ItemProductMobile
                productData={productData}
                key={productData.idProduct}
              />
            ))}
          </div>
        </div>
      </div>
    );
};

export default ProductsListMobile;
