import { TFunction, i18n } from "next-i18next"
import Link from "next/link";

const ProductFilter = ({ t, productCount }: { t: TFunction, productCount: number }) => {

    return (
        <div className="w-container-large mx-auto flex justify-between items-center bg-white px-[30px] h-[50px]">
            <div className="flex gap-5 text-[#999] text-base ">
                <Link href={`/${i18n?.language}/products?category=table-and-chair`} className="">
                    {t('tablesAndChairs')}
                </Link>

                <Link href={`/${i18n?.language}/products?category=shelf`} className="">
                    {t('shelf')}
                </Link>
            </div>

            <div className="">
                <h4>
                    {`${t('showing')} ${productCount} ${t('results')}`}
                </h4>
            </div>
        </div>
    )
};

export default ProductFilter;