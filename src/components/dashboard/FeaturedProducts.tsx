import React from 'react';
import { useQuery } from 'react-query';
import Table from '../../shared/Table';
import { GET_FEATURED_PRODUCTS } from '../../services/dashboard.services';
import Card from '../../shared/Card';
import SkeletonTable from '../../shared/SkeletonTable';

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading } = useQuery(['featuredProducts'], GET_FEATURED_PRODUCTS);

  const products = featuredProducts?.map(
    ({ idProduct, product, totalQuantity }) => ({
      Producto: product,
      Cantidad: totalQuantity,
    })
  );

  if (isLoading) return <SkeletonTable/>



  return (
    <>
      <Table
        headers={[
          {
            header: 'Producto',
            accessor: 'product',
          },
          {
            header: 'Cantidad',
            accessor: 'quantity',
          },
        ]}
        data={products}
      />
    </>
  );
};

export default FeaturedProducts;
