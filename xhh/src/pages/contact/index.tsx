import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Fira_Sans } from 'next/font/google'
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { aboutImage1, aboutImage2, aboutImage4, logoRed } from "../../../public/assets";
import Image from "next/image";
import Contact from "../../../components/main/Contact";
import ContactForm from "../../../components/contact/ContactForm";
import { NextSeo } from "next-seo";

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function ContactPage() {
  const { t } = useTranslation('common');
    
  return (
    <>
      <NextSeo
        title="Liên hệ - Xuân Hoà Home"
        canonical="xhhome.vn/vi/contact"
      />

      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="pt-[4rem] flex gap-12 flex-col">
            <Contact t={t}/>
            <ContactForm t={t}/>
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