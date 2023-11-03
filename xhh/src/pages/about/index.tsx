import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Fira_Sans } from 'next/font/google'
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { aboutImage1, aboutImage2, aboutImage4, logoRed } from "../../../public/assets";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Widgets from "../../../components/Widgets";

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });

export default function AboutPage() {
  const { t } = useTranslation('common');
    
  return (
    <>
      <NextSeo
        title="Về chúng tôi - Xuân Hoà Home"
        canonical="xhhome.vn/vi/about"
      />
      
      <div className={`${fira.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="pt-[4rem] flex gap-12 flex-col">
            <div className="w-full h-[400px]">
              <Image src={aboutImage4} alt="banner image" className="object-cover h-full"/>
            </div>
            <div className="flex gap-8 flex-col">
                <Image src={logoRed} alt="logo" className="w-[10rem] mx-auto"/>
                <h1 className="text-center text-red-700 font-bold text-[3rem] mb-10">{t('aboutUs').toUpperCase()}</h1>

                <div className="flex gap-16 flex-col mx-auto w-full bg-slate-100 py-20">
                  <div className="relative w-container-large mx-auto">
                    <div className="relative z-10 bg-white px-12 py-8 w-[63%] flex gap-4 flex-col text-neutral-700 text-lg">
                      <p>
                          {t('aboutParagraph1')}
                      </p>
                      <p>
                          {t('aboutParagraph2')}
                      </p>
                    </div>
                    <Image src={aboutImage1} alt="about image 1" className="absolute right-0 translate-y-1/2 bottom-1/2 z-0"/>
                  </div>

                  <div className="relative w-container-large mx-auto">
                    <Image src={aboutImage2} alt="about image 1" className="absolute left-0 translate-y-1/2 bottom-1/2 z-0 h-[110%] object-cover"/>

                    <div className="relative z-10 bg-white px-12 py-8 w-[63%] flex gap-4 flex-col text-neutral-700 text-lg ml-auto">
                      <p>
                          {t('aboutParagraph3')}
                      </p>
                      <p>
                          {t('aboutParagraph4')}
                      </p>
                    </div>
                  </div>
                  <div className="text-neutral-700 text-lg flex gap-4 flex-col w-container-large mx-auto">
                    <p>
                        {t('aboutParagraph5')}
                    </p>
                    <p>
                        {t('aboutParagraph6')}
                    </p>
                  </div>

                </div>
            </div>
            <Widgets t={t}/>

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