import { TFunction, i18n } from "next-i18next"
import Link from "next/link";
import { useEffect, useState } from "react";
import { IProduct } from "../../interface/interface";
import supabase from "../../supabase";
import Image from "next/image";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const Products = ({ t }: { t: TFunction}) => {
    const [newProducts, setNewProducts] = useState<IProduct[]>([]);

    const [filter, setFilter] = useState('')

    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('id', { ascending: false });
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setNewProducts(data);
          }
        }
    
        fetchData();
    }, []);

    return (
            <div className="pt-[80px] pb-[35px] w-container mx-auto">
                <h2 className="text-center text-[#444] text-[30px] font-bold pb-[22px] mb-[25px] relative
                before:absolute before:right-1/2 before:bottom-0 before:h-[1px] before:w-8 before:bg-red-500 before:translate-x-1/2">
                    {t('xhhProducts')}
                </h2>

                <div className="flex w-fit gap-[30px] mx-auto mb-[23px]">
                    <button onClick={() => setFilter('')}>
                        {t('newArrival')}
                    </button>

                    <button onClick={() => setFilter('table-and-chair')}>
                        {t('table-and-chair')}
                    </button>

                    <button onClick={() => setFilter('single-table')}>
                        {t('single-table')}
                    </button>

                    <button onClick={() => setFilter('single-chair')}>
                        {t('single-chair')}
                    </button>
                </div>

                <div className="relative w-full grid md:grid-cols-2 xl:grid-cols-4">
                    {newProducts.filter((p) => filter ? p.category === filter : p).slice(0, 4).map((i, index) => (
                        <Link href={`/${i18n?.language}/products/${i.slug}`} key={index} 
                        className="flex gap-2.5 flex-col justify-between w-product-card min-w-[300px] snap-start min-h-[422px] -md:mx-auto
                        [&:hover>.absolute>img]:scale-[1.05] p-[15px] pb-[20px] hover:shadow-card transition-all duration-500">
                        <div className="">
                            <div className="overflow-hidden">
                                <Image src={i.image_url} alt="curtain image" width={400} height={400} className="object-cover
                                transition-[transform] duration-700 min-h-[300px]"/>
                            </div>
                            <h3 className="text-[#434343] mb-[5px] font-semibold">{i.title_vi.toUpperCase()}</h3>
                        </div>

                        <div className="w-full relative z-10 items-center
                        transition-[padding] duration-700">
                            <div className="w-full flex justify-between items-center">
                                {i.price && (
                                    <h3 className="text-xl text-red-500 font-bold">
                                        {numberWithCommas(i.price)} đ
                                    </h3>
                                )}

                                {i.price_set && (
                                    <h3 className="text-xl text-red-500 font-bold">
                                        {numberWithCommas(i.price_set[0].price)} đ
                                    </h3>
                                )}

                                <div className={`${(i.price || i.price_set) ? "flex flex-col items-end" : "w-full flex justify-between items-center"}`}>
                                    <h5>
                                        {t(i.category)}
                                    </h5>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                </div>
            </div>
    )
};

export default Products;