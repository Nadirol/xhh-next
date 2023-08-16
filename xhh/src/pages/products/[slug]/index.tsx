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
import RelatedProducts from "../../../../components/products/RelatedProducts";
import ProductDetailsSkeleton from "../../../../components/products/ProductDetailsSkeleton";

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function ProductDetails() {
  const { t } = useTranslation('common');

  const router = useRouter();
  const { slug } = router.query;

  const [isLoading, setIsLoading] = useState(true);
  
  const [product, setProduct] = useState<IProduct>();

  useEffect(() => {
    setIsLoading(true)
    // Make the API request with the slug as part of the URL path
    const fetchData = async () => {
      const response = await fetch(`/api/product/${slug}`);
      const data = await response.json();
      setProduct(data);
      setIsLoading(false)
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

  if (isLoading) {
    return <ProductDetailsSkeleton t={t}/>
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="pt-[8rem] pb-[4rem] relative z-10 flex gap-12 flex-col">
          <div className="w-container-large mx-auto flex gap-12">
            <div className="">
              <Image src={product.image_url} alt="product image" width={300} height={500} className="w-full object-cover"/>
            </div>
            <div className="flex gap-4 flex-col">
              <Breadcrumb t={t} routes={routes}/>
              <div className="flex gap-1 flex-col">
                <h1 className="text-neutral-800 font-semibold text-[4rem] leading-tight">{product.title_vi}</h1>
                <h4 className="text-neutral-500 text-sm">{product.category}</h4>
              </div>

              <ul className="grid gap-x-8 gap-y-2 grid-cols-2 list-disc list-inside">
                {product.details_vi.map((d, index) => (
                  <li key={index} className="text-neutral-700 text-xl">{d}</li>
                ))}
              </ul>
              
              <h3 className="text-neutral-500">
                <Link href={`${i18n?.language}/contact`} className="text-red-600">Contact us</Link>&nbsp;if you are interested in this product
              </h3>
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