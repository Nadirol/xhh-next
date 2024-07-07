// @ts-nocheck

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import { IProduct } from "../../../../../interface/interface";
import Header from "../../../../../components/admin/Header";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Link from "next/link";
import { useRouter } from "next/router";
import { closeIcon, editIcon, imageIcon, plusIcon } from "../../../../../public/assets";
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

          setTitleValue(data.title_vi)
          setCategoryValue(data.category)
          setSliderImageValue(data.preview_images)
          setDescriptionValue(data.description_vi?.join('\n'))
          setPriceSet(data.price_set)

          return data
        };

        fetchData()
    
    }, [slug]);

    const [titleValue, setTitleValue] = useState(product.title_vi);
    const [categoryValue, setCategoryValue] = useState(product.category);
    const [mainImageValue, setMainImageValue] = useState();
    const [sliderImageValue, setSliderImageValue] = useState(product.preview_images);
    const [descriptionValue, setDescriptionValue] = useState(product.description_vi?.join('\n'));

    const [specificValue, setSpecificValue] = useState({});

    const [priceValue, setPriceValue] = useState(product.price);
    const [quantityValue, setQuantityValue] = useState(product.quantity);

    const [priceSet, setPriceSet] = useState(product.price_set);

    const [newPriceSet, setNewPriceSet] = useState({
        size: '',
        fullPrice: 0,
        price: 0,
        discount: 0,
        quantity: 0
    });

    const addPriceSet = () => {
        setPriceSet((prevState) => {
            let updatedSet = [...prevState || []]
            updatedSet?.unshift(newPriceSet);

            return updatedSet
        });

        setNewPriceSet({
            size: '',
            fullPrice: 0,
            price: 0,
            discount: 0,
            quantity: 0
        })
    }
        
    if (isLoading) {
        return <div className=""></div>
    }
    
    if (!product) {
        return <div>Product not found</div>;
    }

    return (
        <div className="bg-neutral-100">
            <Header/>

            <div className="w-[90%] mx-auto mt-16">
                {product && (
                    <form className="flex gap-10 flex-col">
                        <div className="p-5 bg-white">
                            <h3 className="text-2xl font-semibold mb-8">Thông tin cơ bản</h3>

                            <div className="flex gap-4 flex-col ml-4">
                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[8rem] text-end"><span className="text-red-500 mr-1">*</span>Tên sản phẩm</span>
                                    <input id="title" type="text" onChange={(e) => setTitleValue(e.target.value)} 
                                    value={titleValue || product.title_vi} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[8rem] text-end">Loại hàng</span>
                                    <input type="text" onChange={(e) => setCategoryValue(e.target.value)} 
                                    value={t(categoryValue) || t(product.category)} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[8rem] text-end"><span className="text-red-500 mr-1">*</span>Hình đại diện</span>
                                    {(product.image_url) ? (
                                        <div className="relative [&:hover]:before:block [&:hover>.z-20]:block before:hidden before:absolute before:inset-0 
                                        before:w-full before:h-full before:z-[15] before:bg-filter-dark w-[16rem]">
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
                                    <span className="min-w-[8rem] text-end"><span className="text-red-500 mr-1">*</span>Hình ảnh</span>
                                    <div className="flex p-4 border flex-wrap items-center">
                                        {sliderImageValue 
                                            ? sliderImageValue.map((s, index) => (
                                                <div key={index} className="relative [&:hover>.absolute]:block">
                                                    <Image src={product.preview_images?.includes(s) ? s : URL.createObjectURL(s)} width={240} height={240} alt="" className="w-[12rem]"/>

                                                    <input type="file" id="slider-image" className="hidden"/>
                                                    <label htmlFor="slider-image" className="absolute hidden right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 z-[20] cursor-pointer">
                                                        <Image src={editIcon} alt="" className="w-8"/>
                                                    </label>

                                                    <div className="absolute z-[15] inset-0 w-full h-full bg-filter-dark hidden"></div>
                                                </div>                                
                                            ))
                                            : product.preview_images?.map((s, index) => (
                                                <div key={index} className="relative [&:hover>.absolute]:block">
                                                    <Image src={s} width={240} height={240} alt="" className="w-[12rem]"/>

                                                    <input type="file" id="slider-image" className="hidden"/>
                                                    <label htmlFor="slider-image" className="absolute hidden right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 z-[20] cursor-pointer">
                                                        <Image src={editIcon} alt="" className="w-8" />
                                                    </label>

                                                    <div className="absolute z-[15] inset-0 w-full h-full bg-filter-dark hidden"></div>
                                                </div> 
                                            ))}

                                            <input type="file" id="new-slider-image" className="hidden"/>
                                            <label htmlFor="new-slider-image" className="px-10 cursor-pointer">
                                                <Image src={plusIcon} alt="" />
                                            </label>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[8rem] text-end">Mô tả</span>
                                    
                                    <div className="">
                                        <input id="description" type="text" className="hidden" onChange={(e) => setDescriptionValue(e.target.value)}/>
                                        <label htmlFor="description">
                                            <textarea  className="w-[50rem] p-2 border" defaultValue={product.description_vi?.join('\n')} value={descriptionValue} rows={8}>
                                            </textarea>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 bg-white">
                            <h3 className="text-2xl font-semibold mb-8">Thông tin chi tiết</h3>

                            <div className="flex gap-10 flex-wrap">
                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Thương hiệu</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "brand": e.target.value} })} 
                                        value={product.specific_description_vi ? specificValue["brand"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Chất liệu</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "material": e.target.value} })} 
                                        value={product.specific_description_vi ? specificValue["material"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Màu sắc</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "colors": e.target.value} })} 
                                        value={product.specific_description_vi ? specificValue["colors"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Kích thước</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "size": e.target.value} })} 
                                        value={product.specific_description_vi ? specificValue["size"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Độ tuổi</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "age": e.target.value} })} 
                                        value={product.specific_description_vi ? specificValue["age"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Tặng kèm</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "bonus": e.target.value} })} 
                                        value={product.specific_description_vi ? specificValue["bonus"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 bg-white">
                            <h3 className="text-2xl font-semibold mb-8">Thông tin bán hàng</h3>

                            <div className="flex gap-4 flex-col ml-4">
                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[6rem] text-end">Giá</span>

                                    <div className="border flex">
                                        <span className="border-r h-full py-2.5 px-4 text-center bg-neutral-50">đ</span>
                                        <input type="number" value={priceValue || product.price} onChange={(e) => setPriceValue(e.target.value)}
                                        className="px-4 py-2 outline-0 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[6rem] text-end">Kho hàng</span>

                                    <div className="border flex">
                                        <input type="number" value={quantityValue || product.quantity} onChange={(e) => setPriceValue(e.target.value)}
                                        className="px-4 py-2 outline-0 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <span className="min-w-[6rem] text-end">Phân loại hàng</span>

                                    <div className="flex gap-4 flex-col">
                                        <div className="flex border text-center">
                                            <div className="border-r p-5 outline-0 w-[15rem]">Phân loại</div>
                                            <div className="border-r p-5 outline-0 w-[10rem]">Giá gốc</div>
                                            <div className="border-r p-5 outline-0 w-[10rem]">Giá sau khi giảm</div>
                                            <div className="border-r p-5 outline-0 w-[5rem]">Phần trăm giảm</div>
                                            <div className="border-r p-5 outline-0 w-[5rem]">Số lượng</div>
                                        </div>

                                        {(priceSet ? priceSet : product.price_set)?.map((s, index) => (
                                            <div key={index} className="flex border">
                                                <input type="text" id="set-name" className="border-r p-5 outline-neutral-500 w-[15rem]" value={s.size}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].size = e.target.value])}/>

                                                <input type="text" id="set-full-price" className="border-r p-5 outline-neutral-500 w-[10rem]" value={s.fullPrice}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].fullPrice = e.target.value])}/>

                                                <input type="text" id="set-price" className="border-r p-5 outline-neutral-500 w-[10rem]" value={s.price}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].price = e.target.value])}/>

                                                <input type="text" id="set-discount" className="border-r p-5 outline-neutral-500 w-[5rem]" value={s.discount}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].discount = e.target.value])}/>

                                                
                                                <input type="text" id="set-quantity" className="border-r p-5 outline-neutral-500 w-[5rem]" value={s.quantity}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].quantity = e.target.value])}/>
                                            </div>
                                        ))}

                                            <div className="mt-4 flex gap-8 items-center">
                                                <div className="flex border">
                                                    <input type="text" className="border-r p-5 outline-neutral-500 w-[15rem]"
                                                    value={newPriceSet.size} onChange={(e) => setNewPriceSet((prevState) => {
                                                        let updatedSet = {...prevState}

                                                        updatedSet.size = e.target.value
                                                        return updatedSet
                                                    })}/>

                                                    <input type="text" className="border-r p-5 outline-neutral-500 w-[10rem]"
                                                    value={newPriceSet.fullPrice} onChange={(e) => setNewPriceSet((prevState) => {
                                                        let updatedSet = {...prevState}

                                                        updatedSet.fullPrice = e.target.value
                                                        return updatedSet
                                                    })}/>

                                                    <input type="text" className="border-r p-5 outline-neutral-500 w-[10rem]"
                                                    value={newPriceSet.price} onChange={(e) => setNewPriceSet((prevState) => {
                                                        let updatedSet = {...prevState}

                                                        updatedSet.price = e.target.value
                                                        return updatedSet
                                                    })}/>

                                                    <input type="text" className="border-r p-5 outline-neutral-500 w-[5rem]"
                                                    value={newPriceSet.discount} onChange={(e) => setNewPriceSet((prevState) => {
                                                        let updatedSet = {...prevState}

                                                        updatedSet.discount = e.target.value
                                                        return updatedSet
                                                    })}/>

                                                    <input type="text" className="border-r p-5 outline-neutral-500 w-[5rem]"
                                                    value={newPriceSet.quantity} onChange={(e) => setNewPriceSet((prevState) => {
                                                        let updatedSet = {...prevState}

                                                        updatedSet.quantity = e.target.value
                                                        return updatedSet
                                                    })}/>
                                                </div>

                                                <div onClick={addPriceSet} className="rounded border border-neutral-500 px-4 py-2 h-fit cursor-pointer">Thêm</div>
                                            </div>
                                    </div>
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