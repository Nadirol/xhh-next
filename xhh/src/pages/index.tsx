import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Fira_Sans } from 'next/font/google'
import Header from '../../components/Header'
import FeaturedItems from '../../components/main/FeaturedItems'
import Curtains from '../../components/main/Curtains'
import About from '../../components/main/About'
import Contact from '../../components/main/Contact'
import Footer from '../../components/Footer'
import Category from "../../components/main/Category"
import { NextSeo } from 'next-seo';
import CallWidget from "../../components/buttons/CallWidget"
import ZaloWidget from "../../components/buttons/ZaloWidget"

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function Home() {
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
          <Category t={t}/>
          <FeaturedItems t={t}/>
          <Curtains t={t}/>
          <About t={t}/>
          <Contact t={t}/>

          <div className="fixed right-6 bottom-24 md:bottom-28 z-30 flex gap-8 flex-col items-center">
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