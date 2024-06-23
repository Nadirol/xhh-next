
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
import { QRCode, binIcon, cardIcon, logoRed, shopBackground, truckIcon } from "../../../public/assets";
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
      const fetchData = async () => {
        try {
          const response = await axios.get("https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json");
          const data = response.data;
    
          renderCity(data);
    
          setCityData(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      fetchData();
    
      const renderCity = (data: City[]): void => {
        const citis = document.getElementById("city") as HTMLSelectElement | null;
        const districts = document.getElementById("district") as HTMLSelectElement | null;
        const wards = document.getElementById("ward") as HTMLSelectElement | null;
    
        if (citis && districts && wards) {
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
              const dataWards = dataCity[0].Districts.filter((n) => n.Id === this.value)[0].Wards;
              for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name, w.Id);
              }
            }
          };
        }
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
    }

    return (
        <div>
            <NextSeo
                title="Giỏ Hàng - Xuân Hoà Home"
                noindex
            />

            <div className="">test</div>
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