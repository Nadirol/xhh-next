import Image from 'next/image'
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


const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <>

      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main>
          <FeaturedItems t={t}/>
          <Curtains t={t}/>
          <About t={t}/>
          <Contact t={t}/>
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