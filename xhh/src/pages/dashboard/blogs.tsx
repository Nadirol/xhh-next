import { useState } from "react";
import Header from "../../../components/admin/Header";
import { chairImage, newProduct1, newProduct2 } from "../../../public/assets";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import { IBanner, IPost } from "../../../interface/interface";
import { useTranslation } from "next-i18next";

async function getData() {
    const query = `*[_type == "postXHH"] | order(_createdAt desc)`;
  
    const data = await client.fetch(query);
  
    return data;
}

export default function blogPage({ data }: { data: IPost[]}) {
    const { t } = useTranslation('common');

    return (
        <div className="">
            <Header/>

            <div className="w-[90%] mx-auto flex items-center pt-4">
                <div className="w-[30%] h-screen border-r">
                    {data.map((p, index) => (
                        <div key={index} className="flex gap-4 items-center">
                            <Image src={urlFor(p.image).url()} width={80} height={80} alt="" />
                            <span>{p.title}</span>
                        </div>
                    ))}
                </div>

                <div className="w-full">

                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps() {
    const data = await getData() as IPost[];
  
    return {
      props: {
        data: data
      }, // will be passed to the page component as props
    };
  }
  