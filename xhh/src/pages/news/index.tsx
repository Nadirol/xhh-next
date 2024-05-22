
import { i18n, useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Head from 'next/head';
import Link from 'next/link';

import { useEffect, useState } from "react";

import { NextSeo } from 'next-seo';
import { client } from "../../../lib/sanity";
import { IPost } from "../../../interface/interface";
import Header from "../../../components/Header";
import { IdealImage } from "../../../components/SanityImage";
import Widgets from "../../../components/Widgets";
import Footer from "../../../components/Footer";

async function getData() {
    const query = `*[_type == "postXHH"] | order(_createdAt desc)`;
  
    const data = await client.fetch(query);
  
    return data;
}

export default function NewsPage({ data }: { data: IPost[] }) {
  const { t } = useTranslation('common');
  
  return (
    <>
    <NextSeo
      title={`${t('about')} - Xuân Hòa Home`}
    />
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    </Head>
    <div className={`flex flex-col overflow-hidden bg-neutral-light`}>
      <Header
        t={t}
      />

      <main className="flex gap-[4.5rem] md:gap-12 flex-col relative min-h-screen">
        <div className="w-container-large mx-auto grid grid-cols-2 gap-8 px-12"> 
          {data.map((post) => (
            <div key={post._id} className="snap-start">
              <article className="">
                <div className="flex gap-4">
                  <div className="flex-1 text-[#c87065] flex flex-col gap-3">
                    <div className="flex gap-2.5">
                      <span className="w-10 min-w-[40px] h-10 border border-[#c87065] flex items-center justify-center font-bold">
                        {new Date(post._createdAt).getDate()}
                      </span>

                      <div className="font-bold">
                        <span>
                          {new Date(post._createdAt).toLocaleString('default', { month: 'long' })}, {new Date(post._createdAt).getFullYear()}
                        </span>

                        <h3 className="text-neutral-700">
                          {post.title}
                        </h3>
                      </div>
                    </div>

                    <p className="max-w-none text-gray-500 line-clamp-4">
                      {post.overview}
                    </p>

                    <Link
                      href={`/news/${post.slug.current}`}
                      className="mt-auto"
                    >
                      {t('readMore')}
                    </Link>
                  </div>

                  <div className="flex-1">
                    <IdealImage image={post.image}/>
                  </div>
                </div>
              </article>
            </div>
          ))}
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