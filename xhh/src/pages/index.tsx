import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Fira_Sans } from 'next/font/google'
import Header from '../../components/Header'
import About from '../../components/main/About'
import Contact from '../../components/main/Contact'
import Footer from '../../components/Footer'
import Category from "../../components/main/Category"
import { NextSeo } from 'next-seo';
import Widgets from "../../components/Widgets"

import News from "../../components/main/News"
import { IPost } from "../../interface/interface"
import { client } from "../../lib/sanity"
import TableandChair from "../../components/main/TableandChair"

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

async function getData() {
  const query = `*[_type == "postXHH"]`;

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

      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main>
          <TableandChair t={t}/>
          <Category t={t}/>
          {/* <FeaturedItems t={t}/> */}

          <About t={t}/>
          <Contact t={t}/>

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
