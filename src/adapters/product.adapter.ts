export const createNewProductAdapter = (Product) => ({
    product: Product.product,
    idProductCategory: Product.idProductCategory,
    unitPrice: Product.unitPrice,
    unitCost: Product.unitCost,
    commissionPercentage: Product.commissionPercentage,
    image: Product.image,
    observations: Product.observations,
    brandId: Product.brandId,
});
