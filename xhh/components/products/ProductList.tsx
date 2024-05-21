import { TFunction } from "next-i18next"
import ProductCard from "../cards/ProductCard";
import { IProduct } from "../../interface/interface";

const ProductList = ({ t, products, sortItems, sortOption }: { t: TFunction, products: IProduct[], sortItems: any, sortOption: any }) => {

    return (
        <div className="w-container-large mx-auto ">
            <div className="grid gap-4 md:gap-y-10 md:grid-cols-2 xl:grid-cols-3 mb-4">
                {sortItems(sortOption, products).map((item: IProduct, index: number) => (
                    <ProductCard key={index} category={item.category} title={item.title_vi} image={item.image_url} slug={item.slug} price={item.price} price_set={item.price_set} t={t}/>
                ))
                }
            </div>

        </div>
    )
};

export default ProductList;