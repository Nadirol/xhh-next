import { i18n, useTranslation } from "next-i18next"
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


import Header from "../../../../components/Header";
import Footer from "../../../../components/Footer";
import { IProduct } from "../../../../interface/interface";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ProductDetailsSkeleton from "../../../../components/products/ProductDetailsSkeleton";
import ComplexProductDetails from "../../../../components/products/ComplexProductDetails";
import { NextSeo } from "next-seo";
import { Lato } from 'next/font/google'
import supabase from "../../../../supabase";
import { client } from "../../../../lib/sanity";

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

async function getData() {
  const query = `*[_type == "productXHH" && slug.current == "test"][0]`;

  const data = await client.fetch(query);

  return data;
}

export default function ProductDetails({contentData} : {contentData: any}) {
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

        <ComplexProductDetails t={t} product={product} routes={routes} relevantProducts={relevantProducts} contentData={contentData}/>

        <Footer
          t={t}
        />
      </div>
    </>
  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const contentData = await getData() as {title: string, slug: any, content: any};
  
  return {
    props: {
      contentData: contentData,
      ...(await serverSideTranslations(locale, [
        'common',
    ]))
  }, // will be passed to the page component as props
};
}