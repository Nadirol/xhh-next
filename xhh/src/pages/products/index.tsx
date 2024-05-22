import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { shopBackground } from "../../../public/assets";
import Image from "next/image";
import ProductList from "../../../components/products/ProductList";
import ProductFilter from "../../../components/products/ProductFilter";
import { useEffect, useRef, useState } from "react";
import supabase from "../../../supabase";
import { IProduct } from "../../../interface/interface";
import { useSearchParams } from 'next/navigation'
import { NextSeo } from "next-seo";

import Widgets from "../../../components/Widgets";

import { Lato } from 'next/font/google'
import Link from "next/link";

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

function onlyUnique(value:any, index: number, array: any[]) {
  return array.indexOf(value) === index;
};

const useClickDetector = (refs: React.MutableRefObject<HTMLDivElement | null>[], func: () => void) => {
  useEffect(() => {
      const handleClickOutside = (event: any) => {
          if (!refs.some(ref => ref.current?.contains(event.target))) {
              func()
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  },[refs[0]])
};

function paginate(array: IProduct[], page_size: number) {
  // human-readable page numbers usually start with 1, so we reduce 1 in the first argument
  const page_number = Math.ceil(array.length / page_size) ;
  let result = []
  for (let i = 1; i <= page_number; i++) {
    result.push(array.slice((i - 1) * page_size, i * page_size));
  };

  return result;
};

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category')
  const size = searchParams.get('size');

  const { t } = useTranslation('common');

  const [products, setProducts] = useState<IProduct[]>([]);
  const [setSizes, setSetSizes] = useState<string[]>([]);
  const [tableSizes, setTableSizes] = useState<string[]>([]);
  

  useEffect(() => {
    async function fetchSizeData() {
      let query = supabase
      .from('products')
      .select('specific_description_vi')
      .eq('category', 'table-and-chair')

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setSetSizes(data.map(d => d.specific_description_vi.size));
      }
    }

    async function fetchTableSizeData() {
      let query = supabase
      .from('products')
      .select('specific_description_vi')
      .eq('category', 'single-table')

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setTableSizes(data.map(d => d.specific_description_vi.size));
      }
    }

    async function fetchData() {
      let query = supabase
      .from('products')
      .select('*')

      if (category) { query = query.eq('category', category)}
      if (size) { query = query.contains('specific_description_vi', {size: size.replaceAll("-"," ")})}

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setProducts(data);
      }
    }

    fetchSizeData();
    fetchTableSizeData();
    fetchData();
  }, [searchParams]);

    const sortItems = (sortType: string, array: IProduct[]) => {
      if (sortType === 'priceLowToHigh') {
        array =  array.sort((a,b) => (a.price_set ? a.price_set[0].price : (a.price ? a.price : 0)) - (b.price_set ? b.price_set[0].price : (b.price ? b.price : 0)))
      } else if (sortType === 'priceHighToLow') {
        array =  array.sort((a,b) => (b.price_set ? b.price_set[0].price : (b.price ? b.price : 0)) - (a.price_set ? a.price_set[0].price : (a.price ? a.price : 0)))
      } else {
        array = array.sort((a,b) => b.id - a.id)
      }

      return array
    }

    const sortOptions = ["newest","priceLowToHigh","priceHighToLow"]

    const [sortOption, setSortOption] = useState('newest');
    const [sortOptionsVisible, setSortOptionsVisible] = useState(false);
    const optionsRef = useRef(null);
    const buttonRef = useRef(null);

    const hideOptions = () => {
      setSortOptionsVisible(false);
    }

    useClickDetector([optionsRef, buttonRef], hideOptions);   

    const [activeProductPage, setActiveProductPage] = useState(0);

    const handlePageChange = (index: number) => {
      setActiveProductPage(index)
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
     
  return (
    <>
      <NextSeo
        title="Sản phẩm - Xuân Hoà Home"
        canonical="xhhome.vn/vi/products"
      />

      <div className={`${lato.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main>
            <div className="w-full h-[300px] relative before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-filter-dark before:z-10">
                <Image src={shopBackground} alt="banner image" className="z-0 absolute translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2 object-cover h-full"/>
                <h2 className="text-white absolute z-[11] translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2 text-[45px] font-bold">
                  {t('shop').toUpperCase()}
                </h2>

                <div className="relative z-10 w-container mx-auto pb-4 h-full flex items-end">
                  <div className="flex gap-2 text-white">
                    <Link href="/" className="hover:text-red-500 transition-all">
                      {t('home').toUpperCase()}
                    </Link>
                    <span className="pointer-events-none">/</span>
                    <Link href="/" className="hover:text-red-500 transition-all">
                      {t('shop').toUpperCase()}
                    </Link>
                  </div>
                </div>
            </div>

            <div className="bg-neutral-100 pt-8 flex gap-8 flex-col">
                <ProductFilter 
                t={t} 
                productCount={products.length} 
                setSizes={setSizes.filter(onlyUnique)}
                tableSizes={tableSizes.filter(onlyUnique)}
                sortOption={sortOption}
                setSortOption={setSortOption}
                sortOptionsVisible={sortOptionsVisible}
                setSortOptionsVisible={setSortOptionsVisible}
                optionsRef={optionsRef}
                buttonRef={buttonRef}
                sortOptions={sortOptions}
                />
                
                <ProductList t={t} products={paginate(sortItems(sortOption ,products), 12)[activeProductPage]} sortItems={sortItems} sortOption={sortOption}/>
            </div>

            <div className="w-full bg-neutral-100">
              <div className="flex gap-8 mx-auto w-min">
                {paginate(products, 12) && paginate(products, 12).map((array, index) => (
                  <button key={index} onClick={() => handlePageChange(index)} 
                  className={`aspect-square ${activeProductPage === index ? 'border-neutral-800' : 'border-transparent'} border-b text-xl`}>
                    {index + 1}
                  </button>
                ))}
              </div>
            </div>

            <Widgets t={t}/>
        </main>

        <Footer
          t={t}
        />
      </div>
    </>

  )
}

export async function getStaticProps({ locale }: { locale: string}) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'common',
      ])),
      // Will be passed to the page component as props
    },    
  }
}