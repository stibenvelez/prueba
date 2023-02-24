export const createBrandAdapter = ({
  brand,
  brandCategory,
  description,
}: any) => ({
  brand,
  idProductCategory: brandCategory,
  description,
});

export const getBrandAdapter = ({
    brandId,
  brand,
  description,
  idProductCategory,
  ...rest
}: any) => {
    return {
    brandId,
      brand,
      brandCategory: idProductCategory,
      description,
    };};

export const updateBrandAdapter = ({
  brand,
  brandCategory,
  description,
  brandId,
}: any) => ({
  brand,
  idProductCategory: brandCategory,
  description,
  brandId,
});
