import { TFunction, i18n } from "next-i18next"
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";
import { curtainBg, shelfImage, tableBg, windowBg, woodenTileBg } from "../../public/assets";
import Link from "next/link";

const Category = ({ t }: { t: TFunction}) => {

    return (
        <div className="py-6 md:py-12 flex gap-8 flex-col">
            <FadeInOnScroll>
                <h2 className="text-red-500 font-bold text-[2rem] md:text-[3rem] xl:text-[4rem] w-2/3 tracking-[0.2rem] text-center mx-auto">{t("categories")}</h2>
            </FadeInOnScroll>

            <FadeInOnScroll>
                <div className="w-container-extra-large mx-auto grid md:gap-2 xl:gap-10 grid-cols-2 xl:grid-cols-4">
                    <Link href={`/${i18n?.language}/products?category=table-and-chair`} 
                    className="flex gap-5 py-20 justify-center items-center border 
                    relative [&:hover>img]:brightness-[.5] [&:hover>img]:scale-[1.05]">
                        <Image src={tableBg} alt="category icon" className="absolute z-0 inset-0 h-full w-full object-cover brightness-75 transition-transform duration-500"/>
                        <h3 className="relative text-neutral-50 font-medium text-xs md:text-xl transition-colors">{t('tablesAndChairs')}</h3>
                    </Link>
                    <Link href={`/${i18n?.language}/products?category=shelf`} 
                    className="flex gap-5 py-20 justify-center items-center border 
                    relative  [&:hover>img]:brightness-[.5] [&:hover>img]:scale-[1.05]">
                        <Image src={shelfImage} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75 transition-transform duration-500"/>
                        <h3 className="relative text-neutral-50 font-medium text-xs md:text-xl transition-colors">{t('shelf')}</h3>
                    </Link>
                    <Link href={`/${i18n?.language}/products?category=curtain`} 
                    className="flex gap-5 py-20 justify-center items-center border flex-col
                    relative [&:hover>img]:brightness-[.5] [&:hover>img]:scale-[1.05]">
                        <Image src={curtainBg} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75 transition-transform duration-500"/>
                        <h3 className="relative text-neutral-50 font-medium text-xs md:text-xl transition-colors">{t('curtains')}</h3>
                    </Link>
                    <Link href={`/${i18n?.language}/products?category=wooden-tile`} 
                    className="flex gap-5 py-20 justify-center items-center border 
                    relative [&:hover>img]:brightness-[.5] [&:hover>img]:scale-[1.05]">
                        <Image src={woodenTileBg} alt="category icon" className="absolute z-0 inset-0 h-full object-cover brightness-75 transition-transform duration-500"/>
                        <h3 className="relative text-neutral-50 font-medium text-xs md:text-xl transition-colors">{t('woodenTiles')}</h3>
                    </Link>
                </div>
            </FadeInOnScroll>

        </div>

    )
};

export default Category;