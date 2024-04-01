import { TFunction, i18n } from "next-i18next"
import FadeInOnScroll from "../animated/FadeInOnScroll";
import Link from "next/link";
import { chairImage, newProduct1, newProduct2 } from "../../public/assets";
import Image from "next/image";

const Banners = ({ t }: { t: TFunction}) => {

    return (
        <div className="px-[100px] flex gap-10">
            <div className="flex-[40%] flex gap-8 flex-col justify-between">
                <div className="bg-[#eee] relative">
                    <div className="">
                        <Image src={newProduct1} alt="" />
                    </div>
                    <span className="absolute left-[30px] top-[20px] px-2.5 rounded-[5px] bg-red-500 text-white text-[13px] leading-[25px]">
                        {t('new')}
                    </span>

                    <span className="absolute right-[30px] top-[20px] leading-[25px]">
                        250.000đ
                    </span>

                    <div className="absolute left-[30px] bottom-[20px] leading-[15px]">
                        <h2 className="font-bold mb-[5px]">
                            Product Name
                        </h2>
                        <p className="text-[13px]">
                            Furniture
                        </p>
                    </div>

                    <button className="absolute right-[30px] bottom-[20px] ">
                        <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] overflow-hidden [&:hover>.absolute]:translate-x-0">
                            {t('buyNow')}
                            <div className="absolute left-0 top-0 w-full h-full bg-red-500 text-white translate-x-[-100%] transition-all duration-300">
                                {t('buyNow')}
                            </div>
                        </div>

                    </button>
                </div>

                <div className="bg-[#eee] relative">
                    <div className="">
                        <Image src={newProduct2} alt="" />
                    </div>

                    <div className="absolute right-0 bottom-1/2 translate-y-1/2 w-[45%] pr-[30px]">
                        <span className="text-xl leading-[15px] font-bold mb-[15px]">
                            New Product 2024
                        </span>

                        <p className="text-[13px] mb-[30px] leading-[20px]">
                            Lorem Ipsum is simply dummy text of the printing and types sate industry. Lorem Ipsum has been the industry.
                        </p>

                        <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] overflow-hidden [&:hover>.absolute]:translate-x-0 w-fit
                        bg-[#eee]">
                            {t('buyNow')}
                            <div className="absolute left-0 top-0 w-full h-full bg-red-500 text-white translate-x-[-110%] transition-all duration-300">
                                {t('buyNow')}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full bg-[#eee] relative">
                <div className="">
                    <Image src={chairImage} alt="" />
                </div>

                <div className="absolute bottom-1/2 translate-y-1/2 right-0 w-[45%] pr-[40px]">
                    <h2 className="text-[25px] leading-[30px] text-[#666666] mb-2.5">
                        WELCOME TO
                    </h2>
                    <h2 className="text-[48px] leading-[1.1] font-bold text-[#434343] mb-4">
                        XUÂN HÒA HOME
                    </h2>
                    <p className="text-[13px] leading-[1.2] text-[#878686] mb-6">
                    There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable
                    </p>
                    <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] overflow-hidden [&:hover>.absolute]:translate-x-0 w-fit
                    bg-[#eee]">
                        {t('shopNow')}
                        <div className="absolute left-0 top-0 w-full h-full bg-red-500 text-white translate-x-[-110%] transition-all duration-300">
                            {t('shopNow')}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};

export default Banners;