import { i18n } from "next-i18next";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

const ProductCard = ({ title, image, id }: { title: string, image: StaticImageData, id: string }) => {
    return (
        <Link href={`/${i18n?.language}/products/${id}`} className="w-fit">
            <div className="w-[181px] md:w-[282px] h-[98px] md:h-[192px] overflow-hidden flex items-center justify-center">
                <Image src={image} 
                alt="tour preview image" width={282} height={192} 
                className="hover:scale-[1.1] transition-all duration-300 object-cover h-[192px]"/>
            </div>
            <div className="px-6 py-4 border border-t-0">
                <h3 className="text-neutral-800 text-xl">{title}</h3>
                <h5 className="text-neutral-600 font-light">Curtain</h5>
            </div>
        </Link>
    )
};

export default ProductCard;