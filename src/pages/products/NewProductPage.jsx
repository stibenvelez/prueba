import { Suspense } from "react";
import FormProduct from "../../components/products/FormProduct";
import Template from "../../components/ui/Template";
import SkeletonFormProduct from "../../components/products/skeletons/SkeletonFormProduct";

const NewProductPage = () => {
    return (
        <Template
            title={"Nuevo Producto"}
            description={"Agregue aquí un nuevo producto"}
        >
            <div>
                <Suspense fallback={<SkeletonFormProduct/>}>
                <FormProduct />
                </Suspense>
            </div>
        </Template>
    );
};

export default NewProductPage;
