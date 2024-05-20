// @ts-nocheck

import { TFunction, i18n } from "next-i18next"
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import supabase from "../../supabase";
import { IProduct } from "../../interface/interface";
import { Slide, SlideshowRef } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const FeaturedItems = ({ t }: { t: TFunction}) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    const responsiveSettings = [
      {
          breakpoint: 1000,
          settings: {
              slidesToShow: 4,
              slidesToScroll: 1
          }
      },
      {
          breakpoint: 500,
          settings: {
              slidesToShow: 2,
              slidesToScroll: 1
          }
      }
  ];

    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('isNew', true)
            .range(0, 11)
            .order('title_vi', { ascending: false });
          
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setProducts(data.reverse());
          }
        }
    
        fetchData();
    }, []);


    const slideRef = useRef<SlideshowRef>(null)
    
    return (
            <div className="pt-[80px] pb-[35px] w-container-large mx-auto">
                <h2 className="text-center text-[#444] text-[30px] font-bold pb-[22px] mb-[25px] relative
                before:absolute before:right-1/2 before:bottom-0 before:h-[1px] before:w-8 before:bg-red-500 before:translate-x-1/2">
                    {t('featuredProducts')}
                </h2>

                <div className="relative px-4">
                  {products.length > 0 && (
                    <Slide indicators={false} transitionDuration={500} duration={1000} autoplay={false} ref={slideRef} slidesToScroll={1} slidesToShow={1} responsive={responsiveSettings}>
                      {products.map((i, index) => (
                        <Link href={`/${i18n?.language}/products/${i.slug}`} key={index} className="overflow-visible py-4 mx-4">
                          <div className="flex gap-2.5 flex-col justify-between w-product-card min-w-[280px] snap-start min-h-[422px]
                          [&:hover>.absolute>img]:scale-[1.05] p-[15px] pb-[20px] hover:shadow-card transition-all duration-500 -md:mx-auto">
                            <div className="">
                              <div className="overflow-hidden">
                                    <Image src={i.image_url} alt="curtain image" width={400} height={300} className="object-cover
                                    transition-[transform] duration-700 min-h-[280px] pointer-events-none"/>
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

                                    <div className={`${(i.price || i.price_set) ? "flex flex-col items-end" : "w-full flex justify-between items-center"}`}>
                                        <h5>
                                            {t(i.category)}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Slide>
                  )}
                </div>
            </div>
    )
};

export default FeaturedItems;