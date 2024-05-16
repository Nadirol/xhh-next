import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Lato } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { NextSeo } from 'next-seo';
import Widgets from "../../components/Widgets"

import News from "../../components/main/News"
import { IPost } from "../../interface/interface"
import { client } from "../../lib/sanity"

import Banners from "../../components/main/Banners"
import FeaturedItems from "../../components/main/FeaturedItems"
import Slider from "../../components/main/Slider"
import Products from "../../components/main/Products"

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

async function getData() {
  const query = `*[_type == "postXHH"] | order(_createdAt desc) { _id,title,image,_createdAt,overview,slug }[0...2]`;

  const data = await client.fetch(query);

  return data;
}

export default function Home({ data }: { data: IPost[]}) {
  const { t } = useTranslation('common');

  return (
    <>
      <NextSeo
        title="Xuân Hoà Home - Nội thất Xuân Hoà"
        description="Xuân Hòa Home là một công ty chuyên cung cấp nội thất, hàng gia dụng dành cho giới trẻ với thiết kế thông minh, hiện đại, trẻ trung và tiện lợi."
        canonical="xhhome.vn/vi"
      />

      <div className={`${lato.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="-md:mt-8">
          <Banners t={t}/>
          <FeaturedItems t={t}/>
          <Slider/>
          <Products t={t}/>
          <News t={t} data={data}/>

          <Widgets t={t}/>
        </main>

        <Footer
          t={t}
        />
      </div>
    </>

  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const data = await getData() as IPost[];

  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale, [
          'common',
      ]))
    }, // will be passed to the page component as props
  };
}
