import { TFunction, i18n } from "next-i18next"
import Link from "next/link";

const ProductFilter = ({ t }: { t: TFunction }) => {

    return (
        <div className="w-container-large mx-auto flex flex-col">
            <div className="flex gap-2 items-center md:px-4 pb-2 border-b">
                <h3>{t('products')}</h3>
            </div>
            <div className="flex flex-col text-neutral-800 text-xl ">
                <Link href={`/${i18n?.language}/products?category=table-and-chair`} className="py-2 relative before:absolute before:z-0 text-start
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 md:px-4">
                        {t('tablesAndChairs')}
                    </span>
                </Link>
                <Link href={`/${i18n?.language}/products?category=shelf`} className="py-2 relative before:absolute before:z-0 text-start
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 md:px-4">
                        {t('shelf')}
                    </span>
                </Link>
                <Link href={`/${i18n?.language}/products?category=wooden-tile`} className="py-2 relative before:absolute before:z-0 
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 md:px-4">
                        {t('woodenTiles')}
                    </span>
                </Link>
            </div>
        </div>
    )
};

export default ProductFilter;