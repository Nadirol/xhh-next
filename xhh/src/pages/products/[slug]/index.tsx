import { i18n, useTranslation } from "next-i18next"
import { GetServerSideProps } from 'next';
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Fira_Sans } from 'next/font/google'

import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { IProduct } from "../../../../interface/interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../../../components/Breadcrumb";
import supabase from "../../../../supabase";
import ProductCard from "../../../../components/cards/ProductCard";
import { arrowRightIcon } from "../../../../public/assets";
import RelatedProducts from "../../../../components/products/RelatedProducts";

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function ProductDetails() {
  const { t } = useTranslation('common');

  const router = useRouter();
  const { slug } = router.query;
  
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    // Make the API request with the slug as part of the URL path
    const fetchData = async () => {
      const response = await fetch(`/api/product/${slug}`);
      const data = await response.json();
      setProduct(data)
    };

    if (slug) {
      fetchData();
    }
  }, [slug]);

  const routes = [
    { name: 'Home', path: `${i18n?.language}/` },
    { name: 'Products', path: `${i18n?.language}/products` },
    { name: 'Slug', path: `${i18n?.language}/products/${slug}` },
  ];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>

      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="pt-[8rem] pb-[4rem] relative z-10">
          <div className="w-container-large mx-auto flex gap-12">
            <div className="">
              <Image src={product.image_url} alt="product image" width={300} height={500} className="w-full object-cover"/>
            </div>
            <div className="">
              <Breadcrumb t={t} routes={routes}/>
              <h1 className="text-[4rem]">{product.title_vi}</h1>
              <h4>{product.category}</h4>
              <div className="grid gap-x-8 gap-y-2 grid-cols-2">
                {product.details_vi.map((d, index) => (
                  <h3 key={index}>{d}</h3>
                ))}
              </div>
            </div>
          </div>
          <RelatedProducts t={t} product={product}/>
        </main>

        <Footer
          t={t}
        />
      </div>
    </>

  )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {


    const paths: any = [];

    return {
        paths: paths, //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
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
};