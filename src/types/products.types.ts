type ProductStateType = {
    products: any;
    product: ProductType;
    error: boolean;
    loading: boolean;
    loadingProductCategory: boolean;
    filters: {
        category: string;
    };
    productsCategories: string[];
};

type ProductType = {
    idProduct?: number;
    product: string;
    brandId: string;
    idProductCategory: string;
    commissionPercentage: number;
    unitCost: number;
    unitPrice: number;
    observations?: string;
    description?: string;
};
type UserStateType = {
    users: any;
    user: UserType;
    loading: boolean;
    error: boolean;
};

type UserType = {
    idUser: number;
    user: string;
    email: string;
    firstName: string;
    lastName: string;
    roleId: number;
    confirm: number;
    role: string;
};

type EmployeesStateType = {
    employees: any;
    loadingEmployee: boolean;
    loading: boolean;
    employee: EmployeeType;
};

type EmployeeType = {
    idEmploye: number;
    name: string;
    position: string | null;
    createAt: string;
    updateAt: string;
    observations: string | null;
    idState: number;
    document: string | null;
};

type AuthStateType = {
    auth: boolean;
    user: UserType;
    loading: boolean;
    loadingLogin: boolean;
};

export {
    ProductStateType,
    ProductType,
    UserStateType,
    UserType,
    EmployeesStateType,
    EmployeeType,
    AuthStateType
};
