import { TFunction, i18n } from "next-i18next"
import { arrowRightIcon, interiorImage1, interiorImage2, interiorImage3, interiorImage4 } from "../../public/assets";
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";
import { useEffect, useState } from "react";
import { IProduct } from "../../interface/interface";
import supabase from "../../supabase";
import Link from "next/link";

const interiorImages = [{ image: interiorImage1, title: "Holz" }, { image: interiorImage2, title: "Bonita" }, 
{ image: interiorImage3, title: "Belling" }, { image: interiorImage4, title: "Leo" }, 
{ image: interiorImage4, title: "Orion" }, { image: interiorImage1, title: "Fetra" }, 
{ image: interiorImage2, title: "Jasmine" }, { image: interiorImage3, title: "Alice" }];


const Curtains = ({ t }: { t: TFunction}) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('category', "curtain")
            .range(0, 7);
          
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setProducts(data);
          }
        }
    
        fetchData();
    }, []);

    return (
            <div className="flex gap-10 flex-col py-6 md:py-12 w-container-large mx-auto">
                <FadeInOnScroll>
                <div className="pb-8 border-b border-neutral-200 flex items-center justify-between">
                    <h2 className="text-red-700 font-bold text-2xl md:text-[4rem] w-2/3 tracking-[0.2rem]">{t("curtains")}</h2>
                    <div className="flex gap-4 flex-col items-end">
                        <Link href={`${i18n?.language}/products?category=curtain`} className="text-neutral-800 text-xl underline hover:text-red-500">
                            {t('viewMore')}
                        </Link>
                        <a href={i18n?.language === 'en' ? "/assets/XHH-Catalogue-en.pdf" : "/assets/XHH-Catalogue-vi.pdf" } target="_blank"
                        className="text-neutral-50 bg-red-500 px-8 py-3 font-semibold">
                            {t('downloadCatalogue')}
                        </a>
                    </div>
                </div>
                </FadeInOnScroll>

                <div className="grid grid-cols-2 md:grid-cols-4 w-full">
                    {products.map((i, index) => (
                        <Link href={`${i18n?.language}/products/${i.slug}`} key={index} className="relative aspect-square cursor-pointer flex items-end 
                        [&:hover>.absolute>img]:scale-[1.05] [&:hover>.relative]:py-4">
                            <div className="overflow-hidden absolute z-0 inset-0">
                                <Image src={i.image_url} alt="curtain image" width={400} height={400} className="object-cover aspect-square  
                                transition-[transform] duration-700 brightness-90"/>
                            </div>
                            <div className="w-full py-2 bg-filter-dark relative z-10 text-center items-center
                            transition-[padding] duration-700">
                                <h5 className="text-neutral-100 text-xs md:text-xl tracking-wide">{i.title_vi}</h5>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
    )
};

export default Curtains;