import { useTranslation } from "next-i18next"
import type { GetStaticProps, InferGetStaticPropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Lato } from 'next/font/google'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { NextSeo } from 'next-seo';
import Widgets from "../../components/Widgets"

import News from "../../components/main/News"
import { IBanner, ICartProduct, IPost, IProduct } from "../../interface/interface"
import { client } from "../../lib/sanity"

import Banners from "../../components/main/Banners"
import FeaturedItems from "../../components/main/FeaturedItems"
import Slider from "../../components/main/Slider"
import Products from "../../components/main/Products"
import { useEffect, useRef, useState } from "react"
import { useRecoilState } from "recoil"
import { cartState } from "../../atoms/cartState"
import { latestCartItemState } from "../../atoms/latestCartItemState"
import supabase from "../../supabase"

const lato = Lato({ subsets: ['latin'], weight: ["300","400","700"] })

async function getData() {
  const query = `*[_type == "postXHH"] | order(_createdAt desc) { _id,title,image,_createdAt,overview,slug }[0...2]`;

  const data = await client.fetch(query);

  return data;
}

async function getBannerData() {
  const query = `*[_type == "bannerXHH"]`;

  const data = await client.fetch(query);

  return data;
}

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

export default function Home({ data, bannerData }: { data: IPost[], bannerData: IBanner[] }) {
  const { t } = useTranslation('common');

  const [cartItems, setCartItems] = useRecoilState(cartState);

  const [latestCartItem, setLatestCartItem] = useRecoilState(latestCartItemState);
  const [toastVisible, setToastVisible] = useState(false);

  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
      async function fetchData() {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('isNew', true)
          .range(0, 8)
          .order('title_vi', { ascending: false });
        
        if (error) {
          console.error('Error fetching data:', error);
        } else {
          setProducts(data.reverse());
        }
      }
  
      fetchData();
  }, []);

  const toastRef = useRef(null);

  const hideToast = () => {
    setToastVisible(false)
  }

  useClickDetector([toastRef], hideToast)

  const addItemToCart = (product: IProduct) => {
    if (!product.price && !product.price_set ) {
      return 
    }

    const productMainData: ICartProduct = {
      id: product.id,
      title_vi: product.title_vi + (product.price_set ? " " + product.price_set[0].size : "") + (product.color_set ? " " +  product.color_set[0].color : ""),
      title_en: product.title_en + (product.price_set ? " " + product.price_set[0].size : "") + (product.color_set ? " " + product.color_set[0].color : ""),
      category: product.category,
      image_url: product.image_url,
      slug: product.slug,
      price: product.price_set ? product.price_set[0].price : (product.price ? product.price : 0),
      quantity: 1
    }

    setLatestCartItem({...productMainData, quantity: 1});

    if (cartItems.findIndex((addedProduct) => addedProduct.title_vi === product.title_vi) === -1) {
      setCartItems((prevState: ICartProduct[]) => [...prevState, {...productMainData, quantity: 1}]);
    } else {
      setCartItems((prevState) => prevState.map(item => {
        return item.slug === product.slug ? {...item, quantity: item.quantity + 1} : {...item, quantity: 1}
      }));
    };
    
    window.dispatchEvent(new Event("storage"));

    setToastVisible(true);

  };

  return (
    <>
      <NextSeo
        title="Xuân Hoà Home - Nội thất Xuân Hoà"
        description="Xuân Hòa Home là một công ty chuyên cung cấp nội thất, hàng gia dụng dành cho giới trẻ với thiết kế thông minh, hiện đại, trẻ trung và tiện lợi."
        canonical="xhhome.vn/vi"
      />

      <div className={`${lato.className} flex flex-col overflow-hidden`}>
        <Header
          t={t}
        />

        <main className="-md:mt-8">
          <Banners t={t} banner={bannerData[0]}/>
          <FeaturedItems 
            t={t}
            addItemToCart={addItemToCart} 
            latestCartItem={latestCartItem}
            toastRef={toastRef}
            cartItems={cartItems}
            toastVisible={toastVisible}
            setToastVisible={setToastVisible}
            products={products}
          />
          <Slider sliderBanner={bannerData[0].slider}/>
          <Products 
            t={t}
            addItemToCart={addItemToCart} 
            latestCartItem={latestCartItem}
            toastRef={toastRef}
            cartItems={cartItems}
            toastVisible={toastVisible}
            setToastVisible={setToastVisible}
            products={products}
          />
          <News t={t} data={data}/>

          <Widgets t={t}/>
        </main>

        <Footer
          t={t}
        />
      </div>
    </>

  )
}

export async function getServerSideProps({ locale }: { locale: string }) {
  const data = await getData() as IPost[];

  const bannerData = await getBannerData() as IBanner[];

  return {
    props: {
      data: data,
      bannerData: bannerData,
      ...(await serverSideTranslations(locale, [
          'common',
      ]))
    }, // will be passed to the page component as props
  };
}


