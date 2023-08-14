import { TFunction } from "next-i18next"
import ProductCard from "../cards/ProductCard";
import { IProduct } from "../../interface/interface";

const ProductList = ({ t, products }: { t: TFunction, products: IProduct[] }) => {

    return (
        <div className="w-container-large mx-auto ">
            <div className="grid gap-y-12 grid-cols-2 xl:grid-cols-3">
                {products.map((item, index) => (
                    <ProductCard key={index} title={item.title_vi} image={item.image_url} slug={item.slug}/>
                ))
                }
            </div>

        </div>
    )
};

export default ProductList;