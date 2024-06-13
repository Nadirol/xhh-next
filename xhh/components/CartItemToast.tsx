import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ICartProduct, IProduct } from "../interface/interface";
import { bagIcon3, checkIcon } from "../public/assets";
import { Slide, SlideshowRef } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css';
import supabase from "../supabase";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const CartItemToast = ({ item, t, toastRef, toastVisible, setToastVisible, selectedSize, products }: 
    { item: ICartProduct | undefined, t: TFunction, toastRef: MutableRefObject<null>, cartItems: ICartProduct[], 
        toastVisible: boolean, setToastVisible: Dispatch<SetStateAction<boolean>>, selectedSize: number, products: IProduct[] }) => {

    const slideRef = useRef<SlideshowRef>(null);


        return (
            <div className={`fixed right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 ${toastVisible ? "" : "hidden"} bg-white z-[50] 
            transition-all duration-200 flex gap-6 flex-col items-start -md:items-center rounded p-8 w-[700px]`} ref={toastRef}>
                <div className="w-full flex items-center justify-between">
                    <div className="flex gap-2.5">
                        <Image src={checkIcon} alt="" className="w-6"/>
                        <h4 className="text-xl">{t('addedToCart')}</h4>
                    </div>

                    <button onClick={() => setToastVisible(false)}>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z" className="fill-neutral-800"/>
                        </svg>                    
                    </button>
                </div>

                {item && (
                    <div className="flex -md:gap-4 -md:flex-col -md:items-center gap-8 mx-auto">
                        <div className="w-[3rem] md:w-[10rem] aspect-square flex justify-center items-center">
                            <Image src={item.image_url} alt="wine bottle preview image" width={300} height={500} 
                            className="object-cover w-auto h-full transition-all duration-300" loading="lazy"/>
                        </div>
                        <div className="flex gap-2 flex-col">
                            <h2 className="w-[150px] md:w-[250px] -md:mx-auto text-neutral-800 font-medium text-sm 
                            md:text-base tracking-wide -md:text-center">
                                {item?.title_vi}
                            </h2>

                            <div className="w-full flex flex-col -md:items-center justify-between">
                                <h3 className="text-neutral-600 text-sm">
                                    <span className="text-neutral-700 font-semibold text-base">
                                        {item?.quantity + " x "} 
                                        {item.price && (
                                            <span className="text-red-500">
                                                {numberWithCommas(item.price * item?.quantity)}
                                            </span>
                                        )}
                                    </span><span className="underline text-red-500 font-semibold text-base">đ</span>
                                </h3>
                            </div>

                            <Link href={`/${i18n?.language}/cart`} 
                            className="px-8 py-2.5 bg-red-500 hover:bg-red-700 rounded-2xl w-fit text-neutral-100 font-semibold text-sm -md:mx-auto flex gap-2">
                                <Image src={bagIcon3} alt="" className="w-5"/>
                                {t('cart').toUpperCase()}
                            </Link>
                        </div>
                    </div>
                )}

                <div className="flex flex-col w-full">
                    <h3 className="text-xl">{t('suggestedToYou')}</h3>

                    <div className="relative">
                        {products.length > 0 && (
                            <Slide indicators={false} transitionDuration={500} duration={1000} autoplay={false} ref={slideRef} slidesToScroll={1} slidesToShow={3}>
                                {products.map((i, index) => (
                                    <Link href={`/${i18n?.language}/products/${i.slug}`} key={index} className="overflow-visible py-4 mx-4">
                                        <div className="flex gap-2.5 flex-col justify-between w-product-card snap-start min-h-[300px]
                                        [&:hover>.absolute>img]:scale-[1.05] p-[15px] pb-[20px] hover:shadow-card transition-all duration-500 -md:mx-auto">
                                            <div className="">
                                                <div className="overflow-hidden">
                                                    <Image src={i.image_url} alt="curtain image" width={400} height={300} className="object-cover
                                                    transition-[transform] duration-700 min-h-[160px] pointer-events-none"/>
                                                </div>

                                                < h4
                                                className="text-[#434343] mb-[5px] font-semibold hover:text-red-500 transition-all">
                                                {i.title_vi.toUpperCase()}
                                                </h4>
                                            </div>

                                            <div className="w-full relative z-10 items-center
                                            transition-[padding] duration-700">
                                                <div className="w-full flex justify-between items-center">
                                                    {i.price && (
                                                        <h3 className="text-xl text-red-500 font-bold">
                                                            {numberWithCommas(i.price)} đ
                                                        </h3>
                                                    )}

                                                    {i.price_set && (
                                                        <h3 className="text-xl text-red-500 font-bold">
                                                            {numberWithCommas(i.price_set[0].price)} đ
                                                        </h3>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </Slide>
                        )}
                    </div>
                </div>
            </div>
        )

}



export default CartItemToast;