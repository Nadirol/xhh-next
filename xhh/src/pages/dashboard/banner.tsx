import { useState } from "react";
import Header from "../../../components/admin/Header";
import { chairImage, newProduct1, newProduct2 } from "../../../public/assets";
import Image from "next/image";
import { client } from "../../../lib/sanity";
import { IBanner } from "../../../interface/interface";
import { useTranslation } from "next-i18next";

async function getBannerData() {
    const query = `*[_type == "bannerXHH"]`;
  
    const data = await client.fetch(query);
  
    return data;
}

export default function DashboardPage({ bannerData }: { bannerData: IBanner[]}) {
    const { t } = useTranslation('common');

    const [banner1, setBanner1] = useState<any>(bannerData[0]?.banner?.banner1);
    const [banner2, setBanner2] = useState<any>(bannerData[0]?.banner?.banner2);
    const [banner3, setBanner3] = useState<any>(bannerData[0]?.banner?.banner3);

    return (
        <div className="">
            <Header/>

            <div className="w-full flex items-center pt-4">
                <div className="md:px-[100px] flex gap-10 -xl:flex-col-reverse">
                    <div className="md:flex-[40%] flex gap-8 -md:flex-col xl:flex-col justify-between">
                        <div className="bg-[#eee] relative flex-1 flex justify-between items-center">
                            <div className="-md:w-1/2 w-[60%] aspect-square mx-auto p-10">
                                {
                                    (!!banner1)
                                    ? <Image width={280} height={160} src={URL.createObjectURL(banner1)} className="m-auto" alt="" />
                                    : <Image src={chairImage} alt="" />
                                }
                            </div>

                            <span className="absolute left-[30px] top-[20px] px-2.5 rounded-[5px] bg-red-500 text-white text-[13px] leading-[25px]">
                                {t('new')}
                            </span>

                            <span className="absolute right-[30px] top-[20px] leading-[25px] font-semibold text-red-500 text-lg">
                                1.280.000đ
                            </span>

                            <div className="absolute left-[30px] bottom-[20px] leading-[15px]">
                                <h2 className="font-bold mb-[5px] max-w-[10rem]">
                                    Ghế học sinh - GHS-02XH
                                </h2>
                                <p className="text-[13px]">
                                    Ghế
                                </p>
                            </div>

                            <div className="absolute right-[30px] bottom-[20px]">
                                <input type="file" name="myImage" onChange={(e) => e.target.files && setBanner1(e.target.files[0])}/>
                            </div>
                        </div>

                        <div className="bg-[#eee] relative flex-1 flex items-center">
                            <div className="-md:w-1/3 -md:py-4 w-1/2 pl-4 py-auto py-2">
                                {
                                    (!!banner2)
                                    ? <Image width={280} height={280} src={URL.createObjectURL(banner2)} alt="" />
                                    : <Image src={newProduct2} alt="" />
                                }                    
                            </div>

                            <div className="absolute right-0 bottom-1/2 translate-y-1/2 w-[45%] pr-[30px]">
                                <span className="text-xl leading-[15px] font-bold mb-[15px]">
                                    Sản phẩm mới 2024
                                </span>

                                {/* <p className="text-[13px] mb-[30px] leading-[20px] -md:hidden">
                                    Lorem Ipsum is simply dummy text of the printing and types sate industry.
                                </p> */}

                                <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] overflow-hidden [&:hover>.absolute]:translate-x-0 w-fit
                                bg-[#eee]">
                                </div>
                            </div>

                            <div className="absolute right-[30px] bottom-[20px]">
                                <input type="file" name="myImage" onChange={(e) => e.target.files && setBanner2(e.target.files[0])}/>
                            </div>
                        </div>
                    </div>

                    <div className="w-full bg-[#eee] relative flex items-center">
                        <div className="-md:w-1/2 w-1/2">
                            {
                                (!!banner3)
                                ? <Image width={240} height={240} src={URL.createObjectURL(banner3)} alt="" className="mx-auto"/>
                                : <Image src={newProduct1} alt="" />
                            }                
                        </div>

                        <div className="absolute bottom-1/2 translate-y-1/2 right-0 w-[45%] pr-[40px]">
                            <h2 className="text-sm md:text-[25px] leading-[30px] text-[#666666] mb-2.5">
                                WELCOME TO
                            </h2>
                            <h2 className="text-2xl md:text-[48px] leading-[1.1] font-bold text-[#434343] mb-4">
                                XUÂN HÒA HOME
                            </h2>
                            {/* <p className="text-[13px] leading-[1.2] text-[#878686] mb-6 -md:hidden">
                            There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don&apos;t look even slightly believable
                            </p> */}
                            <input type="file" name="myImage" onChange={(e) => e.target.files && setBanner3(e.target.files[0])}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export async function getServerSideProps() {
    const bannerData = await getBannerData() as IBanner[];

    console.log(bannerData)
  
    return {
      props: {
        bannerData: bannerData
      }, // will be passed to the page component as props
    };
  }
  