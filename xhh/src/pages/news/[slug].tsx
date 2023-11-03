import { i18n, useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { NextSeo } from "next-seo";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { getImageDimensions } from '@sanity/asset-utils';
import { client, urlFor } from "../../../lib/sanity";
import { IPost } from "../../../interface/interface";
import Header from "../../../components/Header";
import Widgets from "../../../components/Widgets";
import Footer from "../../../components/Footer";

async function getData(slug: string) {
    const query = `*[_type == "postXHH" && slug.current == "${slug}"][0]`;

    const data = await client.fetch(query);

    return data;
}

export default function PostPage({ data }: { data: IPost }) {
  const { t } = useTranslation('common');

  const PortableTextComponent = {
    types: {
      image: ({ value }: { value: any }) => (
        <Image
          src={urlFor(value).url()}
          alt="Image"
          className="rounded-lg"
          width={800}
          height={800}
        />
      ),
    },
  };
  
  return (
    <>
      <NextSeo
        title={`${data.title} | Monte Carlo`}
        description={data.overview}
        canonical={`https://www.montecarlo.com.vn/vi/news/${data.slug}`}    
      />
      <Header
        t={t}
      />

      <main className="flex flex-col relative mt-24 pb-8">
        <div className={`w-full border-y border-neutral-300`}>
            <div className="w-container-large mx-auto flex gap-x-4 flex-wrap py-2 md:py-4 text-neutral-500">
                <Link href={`/${i18n?.language}`} 
                className={`text-neutral-500 hover:text-neutral-800 font-medium text-xs md:text-sm italic`}>
                Xuân Hoà Home
                </Link>
                &#x2f;
                <Link href={`/${i18n?.language}/news/${data.slug}`}
                className="text-neutral-800 font-medium text-xs md:text-sm">
                  {data.title}
                </Link>
            </div>
        </div>
        <div className="w-container-large mx-auto py-2 md:py-4 min-h-[60vh]">
          {data && (
            <div className="flex gap-8 flex-col">
              <div className="flex justify-end items-start">
                <h4 className="text-neutral-600 text-xs">{`${t('createdAt')}: `} 
                  <span className="text-neutral-800 font-medium">
                    {new Date(data._createdAt).toISOString().split("T")[0]}
                  </span>
                </h4>              
              </div>
              <h1 className="text-neutral-800 font-semibold text-2xl md:text-[3rem] leading-tight">
                {data.title}
              </h1>

              <div className="flex items-center justify-center">
                {data.image && (
                  <Image
                    src={urlFor(data.image).url()}
                    alt={`image`}
                    width={getImageDimensions(data.image).width}
                    height={getImageDimensions(data.image).height}
                    placeholder="blur"
                    blurDataURL={urlFor(data.image).width(24).height(24).blur(10).url()}

                    className='h-[600px] object-cover mx-auto'
                  />
                )}

              </div>

              <div className="w-[80%] mx-auto">
                <PortableText
                  value={data.content}
                  components={PortableTextComponent}
                />
              </div>


            </div>
          )}

        </div>
        <Widgets t={t}/>
      </main>
      
      <Footer 
        t={t}
      />    
    </>
  )
}

export async function getServerSideProps({ locale, params }: { locale: string, params : {slug: string} }) {
  const data = await getData(params.slug) as IPost;

  return {
    props: {
      data: data,
      ...(await serverSideTranslations(locale, [
          'common',
      ]))
    }, // will be passed to the page component as props
  };
}


