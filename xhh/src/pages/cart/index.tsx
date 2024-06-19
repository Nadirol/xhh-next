// @ts-nocheck

import { i18n, useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Link from "next/link";

import { FormEvent, useEffect, useRef, useState } from "react";

import Image from "next/image";
import { useRecoilState } from "recoil";
import Header from "../../../components/Header";
import Widgets from "../../../components/Widgets";
import Footer from "../../../components/Footer";
import axios from 'axios';
import { NextSeo } from "next-seo";
import { Lato } from "next/font/google";
import { binIcon, cardIcon, logoRed, shopBackground, truckIcon } from "../../../public/assets";
import { cartState } from "../../../atoms/cartState";
import { ICartProduct, ICoupon, IOrder, IProduct } from "../../../interface/interface";
import supabase from "../../../supabase";
import router from "next/router";
import { client } from "../../../lib/sanity";

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

interface City {
    Id: string;
    Name: string;
    Districts: District[];
  }
  
  interface District {
    Id: string;
    Name: string;
    Wards: Ward[];
  }
  
  interface Ward {
    Id: string;
    Name: string;
    Level: string;
  }

  const generateOrderCode = () => {
    const randomString = Math.random().toString(36).substring(2, 6);
    const timestamp = Date.now().toString(36).substring(2, 6);
    return `${randomString.toUpperCase()}${timestamp.toUpperCase()}`;
  }

export default function CartPage() {
    const { t } = useTranslation('common');

    const [fullNameValue, setFullNameValue] = useState('');
    const [phoneNumberValue, setPhoneNumberValue] = useState('');
    const [phoneNumber2Value, setPhoneNumber2Value] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [messageValue, setMessageValue] = useState('');

    const [cityValue, setCityValue] = useState('');
    const [districtValue, setDistrictValue] = useState('');
    const [wardValue, setWardValue] = useState('');
    const [addressDetailsValue, setAddressDetailsValue] = useState('');

  
    const handleFullNameChange = (e: any) => {
      setFullNameValue(e.target.value)
    };
  
    const handlePhoneNumberChange = (e: any) => {
      setPhoneNumberValue(e.target.value)
    };

    const handlePhoneNumber2Change = (e: any) => {
      setPhoneNumber2Value(e.target.value)
    };
  
    const handleEmailChange = (e: any) => {
      setEmailValue(e.target.value)
    };
    
    const handleMessageChange = (e: any) => {
      setMessageValue(e.target.value)
    };

    const handleCityChange = (e: any) => {
      setCityValue(e.target.value)
    };
  
    const handleDistrictChange = (e: any) => {
      setDistrictValue(e.target.value)
    };
  
    const handleWardChange = (e: any) => {
      setWardValue(e.target.value)
    };
    
    const handleAddressDetailsChange = (e: any) => {
      setAddressDetailsValue(e.target.value)
    };
  
    const [popUpVisible, setPopUpVisible] = useState(false);
    const showPopUp = () => {
  
        if (emailValid) {
          setPopUpVisible(prevState => !prevState)
          setTimeout(() => {
              setPopUpVisible(prevState => !prevState)
          }, 2000)
    
          setTimeout(() => {
            setFullNameValue('');
            setPhoneNumberValue('');
            setEmailValue('');
            setMessageValue('');
          }, 200)
        }

        return emailValid;
    }

    const emailInputRef = useRef(null);

    const [emailValid, setEmailValid] = useState(true);
    const validateEmail = (email: any) => {
      return String(email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validate = (e: React.FormEvent<HTMLInputElement>) => {
      const email = e?.currentTarget.value
      if (email && validateEmail(email)) {
        setEmailValid(true);
      } else if (email) {
        setEmailValid(false);
      }

      return false
    };

    const [orderData, setOrderData] = useState<IOrder>({})

    const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault(); // prevent the default form submission

      const order: IOrder = {
        _type: 'orderXHH',
        code: generateOrderCode(),
        username: fullNameValue,
        email: emailValue,
        phoneNumber: phoneNumberValue,
        phoneNumber2: phoneNumber2Value,
        date: new Date(),
        address: {
          city: cityData.filter(c => c.Id === cityValue)[0].Name,
          district: cityData.filter(c => c.Id === cityValue)[0].Districts.filter(c => c.Id === districtValue)[0].Name,
          ward: cityData.filter(c => c.Id === cityValue)[0].Districts.filter(c => c.Id === districtValue)[0].Wards.filter(c => c.Id === wardValue)[0].Name,
          details: addressDetailsValue
        },
        products: cartItems.map((item: ICartProduct) => {
          return {
            title: item.title_vi,
            quantity: item.quantity
          }
        }),
        paymentMethod: paymentMethod,
        total: (amount + shippingFee) * ((100 - appliedCoupon.discountPercentage) / 100),
        note: messageValue,
        isCompleted: false
      };

        // const orderDocRef = await addDoc(orderColRef, order);

        // await sendOrder({...order, date: Timestamp.fromDate(new Date()).toDate().toLocaleString()});

        // await router.push(`${i18n?.language}/confirmation`)
        setOrderData(order)
        setConfirmVisible(true)
    };

    const handleCardPayment = (order: IOrder) => {
      !cardPaymentVisible 
      ? setCardPaymentVisible(true)
      : handleConfirmation(order)
    }

    const handleConfirmation = async (order: IOrder) => {
      client.create({...order, date: new Date()}).then((res) => {
        console.log(`Order was created, document ID is ${res._id}`)
      });

      await router.push(`${i18n?.language}/confirmation`)
    };

    const [cardPaymentVisible, setCardPaymentVisible] = useState(false);

    const [cityData, setCityData] = useState([])

    useEffect(() => {
        const citis = document.getElementById("city");
        const districts = document.getElementById("district");
        const wards = document.getElementById("ward");
    
        const fetchData = async () => {
          try {
            const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
            const data = response.data;

            setCityData(data)
    
            renderCity(data);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchData();
    
        const renderCity = (data: City[]): void => {
            const citis = document.getElementById("city") as HTMLSelectElement;
            const districts = document.getElementById("district") as HTMLSelectElement;
            const wards = document.getElementById("ward") as HTMLSelectElement;
          
            for (const x of data) {
              citis.options[citis.options.length] = new Option(x.Name, x.Id);
            }
          
            citis.onchange = function () {
              districts.length = 1;
              wards.length = 1;
              if (this.value !== "") {
                const result = data.filter((n) => n.Id === this.value);
                for (const k of result[0].Districts) {
                  districts.options[districts.options.length] = new Option(k.Name, k.Id);
                }
              }
            };
          
            districts.onchange = function () {
              wards.length = 1;
              const dataCity = data.filter((n) => n.Id === citis.value);
              if (this.value !== "") {
                const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;
                for (const w of dataWards) {
                  wards.options[wards.options.length] = new Option(w.Name, w.Id);
                }
              }
            };
          };
      }, []);

    const [cartItems, setCartItems] = useRecoilState(cartState);
    
    const removeCartItem = (id: number) => {
      const updatedItems = cartItems.map((item: ICartProduct) => {
        if (item.id === id) {
          return {...item, quantity: 0};
        }
  
        return {...item}
      }).filter((item: ICartProduct) => item.quantity > 0);
  
      setCartItems(updatedItems);
    }

    const updateQuantity = (id: number, quantity: number) => {
      const updatedItems = cartItems.map((item: ICartProduct) => {
        if (item.id === id) {
          return {...item, quantity: quantity};
        }
  
        return {...item}
      }).filter((item: ICartProduct) => item.quantity > 0);
  
      setCartItems(updatedItems);
    }

    const [couponInputVisible, setCouponInputVisible] = useState(false);
    const [couponValue, setCouponValue] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<ICoupon>({coupon: "", discountPercentage: 0});
    const [displayInvalidCoupon, setDisplayInvalidCoupon] = useState(false)

    const submitCoupon = () => {
      if (couponValue === "DEMO123") {
        setAppliedCoupon({
          coupon: "DEMO123",
          discountPercentage: 15
        });

        setDisplayInvalidCoupon(false);
        setCouponValue('')
      } else {
        setDisplayInvalidCoupon(true)
      }
    };

    const [shippingFee, setShippingFee] = useState(0);

    const [relevantProducts, setRelevantProducts] = useState<IProduct[]>([]);

    async function fetchRelevantData(slug: string | string[]) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false })
        .eq('isNew', true)
        .neq('slug', slug)
        .range(0, 3);
      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setRelevantProducts(data);
      }
    };

    useEffect(() => {
      fetchRelevantData(cartItems.map((i) => i.slug))
    },[])

    const [amount, setAmount] = useState(cartItems.map((item: ICartProduct) => item.price * item.quantity).reduce((partialSum: number, a: number) => partialSum + a, 0));

    const updateAmount = () => {
      setAmount(cartItems.map((item: ICartProduct) => item.price * item.quantity).reduce((partialSum: number, a: number) => partialSum + a, 0))
    }
    
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [paymentMethod, setPaymentMethod] = useState(t('paymentAfter'));

    const handlePaymentChange = (e: string) => {
      setPaymentMethod(e);
    };

    return (
        <div>
            <NextSeo
                title="Giỏ Hàng - Xuân Hoà Home"
                noindex
            />

            <div className={`${lato.className} flex flex-col overflow-hidden`}>

                <Header
                    t={t}
                />

                <div className="w-full h-[300px] relative before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-filter-dark before:z-10">
                    <Image src={shopBackground} alt="banner image" className="z-0 absolute translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2 object-cover h-full"/>
                    <h2 className="text-white absolute z-[11] translate-x-1/2 translate-y-1/2 bottom-1/2 right-1/2 text-[45px] font-bold">
                        {t('cart').toUpperCase()}
                    </h2>

                    <div className="relative z-10 w-container mx-auto pb-4 h-full flex items-end">
                      <div className="flex gap-2 text-white">
                          <Link href="/" className="hover:text-red-500 transition-all">
                            {t('home').toUpperCase()}
                          </Link>
                          <span className="pointer-events-none">/</span>
                          <div className="hover:text-red-500 transition-all">
                              {t('cart').toUpperCase()}
                          </div>
                      </div>
                    </div>
                </div>

                {cartItems.length > 0
                ? (
                  <main className="w-container-large mx-auto py-7 flex -md:flex-col gap-8 justify-between">
                    {/* iframe to prevent reloading */}
                    <iframe name="frame" className="hidden"></iframe>

                    {/* send message to email using formsubmit.co */}
                    <form className="mx-auto flex flex-col items-center gap-6" onSubmit={(e) => handleFormSubmit(e)}>
                        <div className="flex gap-7 -md:flex-col w-full">
                            <div className="flex gap-2 flex-col flex-[50%]">
                                <label className="text-neutral-800 font-medium text-base">{t('fullName')} <span className="text-red-500">*</span></label>
                                <input type="text" name="First Name" placeholder={t('fullNamePlaceholder')} required value={fullNameValue} onChange={(e) => handleFullNameChange(e)}
                                className="px-6 py-2 border placeholder:text-xs text-base w-full"/>
                            </div>

                            <div className="flex gap-2 flex-col flex-[50%]">
                                    <label htmlFor="" className="text-neutral-800 font-medium text-base">{t('email')}</label>
                                    <input type="email" name="Email" placeholder={t('emailPlaceholder')} value={emailValue} 
                                    onChange={(e) => handleEmailChange(e)} onInput={e => validate(e)} ref={emailInputRef}
                                    className={`px-6 py-2 border
                                    ${!emailValue ? "" : emailValid ? 'border-green-600' : 'border-red-500'} 
                                    placeholder:text-xs text-base outline-none`} />
                            </div>
                        </div>

                        <div className="flex gap-7 -md:flex-col w-full">
                            <div className="flex gap-2 flex-col flex-[50%]">
                                <label htmlFor="" className="text-neutral-800 font-medium text-base">{t('phoneNumber')} <span className="text-red-500">*</span></label>
                                <input type="number" name="Phone Number" minLength={5} placeholder={t('phoneNumberPlaceholder')} required value={phoneNumberValue} 
                                onChange={(e) => handlePhoneNumberChange(e)}
                                onKeyDown={ e => ( e.key === 'e' || e.key === '.' ) && e.preventDefault() }
                                className="px-6 py-2 border placeholder:text-xs text-base"/>
                            </div>

                            <div className="flex gap-2 flex-col flex-[50%]">
                                <label htmlFor="" className="text-neutral-800 font-medium text-base">{t('phoneNumber2')}</label>
                                <input type="number" name="Phone Number" minLength={5} placeholder={t('phoneNumber2Placeholder')} value={phoneNumber2Value} 
                                onChange={(e) => handlePhoneNumber2Change(e)}
                                onKeyDown={ e => ( e.key === 'e' || e.key === '.' ) && e.preventDefault() }
                                className="px-6 py-2 border placeholder:text-xs text-base"/>
                            </div>
                        </div>

                        <div className="flex gap-2 md:items-center -md:flex-col w-full">
                            <select className="form-select form-select-sm border px-4 py-2" id="city" aria-label=".form-select-sm" 
                            onChange={(e) => handleCityChange(e)} required>
                                <option value={cityValue} selected>Chọn tỉnh thành</option>
                            </select>

                            <select className="form-select form-select-sm border px-4 py-2" id="district" aria-label=".form-select-sm"
                            onChange={(e) => handleDistrictChange(e)} required>
                                <option value={districtValue} selected>Chọn quận huyện</option>
                            </select>

                            <select className="form-select form-select-sm border px-4 py-2" id="ward" aria-label=".form-select-sm"
                            onChange={(e) => handleWardChange(e)} required>
                                <option value={wardValue} selected>Chọn phường xã</option>
                            </select>
                        </div>

                        <div className="flex gap-2 flex-col w-full">
                            <label className="text-neutral-800 font-medium text-base">{t('addressDetailsLabel')} <span className="text-red-500">*</span></label>
                            <input type="text" name="First Name" placeholder={t('addressDetailsPlaceholder')} required value={addressDetailsValue} 
                            onChange={(e) => handleAddressDetailsChange(e)}
                            className="px-6 py-2 border placeholder:text-xs text-base"/>
                        </div>

                        <div className="flex gap-2 flex-col w-full">
                          <label htmlFor="message" className="text-neutral-800 font-medium text-base">{t('message')}</label>
                          <textarea id="message" name="Message" placeholder={t('messagePlaceholder')} minLength={4} rows={2} value={messageValue} onChange={(e) => handleMessageChange(e)}
                              className="px-6 py-3 border placeholder:text-xs text-base">
                          </textarea>
                        </div>

                        <div className="flex gap-4 w-full">
                          <div className={`p-6 rounded border-2 border-blue-500 mr-auto flex gap-2 items-center flex-1
                            ${paymentMethod === t('paymentAfter') ? "border-blue-500" : "border-neutral-300"}`}  onClick={() => handlePaymentChange(t('paymentAfter'))}>
                            <input type="radio" checked={paymentMethod === t('paymentAfter')} id="paymentAfter" value={t('paymentAfter')}/>

                            <label htmlFor="paymentAfter" className="">
                                {t('paymentAfter')}
                            </label>

                            <Image src={truckIcon} alt="" className="w-10"/>
                          </div>

                          <div className={`p-6 rounded border-2 border-blue-500 mr-auto flex gap-2 items-center flex-1
                            ${paymentMethod === t('bankTransfer') ? "border-blue-500" : "border-neutral-300"}`} onClick={() => handlePaymentChange(t('bankTransfer'))}>
                            <input type="radio" checked={paymentMethod === t('bankTransfer')} id="bankTransfer" value={t('bankTransfer')}/>

                            <label htmlFor="bankTransfer" className="">
                                {t('bankTransfer')}
                            </label>

                            <Image src={cardIcon} alt="" className="w-10"/>
                          </div>
                        </div>

                        <input type="submit" value={t('orderCart')} id="submit_button"
                        className="bg-red-600 text-neutral-100 w-fit cursor-pointer
                        font-medium text-xl px-12 py-2.5 mx-auto -md:hidden"/>
                    </form>

                    <div className="flex gap-4 flex-col">
                      <div className="bg-neutral-50 p-8 h-fit flex gap-4 flex-col">
                        <a href={`/${i18n?.language}/products`} className="flex gap-2.5 font-semibold items-center w-fit">
                          {t('products')}
                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z" className="fill-neutral-800"/>
                          </svg>                      
                        </a>

                        <div className="flex gap-4 flex-col">
                          {cartItems.map((item, index) => (
                            <div key={index} className="flex justify-between items-start w-full">
                              <div key={index} className="flex -md:gap-4 -md:flex-col -md:items-center gap-8">
                                  <div className="w-[3rem] md:w-[10rem] aspect-square flex justify-center items-center">
                                      <Image src={item.image_url} alt="wine bottle preview image" width={300} height={500} 
                                      className="object-cover w-auto h-full transition-all duration-300" loading="lazy"/>
                                  </div>
                                  <div className="flex gap-2 flex-col">
                                      <h2 className="w-[150px] md:w-[250px] -md:mx-auto text-neutral-800 font-medium text-sm 
                                      md:text-base tracking-wide -md:text-center">
                                          {item?.title_vi}
                                      </h2>

                                      <div className="w-full flex -md:gap-4 -md:flex-col md:items-center justify-between">
                                          <div className="text-neutral-600 text-sm">
                                              <input type="number" value={item.quantity} className="pl-4 pr-2 py-2 w-[3.5rem] border"
                                              onChange={(e) => {updateQuantity(item.id, parseInt(e.target.value)); updateAmount()}}/>
                                              <span className="text-neutral-700 font-semibold text-base">
                                                  {item.price && (
                                                      <span>
                                                          {" x " + numberWithCommas(item.price)}
                                                      </span>
                                                  )}
                                              </span>
                                          </div>

                                          {item.price && (
                                            <span className="font-semibold text-red-500">
                                                {numberWithCommas(item.price * item?.quantity)}đ
                                            </span>
                                          )}
                                      </div>
                                  </div>
                              </div>

                              <button onClick={() => removeCartItem(item.id)}>
                                <Image src={binIcon} alt="" className="w-8"/>
                              </button>
                            </div>
                          ))}
                        </div>

                        <button className="w-full flex items-center justify-between" onClick={() => setCouponInputVisible((prevState) => !prevState)}>
                          <span>{t('useCoupon')}</span>

                          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${couponInputVisible ? "" : "rotate-180"}`}>
                            <path d="M15.8765 8.56867C15.8374 8.6091 15.791 8.64117 15.7399 8.66305C15.6888 8.68493 15.634 8.69619 15.5786 8.69619C15.5233 8.69619 15.4685 8.68493 15.4174 8.66305C15.3663 8.64117 15.3199 8.6091 15.2807 8.56867L8.42099 1.4851V19.5652C8.42099 19.6805 8.37663 19.7911 8.29767 19.8727C8.21871 19.9542 8.11162 20 7.99995 20C7.88829 20 7.78119 19.9542 7.70223 19.8727C7.62327 19.7911 7.57891 19.6805 7.57891 19.5652V1.4851L0.719156 8.56867C0.680038 8.60907 0.633597 8.64111 0.582486 8.66297C0.531375 8.68483 0.476594 8.69609 0.421272 8.69609C0.36595 8.69609 0.311169 8.68483 0.260058 8.66297C0.208947 8.64111 0.162506 8.60907 0.123387 8.56867C0.0842687 8.52828 0.0532381 8.48032 0.0320672 8.42754C0.0108963 8.37477 0 8.3182 0 8.26107C0 8.20394 0.0108963 8.14737 0.0320672 8.0946C0.0532381 8.04182 0.0842687 7.99386 0.123387 7.95347L7.70207 0.127514C7.74117 0.0870898 7.78761 0.0550214 7.83872 0.0331417C7.88983 0.0112619 7.94462 0 7.99995 0C8.05528 0 8.11007 0.0112619 8.16119 0.0331417C8.2123 0.0550214 8.25873 0.0870898 8.29784 0.127514L15.8765 7.95347C15.9157 7.99385 15.9467 8.0418 15.9679 8.09458C15.9891 8.14736 16 8.20393 16 8.26107C16 8.31821 15.9891 8.37478 15.9679 8.42756C15.9467 8.48034 15.9157 8.52829 15.8765 8.56867Z" fill="black"/>
                          </svg>                      
                        </button>

                        <div className={`${couponInputVisible ? "" : "hidden"} flex items-center w-full`}>
                          <input type="text" value={couponValue} placeholder={t('couponPlaceholder')} onChange={(e) => setCouponValue(e.target.value)}
                          className="w-full border pl-2.5 py-4 outline-0 focus:border-blue-300"/>
                          <button className="p-4 bg-green-500 text-white border border-green-500 whitespace-nowrap" onClick={submitCoupon}>
                            {t('apply')}
                          </button>
                        </div>

                        {displayInvalidCoupon && (
                          <h4 className="text-red-500 mb-4">
                            {t('invalidCoupon')}
                          </h4>
                        )}

                        {appliedCoupon.coupon && (
                          <div className="w-full flex items-center justify-between">
                            <span className="font-semibold">{appliedCoupon.coupon}</span>
                            
                            <div className="flex gap-4">
                              <div className="px-4 py-2 bg-red-500 text-white font-semibold">
                                {t('off') + " " + appliedCoupon.discountPercentage + "%"}
                              </div>

                              <button className="" onClick={() => setAppliedCoupon({coupon: "", discountPercentage: 0})}>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z" className="fill-neutral-700"/>
                                </svg>                       
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="bg-neutral-50 p-8 h-fit flex gap-4 flex-col">
                        <div className="w-full flex items-center justify-between">
                          {t('itemsTotal')}
                          <span className="font-semibold">
                            {numberWithCommas((cartItems.map((item: ICartProduct) => (item.price || 0) * item.quantity)
                            .reduce((partialSum: number, a: number) => partialSum + a, 0)))}
                            &nbsp;
                            <span className="underline">đ</span>
                          </span>
                        </div>

                        <div className="w-full flex items-center justify-between">
                          {t('discountCheckout')}
                          <span className="font-semibold">
                              {appliedCoupon.discountPercentage}%
                          </span>
                        </div>

                        <div className="w-full flex items-center justify-between">
                          {t('shippingFee')}
                          <span className="font-semibold">
                              {shippingFee === 0 ? t('free') : shippingFee}
                          </span>
                        </div>

                        <div className="w-full flex items-center justify-between">
                          {t('finalTotal')}
                          <span className="font-semibold text-red-500">
                            {numberWithCommas((cartItems.map((item: ICartProduct) => (item.price || 0) * item.quantity)
                            .reduce((partialSum: number, a: number) => partialSum + a, 0) + shippingFee) * (100 - appliedCoupon.discountPercentage) / 100)}
                            &nbsp;
                            <span className="underline">đ</span>
                          </span>
                        </div>
                      </div>

                      <label htmlFor="submit_button"
                        className="bg-red-600 text-neutral-100 w-fit cursor-pointer
                        font-medium text-xl px-12 py-2.5 mx-auto md:hidden">
                            {t('orderCart')}
                      </label>

                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{t('orderThroughPhoneCall')}</h3>

                        <span className="text-blue-500 font-semibold">0373.522.843</span>
                      </div>
                    </div>

                    {/* pop up appears when successfully submit form */}
                    <div className={`fixed right-1/2 translate-x-1/2 px-8 py-4 z-30
                        bg-white dark:bg-semi-black transition-all duration-300 pointer-events-none 
                          ${ popUpVisible ? 'bottom-12 opacity-100' : 'opacity-0 bottom-0'} shadow-card-bold`}>
                        <h5 className="text-neutral-800 font-semibold text-base leading-none z-30">
                        {t('popUpText')} 
                        </h5>
                    </div>

                    <Widgets t={t}/>
                  </main>
                )
                : (
                  <div className="flex gap-4 items-center flex-col pt-12">
                    <div className="flex gap-2.5 items-center">
                      <h3 className="text-lg">{t('orderThroughPhoneCall')}</h3>

                      <span className="text-lg">0373.522.843</span>
                    </div>

                    <Image src={logoRed} alt="" className="w-[16rem]"/>

                    <div className="text-3xl text-center">
                      <h3>{t('noItemsInCart')}</h3>
                      <h3>{t('pleaseAddAnItem')}</h3>
                    </div>

                    <div className="flex gap-5 items-center">
                      <Link href={`/${i18n?.language}/products`} className="text-xl border border-neutral-500 hover:border-red-500 hover:text-red-500 px-8 py-2 flex gap-2 items-center">
                        <svg width="12" height="16" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-[270deg]">
                          <path className="fill-neutral-700" d="M15.8765 8.56867C15.8374 8.6091 15.791 8.64117 15.7399 8.66305C15.6888 8.68493 15.634 8.69619 15.5786 8.69619C15.5233 8.69619 15.4685 8.68493 15.4174 8.66305C15.3663 8.64117 15.3199 8.6091 15.2807 8.56867L8.42099 1.4851V19.5652C8.42099 19.6805 8.37663 19.7911 8.29767 19.8727C8.21871 19.9542 8.11162 20 7.99995 20C7.88829 20 7.78119 19.9542 7.70223 19.8727C7.62327 19.7911 7.57891 19.6805 7.57891 19.5652V1.4851L0.719156 8.56867C0.680038 8.60907 0.633597 8.64111 0.582486 8.66297C0.531375 8.68483 0.476594 8.69609 0.421272 8.69609C0.36595 8.69609 0.311169 8.68483 0.260058 8.66297C0.208947 8.64111 0.162506 8.60907 0.123387 8.56867C0.0842687 8.52828 0.0532381 8.48032 0.0320672 8.42754C0.0108963 8.37477 0 8.3182 0 8.26107C0 8.20394 0.0108963 8.14737 0.0320672 8.0946C0.0532381 8.04182 0.0842687 7.99386 0.123387 7.95347L7.70207 0.127514C7.74117 0.0870898 7.78761 0.0550214 7.83872 0.0331417C7.88983 0.0112619 7.94462 0 7.99995 0C8.05528 0 8.11007 0.0112619 8.16119 0.0331417C8.2123 0.0550214 8.25873 0.0870898 8.29784 0.127514L15.8765 7.95347C15.9157 7.99385 15.9467 8.0418 15.9679 8.09458C15.9891 8.14736 16 8.20393 16 8.26107C16 8.31821 15.9891 8.37478 15.9679 8.42756C15.9467 8.48034 15.9157 8.52829 15.8765 8.56867Z"/>
                        </svg>

                        {t('viewProducts')}
                      </Link>
                      <Link href="/" className="text-xl border border-neutral-500 hover:border-red-500 hover:text-red-500 px-8 py-2 flex gap-2 items-center">
                        <svg width="21" height="17" viewBox="0 0 21 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 17V11H12.5V17H17.5V9H20.5L10.5 0L0.5 9H3.5V17H8.5Z" fill="#000000"/>
                        </svg>                        
                        {t('backToHomepage')}
                      </Link>
                    </div>
                  </div>
                )}

                <div className="py-12">
                  <h2 className="text-center text-[#444] text-[30px] font-bold pb-[22px] mb-[25px] relative
                      before:absolute before:right-1/2 before:bottom-0 before:h-[1px] before:w-8 before:bg-red-500 before:translate-x-1/2">
                    {t('similarProducts')}
                  </h2>

                  <div className="relative w-container mx-auto grid md:grid-cols-2 xl:grid-cols-4">          
                    {relevantProducts.map((i, index) => (
                            <Link href={`/${i18n?.language}/products/${i.slug}`} key={index} 
                            className="flex gap-2.5 flex-col justify-between w-product-card min-w-[300px] snap-start min-h-[422px] -md:mx-auto
                            [&:hover>.absolute>img]:scale-[1.05] p-[15px] pb-[20px] hover:shadow-card transition-all duration-500">
                            <div className="">
                                <div className="overflow-hidden">
                                    <Image src={i.image_url} alt="curtain image" width={400} height={400} className="object-cover
                                    transition-[transform] duration-700 min-h-[300px]"/>
                                </div>
                                <h3 className="text-[#434343] mb-[5px] font-semibold">{i.title_vi.toUpperCase()}</h3>
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

                                    <div className={`${(i.price || i.price_set) ? "flex flex-col items-end" : "w-full flex justify-between items-center"}`}>
                                        <h5>
                                            {t(i.category)}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        ))}
                  </div>
                </div>
                
                {(orderData.code && !cardPaymentVisible) && (
                  <div className={`fixed right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 ${confirmVisible ? "" : "hidden"} bg-white z-[50] 
                  transition-all duration-200 flex gap-6 flex-col items-start -md:items-center rounded px-20 py-8`}>
                    <h3 className="text-2xl font-semibold text-center w-full">{t('confirmOrder')}</h3>

                    <div className="flex gap-4">
                      <div className="text-semibold flex gap-4 flex-col">
                        <span>{t('orderCode') + ": "}
                          <span className="font-bold">{orderData.code}</span>
                        </span>

                        <span>{t('fullName') + ": "}
                          <span className="font-bold">{orderData.username}</span>
                        </span>
                        
                        <span>{t('phoneNumber') + ": "}
                          <span className="font-bold">{orderData.phoneNumber}</span>
                        </span>

                        {orderData.phoneNumber2 && (
                          <span>{t('phoneNumber2') + ": " + orderData.phoneNumber2}
                            <span className="font-bold">{orderData.phoneNumber2}</span>
                          </span>
                        )}

                        <span>{t('address') + ": "}
                          <span className="font-bold">
                            {orderData.address?.details + ", " + orderData.address?.ward + ", " + orderData.address?.district + ", " + orderData.address?.city}
                          </span>
                        </span>

                        <span>{t('finalTotal') + ": "}
                          <span className="font-bold">{numberWithCommas(orderData.total) + "đ"}</span>
                        </span>

                        {orderData.note && (
                          <span>{t('message') + ": " + orderData.note}</span>
                        )}
                      </div>

                      <div className="flex gap-4 flex-col">
                        <div className="h-fit flex gap-4 flex-col">
                          <div className="flex gap-4 flex-col">
                            {cartItems.map((item, index) => (
                              <div key={index} className="flex justify-between items-start w-full">
                                <div key={index} className="flex -md:gap-4 -md:flex-col -md:items-center gap-8">
                                    <div className="w-[3rem] md:w-[10rem] aspect-square flex justify-center items-center">
                                        <Image src={item.image_url} alt="wine bottle preview image" width={300} height={500} 
                                        className="object-cover w-auto h-full transition-all duration-300" loading="lazy"/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="w-[150px] md:w-[250px] -md:mx-auto text-neutral-800 font-medium text-sm 
                                        md:text-base tracking-wide -md:text-center">
                                            {item?.title_vi}
                                        </h2>

                                        <div className="w-full flex -md:gap-4 -md:flex-col md:items-center justify-between">
                                            <div className="text-neutral-600 text-sm">
                                                <span className="px-4 py-2 w-[3.5rem] border">{item.quantity}</span>
                                                <span className="text-neutral-700 font-semibold text-base">
                                                    {item.price && (
                                                        <span>
                                                            {" x " + numberWithCommas(item.price)}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>

                                            {item.price && (
                                              <span className="font-semibold text-red-500">
                                                  {numberWithCommas(item.price * item?.quantity)}đ
                                              </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => removeCartItem(item.id)}>
                                  <Image src={binIcon} alt="" className="w-8"/>
                                </button>
                              </div>
                            ))}
                          </div>

                          {appliedCoupon.coupon && (
                            <div className="w-full flex items-center justify-between">
                              <span className="font-semibold">{appliedCoupon.coupon}</span>
                              
                              <div className="flex gap-4">
                                <div className="px-4 py-2 bg-red-500 text-white font-semibold">
                                  {t('off') + " " + appliedCoupon.discountPercentage + "%"}
                                </div>

                                <button className="" onClick={() => setAppliedCoupon({coupon: "", discountPercentage: 0})}>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z" className="fill-neutral-700"/>
                                  </svg>                       
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-neutral-50 p-8 h-fit flex gap-4 flex-col">
                          <div className="w-full flex items-center justify-between">
                            {t('itemsTotal')}
                            <span className="font-semibold">
                              {numberWithCommas((cartItems.map((item: ICartProduct) => (item.price || 0) * item.quantity)
                              .reduce((partialSum: number, a: number) => partialSum + a, 0)))}
                              &nbsp;
                              <span className="underline">đ</span>
                            </span>
                          </div>

                          <div className="w-full flex items-center justify-between">
                            {t('discountCheckout')}
                            <span className="font-semibold">
                                {appliedCoupon.discountPercentage}%
                            </span>
                          </div>

                          <div className="w-full flex items-center justify-between">
                            {t('shippingFee')}
                            <span className="font-semibold">
                                {shippingFee === 0 ? t('free') : shippingFee}
                            </span>
                          </div>

                          <div className="w-full flex items-center justify-between">
                            {t('finalTotal')}
                            <span className="font-semibold text-red-500">
                              {numberWithCommas((cartItems.map((item: ICartProduct) => (item.price || 0) * item.quantity)
                              .reduce((partialSum: number, a: number) => partialSum + a, 0) + shippingFee) * (100 - appliedCoupon.discountPercentage) / 100)}
                              &nbsp;
                              <span className="underline">đ</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-8 items-center mx-auto">
                      <button className="text-xl font-semibold text-neutral-600 px-8 py-2.5 rounded bg-gray-300" onClick={() => setConfirmVisible(false)}>{t('cancel')}</button>

                      <button onClick={handleConfirmation} className="text-xl font-semibold text-white px-8 py-2.5 rounded bg-red-500 hover:bg-red-600">
                        {orderData.paymentMethod === t("paymentAfter") ? t('confirm') : (cardPaymentVisible ? t('complete') : t('checkout'))}
                      </button>
                    </div>
                  </div>
                )}

{(orderData.code && !cardPaymentVisible) && (
                  <div className={`fixed right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 ${confirmVisible ? "" : "hidden"} bg-white z-[50] 
                  transition-all duration-200 flex gap-6 flex-col items-start -md:items-center rounded px-20 py-8`}>
                    <h3 className="text-2xl font-semibold text-center w-full">{t('confirmOrder')}</h3>

                    <div className="flex gap-4">
                      <div className="text-semibold flex gap-4 flex-col">
                        <span>{t('orderCode') + ": "}
                          <span className="font-bold">{orderData.code}</span>
                        </span>

                        <span>{t('fullName') + ": "}
                          <span className="font-bold">{orderData.username}</span>
                        </span>
                        
                        <span>{t('phoneNumber') + ": "}
                          <span className="font-bold">{orderData.phoneNumber}</span>
                        </span>

                        {orderData.phoneNumber2 && (
                          <span>{t('phoneNumber2') + ": " + orderData.phoneNumber2}
                            <span className="font-bold">{orderData.phoneNumber2}</span>
                          </span>
                        )}

                        <span>{t('address') + ": "}
                          <span className="font-bold">
                            {orderData.address?.details + ", " + orderData.address?.ward + ", " + orderData.address?.district + ", " + orderData.address?.city}
                          </span>
                        </span>

                        <span>{t('finalTotal') + ": "}
                          <span className="font-bold">{numberWithCommas(orderData.total) + "đ"}</span>
                        </span>

                        {orderData.note && (
                          <span>{t('message') + ": " + orderData.note}</span>
                        )}
                      </div>

                      <div className="flex gap-4 flex-col">
                        <div className="h-fit flex gap-4 flex-col">
                          <div className="flex gap-4 flex-col">
                            {cartItems.map((item, index) => (
                              <div key={index} className="flex justify-between items-start w-full">
                                <div key={index} className="flex -md:gap-4 -md:flex-col -md:items-center gap-8">
                                    <div className="w-[3rem] md:w-[10rem] aspect-square flex justify-center items-center">
                                        <Image src={item.image_url} alt="wine bottle preview image" width={300} height={500} 
                                        className="object-cover w-auto h-full transition-all duration-300" loading="lazy"/>
                                    </div>
                                    <div className="flex gap-2 flex-col">
                                        <h2 className="w-[150px] md:w-[250px] -md:mx-auto text-neutral-800 font-medium text-sm 
                                        md:text-base tracking-wide -md:text-center">
                                            {item?.title_vi}
                                        </h2>

                                        <div className="w-full flex -md:gap-4 -md:flex-col md:items-center justify-between">
                                            <div className="text-neutral-600 text-sm">
                                                <span className="px-4 py-2 w-[3.5rem] border">{item.quantity}</span>
                                                <span className="text-neutral-700 font-semibold text-base">
                                                    {item.price && (
                                                        <span>
                                                            {" x " + numberWithCommas(item.price)}
                                                        </span>
                                                    )}
                                                </span>
                                            </div>

                                            {item.price && (
                                              <span className="font-semibold text-red-500">
                                                  {numberWithCommas(item.price * item?.quantity)}đ
                                              </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <button onClick={() => removeCartItem(item.id)}>
                                  <Image src={binIcon} alt="" className="w-8"/>
                                </button>
                              </div>
                            ))}
                          </div>

                          {appliedCoupon.coupon && (
                            <div className="w-full flex items-center justify-between">
                              <span className="font-semibold">{appliedCoupon.coupon}</span>
                              
                              <div className="flex gap-4">
                                <div className="px-4 py-2 bg-red-500 text-white font-semibold">
                                  {t('off') + " " + appliedCoupon.discountPercentage + "%"}
                                </div>

                                <button className="" onClick={() => setAppliedCoupon({coupon: "", discountPercentage: 0})}>
                                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 20L0 18L8 10L0 2L2 0L10 8L18 0L20 2L12 10L20 18L18 20L10 12L2 20Z" className="fill-neutral-700"/>
                                  </svg>                       
                                </button>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="bg-neutral-50 p-8 h-fit flex gap-4 flex-col">
                          <div className="w-full flex items-center justify-between">
                            {t('itemsTotal')}
                            <span className="font-semibold">
                              {numberWithCommas((cartItems.map((item: ICartProduct) => (item.price || 0) * item.quantity)
                              .reduce((partialSum: number, a: number) => partialSum + a, 0)))}
                              &nbsp;
                              <span className="underline">đ</span>
                            </span>
                          </div>

                          <div className="w-full flex items-center justify-between">
                            {t('discountCheckout')}
                            <span className="font-semibold">
                                {appliedCoupon.discountPercentage}%
                            </span>
                          </div>

                          <div className="w-full flex items-center justify-between">
                            {t('shippingFee')}
                            <span className="font-semibold">
                                {shippingFee === 0 ? t('free') : shippingFee}
                            </span>
                          </div>

                          <div className="w-full flex items-center justify-between">
                            {t('finalTotal')}
                            <span className="font-semibold text-red-500">
                              {numberWithCommas((cartItems.map((item: ICartProduct) => (item.price || 0) * item.quantity)
                              .reduce((partialSum: number, a: number) => partialSum + a, 0) + shippingFee) * (100 - appliedCoupon.discountPercentage) / 100)}
                              &nbsp;
                              <span className="underline">đ</span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-8 items-center mx-auto">
                      <button className="text-xl font-semibold text-neutral-600 px-8 py-2.5 rounded bg-gray-300" onClick={() => setConfirmVisible(false)}>{t('cancel')}</button>

                      <button onClick={handleConfirmation} className="text-xl font-semibold text-white px-8 py-2.5 rounded bg-red-500 hover:bg-red-600">
                        {orderData.paymentMethod === t("paymentAfter") ? t('confirm') : (cardPaymentVisible ? t('complete') : t('checkout'))}
                      </button>
                    </div>
                  </div>
                )}

                <div className={`bg-filter-dark w-screen h-screen fixed inset-0 z-[40] ${(confirmVisible || cardPaymentVisible) ? "" : "hidden"}`}></div>


                <Footer
                    t={t}
                />

            </div>
        </div>
    )
}

export async function getStaticProps({ locale }: { locale: string}) {
    return {
      props: {
        ...(await serverSideTranslations(locale, [
          'common',
        ])),
        // Will be passed to the page component as props
      },    
    }
  }