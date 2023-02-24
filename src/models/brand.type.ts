export interface Brand {
    brandId: number;
    brand: string;
    category: string;
    description: string;
    idProductCategory: number;
    state: number;
    createdAt: string;
    updatedAt: string;
}

export interface Brands {
    brands: Brand[];
}

export interface BrandState {
    brands: Brands;
    loading: boolean;
    error: boolean;
}
