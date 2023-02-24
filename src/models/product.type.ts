export type ProductStateType = {
  products: any;
  product: Product;
  error: boolean;
  loading: boolean;
  loadingProductCategory: boolean;
  filters: {
    category: string;
  };
  productsCategories: string[];
};

export type Product = {
  idProduct?: number;
  product: string;
  brandId: string;
  idProductCategory: string;
  commissionPercentage: number;
  unitCost: number;
  unitPrice: number;
  observations?: string;
  description?: string;
  image: any ;
  imageProduct: ImageProduct[];
  fixedPrice: boolean;
};

export interface Products {
  product: Product[];
}

interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

declare let File: {
  prototype: File;
  new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
};

type Image = {
  name?: string;
  url?: string;
};

export interface ImageProduct {
  id: string;
  asset_id: string;
  format: string;
  idProduct: number;
  url: string;
  folder: string;
  original_filename: string;
  public_id: string;
  createdAt: string;
}

export const ProductEmptyState: Product = {
  product: '',
  brandId: '',
  idProductCategory: '',
  commissionPercentage: 0,
  unitCost: 0,
  unitPrice: 0,
  observations: '',
  image: null,
  description: '',
  imageProduct: [],
  fixedPrice: true,
};

export interface ErrorProduct {
  product?: string;
  brandId?: string;
  idProductCategory?: string;
  commissionPercentage?: string;
  unitPrice?: string;
  unitCost?: string;
}
