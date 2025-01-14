import { TFunction } from "next-i18next"
import ProductCard from "../cards/ProductCard";
import { IProduct } from "../../interface/interface";

const ProductList = ({ t, products }: { t: TFunction, products: IProduct[] }) => {

    return (
        <div className="w-container-large mx-auto ">
            <div className="grid gap-4 md:gap-y-10 grid-cols-2 xl:grid-cols-3">
                {products.map((item, index) => (
                    <ProductCard key={index} title={item.title_vi} image={item.image_url} slug={item.slug} category={item.category} t={t}/>
                ))
                }
            </div>

        </div>
    )
};

export default ProductList;