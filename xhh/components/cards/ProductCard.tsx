import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ title, image, slug, category, t }: { title: string, image: string, slug: string, category: string, t: TFunction }) => {

    return (
        <Link href={`/${i18n?.language}/products/${slug}`} className=" w-fit snap-start max-w-[181px] md:max-w-[282px]">
            <div className=" md:w-[282px] h-[98px] md:h-[192px] overflow-hidden flex items-center justify-center">
                <Image src={image} 
                alt="tour preview image" width={282} height={192} 
                className="hover:scale-[1.1] transition-all duration-300 object-cover w-full h-[192px]"/>
            </div>
            <div className="px-6 py-4 border border-t-0 -xl:min-h-[90px]">
                <h3 className="text-neutral-800 text-sm md:text-xl">{title}</h3>
                <h5 className="text-neutral-600 font-light -md:text-xs">{t(category)}</h5>
            </div>
        </Link>
    )
};

export default ProductCard;