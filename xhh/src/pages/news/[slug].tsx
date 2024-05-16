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
import slugify from "slugify";
import { SmallIdealImage } from "../../../components/SmallSanityImage";

async function getData(slug: string) {
  const query = `*[_type == "postXHH" && slug.current == "${slug}"][0]`;

  const data = await client.fetch(query);

  return data;
}

async function getRecentData() {
const query = `*[_type == "postXHH"] | order(_createdAt desc)[0...5]`;

const data = await client.fetch(query);

return data;
}

export default function PostPage({ data, recentData }: { data: IPost, recentData: IPost[] }) {
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

const assignHeadingIds = (content: object[]) => {
  return content.map((block: any) => {
    if (['h2', 'h3', 'h4', 'h5', 'h6'].includes(block.style)) {
      const headingId = slugify(block.children[0].text);

      return {
        ...block,
        _key: block._key,
        marks: [...(block.marks || []), { _type: 'headingId', _key: headingId, headingId }],
      };
    }

    return block;
  });
};

return (
  <>
    <NextSeo
      title={`${data?.title || ""} | Xuân Hòa Home`}
      description={data?.overview}
      canonical={`https://www.xhhome.vn/news/${data?.slug?.current}`}    
    />
    <div className="overflow-hidden">
      <Header
        t={t}
      />

      <main className={`w-full flex flex-col relative bg-neutral-light`}>
        <div className={`w-container-large mx-auto`}>
          <div className="flex gap-2 flex-wrap py-2 md:py-4 text-neutral-500 font-light text-xs">
            <Link href={`/${i18n?.language}`} 
            className={`text-zinc-600 hover:text-primary-dark font-light text-xs tracking-[2px]`}>
              {t('home')}
            </Link>

            <span className="pointer-events-none">
              /
            </span>
            
            <Link href={`/${i18n?.language}/news`} 
            className={`text-zinc-600 hover:text-primary-dark font-light text-xs tracking-[2px]`}>
              {t('news').toUpperCase()}
            </Link>

            <span className="pointer-events-none">
              /
            </span> 

            <span className="text-zinc-400 font-light text-xs tracking-[2px]">
              {data.title}
            </span>
          </div>
        </div>

        <div className="w-container-large mx-auto py-2 md:py-4 min-h-[60vh] flex gap-5 -xl:flex-col items-start">
          <div className="">
            {data && (
                <div className="flex gap-4 flex-col">
                  <h4 className="text-neutral-600 text-xs">{`${t('createdAt')}: `} 
                    <span className="text-neutral-800 font-medium">
                      {new Date(data._createdAt).toISOString().split("T")[0]}
                    </span>
                  </h4>              

                  <h1 className={`text-neutral-800 font-semibold text-2xl md:text-[3rem] md:leading-tight`}>
                    {data.title}
                  </h1>

                  <div className="md:w-[80%] flex gap-4 flex-col mb-8 [&>ul]:list-disc [&>ul]:list-inside [&>ol]:list-decimal [&>ol]:list-inside
                  [&>h1]:font-semibold [&>h2]:font-semibold [&>h3]:font-semibold [&>h4]:font-semibold [&>h5]:font-semibold [&>h6]:font-semibold
                  [&>h1]:text-4xl [&>h2]:text-3xl [&>h3]:text-3xl [&>h4]:text-2xl [&>h5]:text-xl text-xl
                  [&>img]:h-3/4 [&>img]:mx-auto [&>img]:my-8 text-zinc-800 [&>p]:text-zinc-800 [&>ol]:text-zinc-800 [&>ul]:text-zinc-800">
                    <PortableText
                      value={assignHeadingIds(data.content)}
                      components={PortableTextComponent}
                    />
                  </div>
                </div>
            )}
          </div>

          <div className="flex gap-6 flex-col xl:min-w-[20rem] xl:mt-[4rem]">
            <h3 className="text-xl">
              {t('recentPosts')}
            </h3>
            {recentData && (
              <div className="flex gap-6 xl:flex-col">
                {recentData.map((p, index) => (
                  <Link key={index} href={`/news/${p.slug?.current}` || `/`} className="flex gap-2 -xl:flex-col flex-[20%]">
                    <SmallIdealImage image={p.image}/>
                    <h3 className="tracking-tight text-gray-900">
                      {p.title}
                    </h3>
                  </Link>
                ))}
              </div>
            )}
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

export async function getServerSideProps({ locale, params }: { locale: string, params : {slug: string} }) {
const data = await getData(params.slug) as IPost;

const recentData = await getRecentData() as IPost[];

return {
  props: {
    data: data,
    recentData: recentData,
    ...(await serverSideTranslations(locale, [
        'common',
    ]))
  }, // will be passed to the page component as props
};
}


