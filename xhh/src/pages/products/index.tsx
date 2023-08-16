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

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function Home() {
  const { t } = useTranslation('common');

  const [products, setProducts] = useState<IProduct[]>([]);
  
  const [activeCategory, setActiveCategory] = useState("Polyester 100%")

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('products')
        .select('*');
      
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setProducts(data);
      }
    }

    fetchData();
  }, []);

    
  return (
    <>

      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main>
            <div className="w-full h-[500px] ">
                <Image src={sliderImage1} alt="banner image" className="object-cover h-full"/>
            </div>
            <div className="py-16 grid grid-cols-product-list">
                <ProductFilter t={t}/>
                <ProductList t={t} products={products}/>
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