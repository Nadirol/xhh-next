import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { starIcon } from "../../public/assets";

const ProductCard = ({ title, image, slug, category, t }: { title: string, image: string, slug: string, category: string, t: TFunction }) => {

    return (
        <Link href={`/${i18n?.language}/products/${slug}`} 
            className="flex gap-2.5 flex-col justify-between w-product-card min-w-[300px] snap-start min-h-[422px] -md:mx-auto
            [&:hover>.absolute>img]:scale-[1.05] p-[15px] pb-[20px] hover:shadow-card transition-all duration-500 bg-white">
            <div className="">
                <div className="overflow-hidden">
                    <Image src={image} alt="curtain image" width={400} height={400} className="object-cover
                    transition-[transform] duration-700 min-h-[300px]"/>
                </div>
                <h3 className="text-[#434343] mb-[5px] font-semibold">{title.toUpperCase()}</h3>
            </div>

            <div className="w-full relative z-10 items-center
            transition-[padding] duration-700">
                <div className="w-full flex justify-between items-center">
                    <h5>
                    {t(category)}
                    </h5>

                    <div className="flex gap-[1px]">
                    <Image src={starIcon} alt="" />
                    <Image src={starIcon} alt="" />
                    <Image src={starIcon} alt="" />
                    <Image src={starIcon} alt="" />
                    <Image src={starIcon} alt="" /> 
                    </div>
                </div>
            </div>
        </Link>
    )
};

export default ProductCard;