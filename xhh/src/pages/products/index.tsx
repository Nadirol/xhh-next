import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { shopBackground } from "../../../public/assets";
import Image from "next/image";
import ProductList from "../../../components/products/ProductList";
import ProductFilter from "../../../components/products/ProductFilter";
import { useEffect, useState } from "react";
import supabase from "../../../supabase";
import { IProduct } from "../../../interface/interface";
import { useSearchParams } from 'next/navigation'
import { NextSeo } from "next-seo";

import Widgets from "../../../components/Widgets";

import { Lato } from 'next/font/google'
import Link from "next/link";

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category')

  const { t } = useTranslation('common');

  const [products, setProducts] = useState<IProduct[]>([]);
  

  useEffect(() => {
    async function fetchData() {
      let query = supabase
      .from('products')
      .select('*')

      if (category) { query = query.eq('category', category)}

      const { data, error } = await query;
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setProducts(data);
      }
    }

    fetchData();
  }, [category]);

    
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

            <div className="bg-neutral-100 pt-20 flex gap-8 flex-col">
                <ProductFilter t={t} productCount={products.length}/>
                <ProductList t={t} products={products}/>
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