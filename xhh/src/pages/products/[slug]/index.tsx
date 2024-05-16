import { i18n, useTranslation } from "next-i18next"
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { IProduct } from "../../../../interface/interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "../../../../components/Breadcrumb";
import RelatedProducts from "../../../../components/products/RelatedProducts";
import ProductDetailsSkeleton from "../../../../components/products/ProductDetailsSkeleton";
import ComplexProductDetails from "../../../../components/products/ComplexProductDetails";
import BonusBanner from "../../../../components/products/BonusBanner";
import { NextSeo } from "next-seo";

import Widgets from "../../../../components/Widgets";

import { Lato } from 'next/font/google'
import supabase from "../../../../supabase";

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

export default function ProductDetails() {
  const { t } = useTranslation('common');

  const router = useRouter();
  const { slug } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  
  const [product, setProduct] = useState<IProduct>();
  const [relevantProducts, setRelevantProducts] = useState<IProduct[]>([]);

  async function fetchRelevantData(slug: string | string[], category: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: false })
      .eq('category', category)
      .neq('slug', slug)
      .range(0, 3);
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setRelevantProducts(data);
    }
  }

  useEffect(() => {
    setIsLoading(true)

    // Make the API request with the slug as part of the URL path
    const fetchData = async () => {
      const response = await fetch(`/api/product/${slug}`);
      const data = await response.json();
      setProduct(data);
      setIsLoading(false)

      return data
    };

    if (slug) {
      fetchData().then((data: IProduct) => fetchRelevantData(slug, data.category));
      
    }
  }, [slug]);

  console.log(relevantProducts)

  const routes = [
    { name: t('home'), path: `${i18n?.language}/` },
    { name: t('products').toUpperCase(), path: `${i18n?.language}/products` },
    { name: i18n?.language === "vi" ? product?.title_vi.toUpperCase() : product?.title_en.toUpperCase() || t('product'), path: `${i18n?.language}/products/${product?.slug}` },
  ];

  if (isLoading) {
    return <ProductDetailsSkeleton t={t}/>
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <NextSeo
        title={`${i18n?.language === "vi" ? product.title_vi : product.title_en} - Xuân Hoà Home`}
        canonical={`xhhome.vn/vi/products/${product.slug}`}
      />
      
      <div className={`${lato.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <ComplexProductDetails t={t} product={product} routes={routes} relevantProducts={relevantProducts}/>

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