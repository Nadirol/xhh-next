import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Fira_Sans } from 'next/font/google'
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { sliderImage1 } from "../../../public/assets";
import Image from "next/image";
import ProductList from "../../../components/products/ProductList";
import ProductFilter from "../../../components/products/ProductFilter";
import { useEffect, useState } from "react";
import supabase from "../../../supabase";
import { IProduct } from "../../../interface/interface";
import { useSearchParams } from 'next/navigation'
import { NextSeo } from "next-seo";
import CallWidget from "../../../components/buttons/CallWidget";
import ZaloWidget from "../../../components/buttons/ZaloWidget";

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function Home() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category')

  const { t } = useTranslation('common');

  const [products, setProducts] = useState<IProduct[]>([]);
  
  const [activeCategory, setActiveCategory] = useState(category)

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', activeCategory || category || "curtain");
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setProducts(data);
      }
    }

    fetchData();
  }, [activeCategory, category ]);

    
  return (
    <>
      <NextSeo
        title="Sản phẩm - Xuân Hoà Home"
        canonical="xhhome.vn/vi/products"
      />

      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main>
            <div className="w-full h-[500px] ">
                <Image src={sliderImage1} alt="banner image" className="object-cover h-full"/>
            </div>
            <div className="py-16 grid grid-cols-product-list">
                <ProductFilter t={t} setActiveCategory={setActiveCategory}/>
                <ProductList t={t} products={products}/>
            </div>
            <div className="fixed right-6 bottom-12 md:bottom-16 z-30 flex gap-8 flex-col items-center">
              <CallWidget t={t}/>
              <ZaloWidget t={t}/>
            </div>
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