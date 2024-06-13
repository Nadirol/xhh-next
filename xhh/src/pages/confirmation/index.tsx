import { i18n, useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { checkIcon, facebookIcon, facebookLogo, mailSmall, phoneSmall, zaloLogo } from "../../../public/assets";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Widgets from "../../../components/Widgets";
import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

export default function AboutPage() {
  const { t } = useTranslation('common');
    
  return (
    <>
      <NextSeo
        title="Xác nhận - Xuân Hoà Home"
        canonical="xhhome.vn/vi/about"
      />
      
      <div className={`${lato.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="pt-[4rem] flex gap-12 flex-col h-[80vh]">
            <div className="flex gap-4 items-center flex-col ">
                <div className="flex gap-2.5 items-center">
                    <Image src={checkIcon} alt="" className="w-6"/>
                    <h3 className="text-2xl font-semibold">{t('orderSuccessful')}</h3>
                </div>

                <div className="text-xl text-center">
                    <h3>{t('weWillContact')}</h3>
                </div>

                <div className="flex gap-4 flex-col items-center mt-8">
                  <span className="h-[1px] w-[200px] bg-neutral-500"></span>
                  <h4 className="text-center">
                    {t('needHelp')}
                  </h4>

                  <div className="flex gap-2 border px-8 py-2 rounded border-red-600 text-red-500">
                      <div className="w-6 aspect-square flex items-center justify-center">
                          <Image src={phoneSmall} alt="phone icon" />
                      </div>
                      <span>{t('contact')}:</span>   
                      <div className="flex flex-col">
                          <span className="font-semibold">0373 522 843</span>
                      </div>                          
                  </div>

                  <div className="flex gap-2 border-blue-500 border px-8 py-2 rounded text-blue-500">
                      <div className="w-6 aspect-square flex items-center justify-center">
                          <Image src={zaloLogo} alt="phone icon" />
                      </div>
                      <span>ZALO:</span>   
                      <div className="flex flex-col">
                          <a target="_blank" href="https://zalo.me/0373522843" className="font-semibold">0373 522 843</a>
                      </div>                          
                  </div>

                  <div className="flex gap-2 px-8 py-2 rounded bg-blue-500 text-white">
                      <div className="w-6 aspect-square flex items-center justify-center">
                          <Image src={facebookLogo} alt="phone icon" />
                      </div>
                      <span>FACEBOOK:</span>   
                      <div className="flex flex-col">
                          <a target="_blank" href="https://www.facebook.com/XuanHoaHome/?ref=embed_page">XUÂN HÒA HOME</a>
                      </div>                          
                  </div>

                  <div className="flex gap-2 border px-8 py-2 rounded border-red-600 text-red-500">
                      <div className="w-6 aspect-square flex items-center justify-center">
                          <Image src={mailSmall} alt="mail icon" />
                      </div>
                      <span>{t('email').toUpperCase()}:</span>   
                      <h5>sales@xhhome.vn</h5>
                  </div> 
                </div>

                <div className="flex gap-5 items-center mt-[200px]">
                    <Link href={`/${i18n?.language}/products`} className="text-xl border border-neutral-500 hover:border-red-500 hover:text-red-500 px-8 py-2 flex gap-2 items-center">
                      {t('continueShopping')}
                    </Link>
                    <Link href="/" className="text-xl border border-neutral-500 hover:border-red-500 hover:text-red-500 px-8 py-2 flex gap-2 items-center">
                      <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 17V11H12.5V17H17.5V9H20.5L10.5 0L0.5 9H3.5V17H8.5Z" fill="#000000"/>
                      </svg>                        
                      {t('backToHomepage')}
                    </Link>
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