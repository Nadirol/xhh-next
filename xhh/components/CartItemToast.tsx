import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { Dispatch, MutableRefObject, SetStateAction } from "react";
import Link from "next/link";
import { ICartProduct } from "../interface/interface";
import { bagIcon3, checkIcon } from "../public/assets";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const CartItemToast = ({ item, t, toastRef, toastVisible, setToastVisible, selectedSize }: 
    { item: ICartProduct | undefined, t: TFunction, toastRef: MutableRefObject<null>, cartItems: ICartProduct[], 
        toastVisible: boolean, setToastVisible: Dispatch<SetStateAction<boolean>>, selectedSize: number }) => {

        return (
            <div className={`fixed right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 ${toastVisible ? "" : "hidden"} bg-white z-[50] 
            transition-all duration-200 flex gap-6 flex-col items-start -md:items-center rounded p-8`} ref={toastRef}>
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
                    <div className="flex -md:gap-4 -md:flex-col -md:items-center gap-8">
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
            </div>
        )

}



export default CartItemToast;