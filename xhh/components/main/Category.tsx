import { TFunction, i18n } from "next-i18next"
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";
import { curtainBg, curtainIcon, tableBg, windowBg, woodenTileBg } from "../../public/assets";
import Link from "next/link";

const Category = ({ t }: { t: TFunction}) => {

    return (
        <div className="w-container-large mx-auto pt-6 md:pt-12 flex gap-8 flex-col">
            <FadeInOnScroll>
                <div className="pb-8">
                    <h2 className="text-red-700 font-bold text-2xl md:text-[4rem] w-2/3 tracking-[0.2rem]">{t("categories")}</h2>
                </div>
            </FadeInOnScroll>

            <FadeInOnScroll>
                <div className="grid grid-cols-2 xl:grid-cols-4">
                    <Link href={`${i18n?.language}/products?category=curtain`} 
                    className="flex gap-5 py-16 justify-center items-center border 
                    relative [&:hover>h3]:text-red-500 [&:hover>img]:brightness-[.5]">
                        <Image src={curtainBg} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75"/>
                        <h3 className="relative text-neutral-50 font-medium text-xl transition-colors">{t('curtains')}</h3>
                    </Link>
                    <Link href={`${i18n?.language}/products?category=window`} 
                    className="flex gap-5 py-16 justify-center items-center border 
                    relative [&:hover>h3]:text-red-500 [&:hover>img]:brightness-[.5]">
                        <Image src={windowBg} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75"/>
                        <h3 className="relative text-neutral-50 font-medium text-xl transition-colors">{t('doorsAndWindows')}</h3>
                    </Link>
                    <Link href={`${i18n?.language}/products?category=wooden-tile`} 
                    className="flex gap-5 py-16 justify-center items-center border 
                    relative [&:hover>h3]:text-red-500 [&:hover>img]:brightness-[.5]">
                        <Image src={woodenTileBg} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75"/>
                        <h3 className="relative text-neutral-50 font-medium text-xl transition-colors">{t('woodenTiles')}</h3>
                    </Link>
                    <Link href={`${i18n?.language}/products?category=table-and-chair`} 
                    className="flex gap-5 py-16 justify-center items-center border 
                    relative [&:hover>h3]:text-red-500 [&:hover>img]:brightness-[.5]">
                        <Image src={tableBg} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75"/>
                        <h3 className="relative text-neutral-50 font-medium text-xl transition-colors">{t('tablesAndChairs')}</h3>
                    </Link>
                </div>
            </FadeInOnScroll>

        </div>

    )
};

export default Category;