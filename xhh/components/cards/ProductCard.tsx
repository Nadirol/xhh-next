import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "../../interface/interface";
import { bagIcon3 } from "../../public/assets";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const ProductCard = ({ product, t, addItemToCart }
    : { product: IProduct, t: TFunction, addItemToCart: (product: IProduct) => void }) => {

    return (
        <div className="overflow-visible py-4 mx-4 [&:hover>div>.absolute]:block">
            <div className="flex gap-2.5 flex-col justify-between w-product-card min-w-[280px] snap-start min-h-[422px]
            p-[15px] pb-[20px] hover:shadow-card transition-all duration-500 -md:mx-auto relative ">
            <div className="">
                <Link href={`/${i18n?.language}/products/${product.slug}`} className="overflow-hidden">
                    <Image src={product.image_url} alt="curtain image" width={400} height={300} className="object-cover
                    transition-[transform] duration-700 min-h-[280px] pointer-events-none"/>
                </Link>

                < Link href={`/${i18n?.language}/products/${product.slug}`}
                className="text-[#434343] mb-[5px] font-semibold hover:text-red-500 transition-all">
                    {product.title_vi.toUpperCase()}
                </Link>
            </div>

            <div className="w-full relative z-10 items-center
            transition-[padding] duration-700">
                <div className="w-full flex justify-between items-center">
                    {product.price && (
                        <h3 className="text-xl text-red-500 font-bold">
                            {numberWithCommas(product.price)} đ
                        </h3>
                    )}

                    {product.price_set && (
                        <h3 className="text-xl text-red-500 font-bold">
                            {numberWithCommas(product.price_set[0].price)} đ
                        </h3>
                    )}

                    <div className={`${(product.price || product.price_set) ? "flex flex-col items-end" : "w-full flex justify-between items-center"}`}>
                        <h5>
                            {t(product.category)}
                        </h5>
                    </div>
                </div>
            </div>

            <button onClick={() => addItemToCart(product)} className="hidden absolute z-20 top-3 right-3 p-2 bg-red-400 rounded">
                <Image src={bagIcon3} alt="" className="w-5"/>
            </button>
            </div>
        </div>
    )
};

export default ProductCard;