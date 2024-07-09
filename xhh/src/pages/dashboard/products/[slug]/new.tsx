// @ts-nocheck

import { useEffect, useState } from "react";
import Image from "next/image";
import { IProduct } from "../../../../../interface/interface";
import Header from "../../../../../components/admin/Header";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { editIcon, imageIcon, plusIcon } from "../../../../../public/assets";
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import supabase from "../../../../../supabase";

function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

var slugify = require('slugify')

export default function NewProductPage() {
    const { t } = useTranslation('common');

    const [user, setUser] = useState({})
    
    useEffect(() => {
        const loginSB = async () => {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: 'khanhduycb1510@gmail.com',
                password: '4ristalZ!!',
            });

            if (error) {
                console.log(error)
            }

            setUser(data)
        }

        loginSB()
    
    }, [slug]);

    const [titleValue, setTitleValue] = useState('');
    const [categoryValue, setCategoryValue] = useState('');
    const [mainImageValue, setMainImageValue] = useState();
    const [sliderImageValue, setSliderImageValue] = useState([]);
    const [descriptionValue, setDescriptionValue] = useState('');

    const [specificValue, setSpecificValue] = useState();

    const [priceValue, setPriceValue] = useState();
    const [quantityValue, setQuantityValue] = useState();

    const [priceSet, setPriceSet] = useState();

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
    };

    const handleReset = () => {
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        
        const { imageData, imageError } = await supabase
        .storage
        .from('images')
        .update(`ALL/${product.image_url.substring(product.image_url.lastIndexOf("/") + 1)}`, mainImageValue,{
            cacheControl: '3600',
            upsert: true
        })

        const { data, error } = await supabase
        .from('products')
        .update({
            title_vi: titleValue,
            title_en: titleValue,
            category: slugify(categoryValue.toLowerCase()),
            slug: slugify(titleValue.toLowerCase()),
            specific_description_vi: specificValue,
            specific_description_en: specificValue,
            description_vi: descriptionValue?.split('\n'),
            description_en: descriptionValue?.split('\n'),
            price_set: priceSet,
            price: priceValue,
            quantity: quantityValue
        })
        .eq('slug', slug)
        .select();

        if (error) {
            console.log('Error fetching product:', error.message);
            console.log('Error fetching product:', imageError.message);
        } else {
            console.log(data)
        }
    };

    const removePriceSet = (index: number) => {
        setPriceSet((prevState) => {
            const updatedSet = [...prevState]
            updatedSet.splice(index, 1);

            return updatedSet
        })
    };
        
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
                    <form className="flex gap-10 flex-col" onSubmit={(e) => handleSubmitForm(e)}>
                        <div className="p-5 bg-white">
                            <h3 className="text-2xl font-semibold mb-8">Thông tin cơ bản</h3>

                            <div className="flex gap-4 flex-col ml-4">
                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[8rem] text-end"><span className="text-red-500 mr-1">*</span>Tên sản phẩm</span>
                                    <input id="title" type="text" onChange={(e) => setTitleValue(e.target.value)} 
                                    value={titleValue !== undefined ? titleValue : product.title_vi} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
                                </div>

                                <div className="flex gap-4 items-center">
                                    <span className="min-w-[8rem] text-end">Loại hàng</span>
                                    <input type="text" onChange={(e) => setCategoryValue(e.target.value)} 
                                    value={categoryValue !== undefined ? t(categoryValue) : t(product.category)} className="px-4 py-2 border border-neutral-400 w-[30rem]"/>
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
                                            <textarea  className="w-[50rem] p-2 border" 
                                            onChange={(e) => setDescriptionValue(e.target.value)} defaultValue={product.description_vi?.join('\n')} rows={8}>
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
                                        value={specificValue?.brand ? specificValue["brand"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Chất liệu</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "material": e.target.value} })} 
                                        value={specificValue?.brand ? specificValue["material"] : ""}
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Màu sắc</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "colors": e.target.value} })} 
                                        value={specificValue?.brand ? specificValue["colors"] : ""}
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Kích thước</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "size": e.target.value} })} 
                                        value={specificValue?.brand ? specificValue["size"] : ""}
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Độ tuổi</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "age": e.target.value} })} 
                                        value={specificValue?.brand ? specificValue["age"] : ""} 
                                        className="px-4 py-2 border border-neutral-400 w-[24rem]"/>
                                    </div>
                                </div>

                                <div className="flex gap-4 flex-col ml-4">
                                    <div className="flex gap-4 items-center">
                                        <span className="min-w-[6rem]">Tặng kèm</span>
                                        <input type="text" onChange={(e) => setSpecificValue((prevState) => { return {...prevState, "bonus": e.target.value} })} 
                                        value={specificValue?.brand ? specificValue["bonus"] : ""}
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
                                            <div key={index} className="flex items-center">
                                                <input type="text" id="set-name" className="border border-r-0 p-5 outline-neutral-500 w-[15rem]" value={s.size}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].size = e.target.value])}/>

                                                <input type="text" id="set-full-price" className="border border-r-0 p-5 outline-neutral-500 w-[10rem]" value={s.fullPrice}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].fullPrice = e.target.value])}/>

                                                <input type="text" id="set-price" className="border border-r-0 p-5 outline-neutral-500 w-[10rem]" value={s.price}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].price = e.target.value])}/>

                                                <input type="text" id="set-discount" className="border border-r-0 p-5 outline-neutral-500 w-[5rem]" value={s.discount}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].discount = e.target.value])}/>

                                                
                                                <input type="text" id="set-quantity" className="border p-5 outline-neutral-500 w-[5rem]" value={s.quantity}
                                                onChange={(e) => setPriceSet(prevState => [...prevState, prevState[index].quantity = e.target.value])}/>

                                                <button onClick={() => removePriceSet(index)} type="button" 
                                                className="rounded border border-neutral-500 px-4 py-2 h-fit cursor-pointer ml-10">
                                                    Xoá
                                                </button>
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

                        <div className="bg-neutral-50 fixed right-24 bottom-12 border-2 px-6 py-4 flex gap-5 
                        items-center justify-end">
                            <button type="button" onClick={handleReset} className="bg-neutral-500 px-4 py-2 font-semibold rounded text-white hover:bg-neutral-700">
                                Đặt lại
                            </button>

                            <button type="submit" className="bg-red-500 px-4 py-2 font-semibold rounded text-white hover:bg-red-700">
                                Lưu
                            </button>
                        </div>

                        <div className={`fixed z-50 translate-x-1/2 translate-y-1/2 right-1/2 bottom-1/2 bg-white p-4
                            ${deleteConfirmVisible ? "flex" : "hidden"} flex-col gap-4 items-center`}>
                            <h3>Xoá sản phẩm</h3>

                            <div className="flex">
                                <button type="button" onClick={() => setDeleteConfirmVisible(false)}>Huỷ</button>
                                <button type="button" onClick={confirmDelete}>Xác nhận</button>
                            </div>
                        </div>

                        <div className={`fixed inset-0 w-screen h-screen bg-filter-dark
                            ${deleteConfirmVisible ? "block" : "hidden"}`}></div>
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