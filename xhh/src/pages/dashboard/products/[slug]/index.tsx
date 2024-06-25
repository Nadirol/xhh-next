// @ts-nocheck

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { IProduct } from "../../../../../interface/interface";
import Header from "../../../../../components/admin/Header";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { closeIcon, editIcon, imageIcon } from "../../../../../public/assets";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function ProductDetailPage() {
    const router = useRouter();
    const { slug } = router.query;    
    const [product, setProduct] = useState<IProduct>({});

    const [isLoading, setIsLoading] = useState(true)

    const { t } = useTranslation('common');
    
    useEffect(() => {
        const fetchData = async () => {
          const response = await fetch(`/api/product/${slug}`);
          const data = await response.json();
          
          setProduct(data);
          setIsLoading(false);
    
          return data
        };

        fetchData()
    
    }, [slug]);

    const [titleValue, setTitleValue] = useState(product.title_vi);
    const [categoryValue, setCategoryValue] = useState(product.category);
    const [mainImageValue, setMainImageValue] = useState<File | string>(product.image_url);
    const [sliderImageValue, setSliderImageValue] = useState(product.preview_images);

    // const editSlider = (index: number, file: File) => {
    //     setSliderImageValue((prevSlide) => {
    //         prevSlide[index] = file

    //         return prevSlide
    //     })
    // }
    
    if (isLoading) {
        return <div className=""></div>
      }
    
    if (!product) {
    return <div>Product not found</div>;
    }

    return (
        <div className="">
            <Header/>

            <div className="w-[90%] mx-auto mt-16">
                {product && (
                <form>
                    <div className="flex gap-4 flex-col">
                        <div className="flex gap-4 items-center">
                            <span>Tên sản phẩm:</span>
                            <input id="title" type="text" onChange={(e) => setTitleValue(e.target.value)} 
                            value={titleValue || product.title_vi} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                        </div>

                        <div className="flex gap-4 items-center">
                            <span>Loại hàng:</span>
                            <input id="title" type="text" onChange={(e) => setCategoryValue(e.target.value)} 
                            value={t(categoryValue) || t(product.category)} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                        </div>

                        <div className="flex gap-4 items-center">
                            <span>Hình đại diện:</span>
                            {(product.image_url) ? (
                                <div className="relative [&:hover]:before:block [&:hover>.z-20]:block before:hidden before:absolute before:inset-0 
                                before:w-full before:h-full before:z-[15] before:bg-filter-dark w-1/4">
                                    <Image src={mainImageValue ? URL.createObjectURL(mainImageValue) : product.image_url} 
                                    width={1000} height={800} alt="" className="w-full relative z-10"/>

                                    <div className="absolute z-20 top-10 right-10 hidden">
                                        <input type="file" name="postImage" id="post-image" className="hidden" 
                                        onChange={(e) => e.target.files && setMainImageValue(e.target.files[0])}/>
                                        <label htmlFor="post-image" className="w-full cursor-pointer">
                                            <Image src={editIcon} alt="" className="w-5"/>
                                        </label>
                                    </div>
                                </div>
                            ) : (
                                <div className="">
                                    <input type="file" name="postImage" id="post-image" className="hidden"/>
                                    <label htmlFor="post-image" className="w-full flex justify-between items-center border px-2 py-1">
                                        Đăng hình ảnh
                                        <Image src={imageIcon} alt="" className="w-5"/>
                                    </label>
                                </div>
                            )
                            } 
                        </div>

                        <div className="flex gap-4 items-center">
                            <span>Hình ảnh:</span>
                            <div className="flex p-4 border flex-wrap items-center">
                                {sliderImageValue 
                                    ? sliderImageValue.map((s, index) => (
                                        <div key={index} className="relative [&:hover>.absolute]:block">
                                            <Image src={product.preview_images?.includes(s) ? s : URL.createObjectURL(s)} width={240} height={240} alt="" className="w-[12rem]"/>

                                            <input type="file" id="slider-image" className=""/>
                                        </div>                                
                                    ))
                                    : product.preview_images?.map((s, index) => (
                                        <div key={index} className="relative [&:hover>.absolute]:block">
                                            <Image src={s} width={240} height={240} alt="" className="w-[12rem]"/>

                                            <input type="file" id="slider-image" className=""/>
                                        </div> 
                                    ))}

                                    <input type="file" id="slider-image" className=""/>

                            </div>
                        </div>
                    </div>
                </form>
                )}
            </div>
        </div>
    )
};

export async function getServerSideProps({ locale }: { locale: string })  {
    
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
      ]))
    }, // will be passed to the page component as props
  };
  }