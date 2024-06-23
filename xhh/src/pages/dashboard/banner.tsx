// @ts-nocheck

import { FormEvent, useEffect, useRef, useState } from "react";
import Header from "../../../components/admin/Header";
import { chairImage, closeIcon, editIcon, imageIcon, newProduct1, newProduct2, plusIcon } from "../../../public/assets";
import Image from "next/image";
import { client, urlFor } from "../../../lib/sanity";
import { IBanner } from "../../../interface/interface";
import { useTranslation } from "next-i18next";
import Link from "next/link";

async function getBannerData() {
    const query = `*[_type == "bannerXHH"]`;
  
    const data = await client.fetch(query);
  
    return data;
};

const useClickDetector = (refs: React.MutableRefObject<HTMLDivElement | null>[], func: () => void) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (!refs.some(ref => ref.current?.contains(event.target))) {
                func()
            }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    },[refs[0]])
  };

export default function DashboardPage({ bannerData }: { bannerData: IBanner[]}) {
    const { t } = useTranslation('common');

    const [banner1, setBanner1] = useState<any>(bannerData[0]?.banner1.image);
    const [banner2, setBanner2] = useState<any>(bannerData[0]?.banner2.image);
    const [banner3, setBanner3] = useState<any>(bannerData[0]?.banner3.image);

    const [b1ImageValue, setB1ImageValue] = useState<any>(null)
    const [b1TitleValue, setB1TitleValue] = useState<any>(bannerData[0]?.banner1.title);
    const [b1CategoryValue, setB1CategoryValue] = useState<any>(bannerData[0]?.banner1.category);
    const [b1PriceValue, setB1PriceValue] = useState<any>(bannerData[0]?.banner1.price);
    const [b1LinkValue, setB1LinkValue] = useState<any>(bannerData[0]?.banner1.link);

    const handleSubmitB1 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const asset = await client.assets.upload('image', b1ImageValue);


        client.patch('a549fcb5-d44c-446e-9f38-0ed4ee1b2f14')
        .set({
            banner1: {
                image: {
                    _type: 'image',
                    asset: {
                      _type: 'reference',
                      _ref: asset._id // Attach the uploaded asset to the document
                    }
                },
                link: b1LinkValue,
                title: b1TitleValue,
                category: b1CategoryValue,
                price: b1PriceValue
            }
        })
        .commit() // Perform the patch and return a promise
        .then(() => {
            console.log(bannerData[0])
        })
        .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        })
    };

    const resetB1Form = () => {
        setB1ImageValue(null);
        setB1TitleValue(bannerData[0]?.banner1.title);
        setB1CategoryValue(bannerData[0]?.banner1.category);
        setB1PriceValue(bannerData[0]?.banner1.price);
        setB1LinkValue(bannerData[0]?.banner1.link)
    }

    const [b2ImageValue, setB2ImageValue] = useState<any>(null)
    const [b2TitleValue, setB2TitleValue] = useState<any>(bannerData[0]?.banner2.title);
    const [b2LinkValue, setB2LinkValue] = useState<any>(bannerData[0]?.banner2.link);

    const handleSubmitB2 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const asset = await client.assets.upload('image', b2ImageValue);

        client.patch('a549fcb5-d44c-446e-9f38-0ed4ee1b2f14')
        .set({
            banner2: {
                image: {
                    _type: 'image',
                    asset: {
                      _type: 'reference',
                      _ref: asset._id // Attach the uploaded asset to the document
                    }
                },
                link: b2LinkValue,
                title: b2TitleValue
            }
        })
        .commit() // Perform the patch and return a promise
        .then(() => {
            console.log(bannerData[0])
        })
        .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        })
    };

    const resetB2Form = () => {
        setB2ImageValue(null);
        setB2TitleValue(bannerData[0]?.banner2.title);
        setB2LinkValue(bannerData[0]?.banner2.link)
    }

    const [b3ImageValue, setB3ImageValue] = useState<any>(null)
    const [b3Text1Value, setB3Text1Value] = useState<any>(bannerData[0]?.banner3.text1);
    const [b3Text2Value, setB3Text2Value] = useState<any>(bannerData[0]?.banner3.text2);
    const [b3LinkValue, setB3LinkValue] = useState<any>(bannerData[0]?.banner1.link);

    const handleSubmitB3 = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const asset = await client.assets.upload('image', b3ImageValue);

        client.patch('a549fcb5-d44c-446e-9f38-0ed4ee1b2f14')
        .set({
            banner3: {
                image: {
                    _type: 'image',
                    asset: {
                      _type: 'reference',
                      _ref: asset._id // Attach the uploaded asset to the document
                    }
                },
                link: b3LinkValue,
                text1: b3Text1Value,
                text2: b3Text2Value
            }
        })
        .commit() // Perform the patch and return a promise
        .then(() => {
            console.log(bannerData[0])
        })
        .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        })
    };

    const resetB3Form = () => {
        setB2ImageValue(null);
        setB2TitleValue(bannerData[0]?.banner2.title);
        setB2LinkValue(bannerData[0]?.banner2.link)
    };

    const [selectedSlide, setSelectedSlide] = useState<number | null>(null);
    const linkEditRef = useRef(null);

    const hideLinkEdit = () => {
        setSelectedSlide(null);
    };

    useClickDetector([linkEditRef], hideLinkEdit);

    const [sliders, setSliders] = useState(bannerData[0].slider);

    const handleSubmitSlider = () => {
        client
        .patch('a549fcb5-d44c-446e-9f38-0ed4ee1b2f14')
        .set({
            slider: sliders
        })
        .commit() // Perform the patch and return a promise
        .then(() => {
            console.log(bannerData[0])
        })
        .catch((err) => {
            console.error('Oh no, the update failed: ', err.message)
        })
    };

    const resetSlider = () => {
        setSliders(bannerData[0].slider);
    };

    const removeSlide = (index: number) => {
        const updatedSlider = [...sliders];

        updatedSlider.splice(index, 1);

        setSliders(updatedSlider)
    };

    const [linkValue, setLinkValue] = useState('');

    
    const handleSliderLinkChange = (e: any) => {
        setLinkValue(e.target.value)
    }

    const handleSliderLinkUpdate = (index: number) => {
        const updatedSlider = [...sliders];

        updatedSlider[index].link === linkValue;

        setSliders(updatedSlider);

        setSelectedSlide(null)
    };

    const [newSlideVisible, setNewSlideVisible] = useState(false);

    const [newLinkValue, setNewLinkValue] = useState('');

    const handleNewLinkChange = (e: any) => {
        setNewLinkValue(e.target.value)
    };

    const [newSlideImageValue, setNewSlideImageValue] = useState<any>(null);

    const resetNewSlide = () => {
        setNewSlideImageValue(null);
        setNewLinkValue('')
    };

    const addNewSlide = async () => {
        const asset = await client.assets.upload('image', newSlideImageValue);

        const newSlide = {
            image: newSlideImageValue,
            link: newLinkValue
        };

        const existingDocument = await client.getDocument('a549fcb5-d44c-446e-9f38-0ed4ee1b2f14');

        console.log(existingDocument)

        const updatedDocument = {
            ...existingDocument,
            slider: [
                ...(existingDocument.slider || []),
              {
                image: {
                  _type: 'image',
                  asset: {
                    _type: 'reference',
                    _ref: asset._id // Attach the uploaded asset to the document
                  }
                },
                link: newLinkValue
              }
            ]
          };

        const updatedSlider = [...sliders];

        const response = await client.patch('a549fcb5-d44c-446e-9f38-0ed4ee1b2f14')
        .set(updatedDocument).commit();

        console.log('Document updated:', response);

        updatedSlider.unshift(newSlide);

        setSliders(updatedSlider);

        hideNewSlide();

        resetNewSlide();
    };

    const newSlideRef = useRef(null);

    const hideNewSlide = () => {
        setNewSlideVisible(false);
    };

    useClickDetector([newSlideRef], hideNewSlide);


    return (
        <div className="">
            <Header/>

            <div className="w-full flex items-center pt-4">
                {/* <div className="md:px-[100px] flex gap-10 -xl:flex-col-reverse">
                    <div className="md:flex-[40%] flex gap-8 -md:flex-col xl:flex-col justify-between">
                        <div className="bg-[#eee] relative flex-1 flex justify-between items-center">
                            <div className="-md:w-1/2 w-[60%] aspect-square mx-auto p-10">
                                {
                                    (!!banner1)
                                    ? <Image width={280} height={160} src={URL.createObjectURL(banner1.image)} className="m-auto" alt="" />
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
                            <input type="file" name="myImage" onChange={(e) => e.target.files && setBanner3(e.target.files[0])}/>
                        </div>
                    </div>
                </div> */}

                <div className="w-[70%] mx-auto flex gap-20 flex-col">
                    <div className="flex justify-between w-full pb-12 border-b">
                        <form className="flex gap-4 flex-col" onSubmit={(e) => handleSubmitB1(e)}>
                            <h2 className="font-bold text-2xl">Banner 1</h2>

                            <div className="flex gap-2 text-semibold text-xl items-center">
                                <input id="b1Image" type="file" name="myImage" onChange={(e) => e.target.files && setB1ImageValue(e.target.files[0])} className="hidden"/>
                                <span>Hình ảnh:</span>

                                <label htmlFor="b1Image" className="">
                                    <div className="bg-neutral-200 p-4 rounded cursor-pointer w-fit">
                                        <Image width={32} height={32} src={b1ImageValue ? URL.createObjectURL(b1ImageValue) : imageIcon} alt="" className="w-8"/>
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Tên sản phẩm:</span>
                                <input id="b1Title" type="text" onChange={(e) => setB1TitleValue(e.target.value)} 
                                value={b1TitleValue} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Phân loại:</span>
                                <input id="b1Category" type="text" onChange={(e) => setB1CategoryValue(e.target.value)} 
                                value={b1CategoryValue} className="px-4 py-2 border border-neutral-400  w-[10rem]"/>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Giá:</span>
                                <input id="b1Price" type="text" onChange={(e) => setB1PriceValue(e.target.value)} 
                                value={b1PriceValue} className="px-4 py-2 border border-neutral-400 w-[10rem]"/>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Link:</span>
                                <input id="b1Link" type="text" onChange={(e) => setB1LinkValue(e.target.value)} 
                                value={b1LinkValue} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                            </div>

                            <div className="flex gap-4">
                                <div className="cursor-pointer px-4 py-2 rounded bg-neutral-300 hover:bg-gray-400" onClick={resetB1Form}>
                                    Đặt lại
                                </div>

                                <button type="submit" className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white">Lưu</button>
                            </div>
                        </form>

                        <div className="bg-[#eee] relative flex justify-between items-center w-1/2">
                            <div className="-md:w-1/2 w-[60%] aspect-square mx-auto p-10">
                                {
                                    (!!banner1)
                                    ? <Image width={280} height={160} src={b1ImageValue ? URL.createObjectURL(b1ImageValue) : urlFor(banner1).url()} className="m-auto" alt="" />
                                    : <Image src={chairImage} alt="" />
                                }

                            </div>

                            <span className="absolute left-[30px] top-[20px] px-2.5 rounded-[5px] bg-red-500 text-white text-[13px] leading-[25px]">
                                {t('new')}
                            </span>

                            <span className="absolute right-[30px] top-[20px] leading-[25px] font-semibold text-red-500 text-lg">
                                {b1PriceValue}
                            </span>

                            <div className="absolute left-[30px] bottom-[20px] leading-[15px]">
                                <h2 className="font-bold mb-[5px] max-w-[10rem]">
                                    {b1TitleValue}
                                </h2>
                                <p className="text-[13px]">
                                    {b1CategoryValue}
                                </p>
                            </div>
                            <div className="absolute right-[30px] bottom-[20px]">
                                
                            <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] 
                                overflow-hidden [&:hover>.absolute]:translate-x-0 overflow-hidden">
                                    {t('buyNow')}
                                    <Link href={b1LinkValue} 
                                    className="absolute left-0 top-0 w-full h-full bg-red-500 text-white translate-x-[-100%] transition-all duration-300 text-center">
                                        {t('buyNow')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between w-full pb-12 border-b">
                        <form className="flex gap-4 flex-col" onSubmit={(e) => handleSubmitB2(e)}>
                            <h2 className="font-bold text-2xl">Banner 2</h2>

                            <div className="flex gap-2 text-semibold text-xl items-center">
                                <input id="b2Image" type="file" name="myImage" onChange={(e) => e.target.files && setB2ImageValue(e.target.files[0])} className="hidden"/>
                                <span>Hình ảnh:</span>

                                <label htmlFor="b2Image" className="">
                                    <div className="bg-neutral-200 p-4 rounded cursor-pointer w-fit">
                                        <Image width={32} height={32} src={b2ImageValue ? URL.createObjectURL(b2ImageValue) : imageIcon} alt="" className="w-8"/>
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Tên sản phẩm:</span>
                                <input id="b2Title" type="text" onChange={(e) => setB2TitleValue(e.target.value)} 
                                value={b2TitleValue} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Link:</span>
                                <input id="b2Link" type="text" onChange={(e) => setB2LinkValue(e.target.value)} 
                                value={b2LinkValue} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                            </div>

                            <div className="flex gap-4">
                                <div className="cursor-pointer px-4 py-2 rounded bg-neutral-300 hover:bg-gray-400" onClick={resetB2Form}>
                                    Đặt lại
                                </div>

                                <button type="submit" className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white">Lưu</button>
                            </div>
                        </form>

                        <div className="bg-[#eee] relative flex items-center w-1/3">
                            <div className="-md:w-1/3 -md:py-4 w-1/2 pl-4 py-auto py-2">
                                {
                                    (!!banner2)
                                    ? <Image width={280} height={280} src={b2ImageValue ? URL.createObjectURL(b2ImageValue) : urlFor(banner2).url()} alt="" />
                                    : <Image src={newProduct2} alt="" />
                                }                    
                            </div>

                            <div className="absolute right-0 bottom-1/2 translate-y-1/2 w-[45%] pr-[30px]">
                                <span className="text-xl leading-[15px] font-bold mb-[15px]">
                                    {b2TitleValue}
                                </span>

                                <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] overflow-hidden [&:hover>.absolute]:translate-x-0 w-fit
                                bg-[#eee]">
                                    {t('buyNow')}
                                    <Link href={b2LinkValue} 
                                    className="absolute left-0 top-0 w-full h-full bg-red-500 text-white translate-x-[-110%] transition-all duration-300 text-center">
                                        {t('buyNow')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between w-full pb-12 border-b">
                        <form className="flex gap-4 flex-col" onSubmit={(e) => handleSubmitB3(e)}>
                            <h2 className="font-bold text-2xl">Banner 3</h2>

                            <div className="flex gap-2 text-semibold text-xl items-center">
                                <input id="b3Image" type="file" name="myImage" onChange={(e) => e.target.files && setB3ImageValue(e.target.files[0])} className="hidden"/>
                                <span>Hình ảnh:</span>

                                <label htmlFor="b3Image" className="">
                                    <div className="bg-neutral-200 p-4 rounded cursor-pointer w-fit">
                                        <Image width={32} height={32} src={b3ImageValue ? URL.createObjectURL(b3ImageValue) : imageIcon} alt="" className="w-8"/>
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Tiêu đề 1:</span>
                                <input id="b3Text1" type="text" onChange={(e) => setB3Text1Value(e.target.value)} 
                                value={b3Text1Value} className="px-4 py-2 border border-neutral-400 w-[15rem]"/>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Tiêu đề 2:</span>
                                <input id="b3Text2" type="text" onChange={(e) => setB3Text2Value(e.target.value)} 
                                value={b3Text2Value} className="px-4 py-2 border border-neutral-400 w-[15rem]"/>
                            </div>

                            <div className="flex gap-4 items-center">
                                <span>Link:</span>
                                <input id="b3Link" type="text" onChange={(e) => setB3LinkValue(e.target.value)} 
                                value={b3LinkValue} className="px-4 py-2 border border-neutral-400 w-full"/>
                            </div>

                            <div className="flex gap-4">
                                <div className="cursor-pointer px-4 py-2 rounded bg-neutral-300 hover:bg-gray-400" onClick={resetB3Form}>
                                    Đặt lại
                                </div>

                                <button type="submit" className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white">Lưu</button>
                            </div>
                        </form>

                        <div className="bg-[#eee] relative flex items-center w-2/3 h-[30rem]">
                            <div className="-md:w-1/2 w-1/2">
                                {
                                    (!!banner3)
                                    ? <Image width={240} height={240} src={b3ImageValue ? URL.createObjectURL(b3ImageValue) : urlFor(banner3).url()} alt="" className="mx-auto"/>
                                    : <Image src={newProduct1} alt="" />
                                }                
                            </div>

                            <div className="absolute bottom-1/2 translate-y-1/2 right-0 w-[45%] pr-[40px]">
                                <h2 className="text-sm md:text-[25px] leading-[30px] text-[#666666] mb-2.5">
                                    {b3Text1Value}
                                </h2>
                                <h2 className="text-2xl md:text-[48px] leading-[1.1] font-bold text-[#434343] mb-4">
                                    {b3Text2Value}
                                </h2>
                                <div className="relative border-2 border-[#d3d3d3] px-[15px] leading-[30px] overflow-hidden [&:hover>.absolute]:translate-x-0 w-fit
                                bg-[#eee]">
                                    {t('shopNow')}
                                    <Link href={b3LinkValue} 
                                        className="absolute left-0 top-0 w-full h-full bg-red-500 text-white translate-x-[-110%] transition-all duration-300 text-center">
                                            {t('shopNow')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mb-12">
                        <h2 className="font-bold text-2xl mb-8">Slider</h2>
                        
                        <div className="flex gap-8 border border-neutral-500 p-6 flex-wrap items-center">
                            {sliders.map((s, index) => (
                                <div key={index} className="relative [&:hover>.absolute]:block">
                                    <Image src={bannerData[0].slider.includes(s) ? urlFor(s.image).url() : URL.createObjectURL(s.image)} width={360} height={120} alt="" className="w-[22rem]"/>
                                    <div className="absolute inset-0 w-full h-full bg-filter-dark z-20 hidden"></div>

                                    <button className="absolute top-2 right-2 z-20 hidden"
                                    onClick={() => removeSlide(index)}>
                                        <Image src={closeIcon} alt="" className="w-4"/>
                                    </button>

                                    <button onClick={() => setSelectedSlide(index)}
                                    className="absolute bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 z-20 hidden rounded-[100%] border-2 border-white p-2">
                                        <Image src={editIcon} alt="" className="w-5"/>
                                    </button>
                                </div>
                            ))}
                            <button className="flex items-center justify-center w-[22rem] h-full" onClick={() => setNewSlideVisible(true)}>
                                <Image src={plusIcon} alt="" className="w-12 "/>
                            </button>
                        </div>

                        <div className={`fixed z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-white px-4 py-5
                        ${selectedSlide !== null ? '' : 'hidden'}`} ref={linkEditRef}>
                            <div className="w-full flex items-end mb-4">
                                <button onClick={() => setSelectedSlide(null)} className="ml-auto">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z" fill="#000000"/>
                                    </svg>                                
                                </button>
                            </div>

                            <div className="flex gap-2.5 items-center">
                                <span>Link:</span>
                                <input type="text" value={linkValue.length > 0 ? linkValue : bannerData[0].slider[selectedSlide || 0].link} 
                                className="w-[30rem] border px-4 py-2" onChange={handleSliderLinkChange}/>

                                <button className="px-4 py-2 bg-blue-500 rounded text-white" onClick={() => handleSliderLinkUpdate(selectedSlide || 0)}>
                                    Lưu
                                </button>
                            </div>
                        </div>

                        <div className={`fixed z-50 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 bg-white px-4 py-5
                        ${newSlideVisible ? '' : 'hidden'}`} ref={newSlideRef}>
                            <div className="w-full flex items-end mb-4">
                                <button onClick={hideNewSlide} className="ml-auto">
                                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z" fill="#000000"/>
                                    </svg>                                
                                </button>
                            </div>

                            <div className="flex gap-2.5 items-center mb-12">
                                <span>Hình ảnh:</span>
                                <input type="file" id="sliderImage" className="hidden" onChange={(e) => e.target.files && setNewSlideImageValue(e.target.files[0])}/>

                                <label htmlFor="sliderImage" className="">
                                    <div className="bg-neutral-200 p-4 rounded cursor-pointer w-fit">
                                        <Image width={32} height={32} src={newSlideImageValue ? URL.createObjectURL(newSlideImageValue) : imageIcon} alt="" 
                                        className={newSlideImageValue ? "w-[24rem]" : "w-8"}/>
                                    </div>
                                </label>
                            </div>

                            <div className="flex gap-2.5 items-center">
                                <span>Link:</span>
                                <input type="text" value={newLinkValue} onChange={handleNewLinkChange} className="w-[30rem] border px-4 py-2"/>
                            </div>

                            <div className="flex gap-4 w-fit mx-auto mt-4">
                                <div className="cursor-pointer px-4 py-2 rounded bg-neutral-300 hover:bg-gray-400" onClick={resetNewSlide}>
                                    Đặt lại
                                </div>

                                <button onClick={addNewSlide} className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white">Lưu</button>
                            </div>
                        </div>

                        <div className={`bg-filter-dark w-screen h-screen fixed inset-0 z-[40] ${(selectedSlide !== null || newSlideVisible) ? "" : "hidden"}`}></div>

                        <div className="flex gap-4 mx-auto mt-4 w-fit">
                            <div className="cursor-pointer px-4 py-2 rounded bg-neutral-300 hover:bg-gray-400" onClick={resetSlider}>
                                Đặt lại
                            </div>

                            <button onClick={handleSubmitSlider} className="px-4 py-2 rounded bg-red-500 hover:bg-red-700 text-white">Lưu</button>
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
  