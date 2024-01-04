import { TFunction, i18n } from "next-i18next"
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";
import { useEffect, useRef, useState } from "react";
import { IProduct } from "../../interface/interface";
import supabase from "../../supabase";
import Link from "next/link";

const TableandChair = ({ t }: { t: TFunction}) => {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('isNew', true)
            .range(0, 11);
          
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setProducts(data.reverse());
          }
        }
    
        fetchData();
    }, []);

    const sliderRef = useRef<HTMLDivElement | null>(null);

    const prevSlide = () => {
        sliderRef.current?.scrollBy({
            top: 0,
            left: -100,
            behavior: "smooth",
        });
  
    }
  
    const nextSlide = () => {
        sliderRef.current?.scrollBy({
        top: 0,
        left: 100,
        behavior: "smooth",
        });
  
    };
  
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isScrollEnd, setIsScrollEnd] = useState(false);
  
    const handleScroll = () => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        setScrollPosition(scrollLeft);
  
        const isEnd = scrollLeft + clientWidth > scrollWidth - 50;
  
        setIsScrollEnd(isEnd);
      }
    };
  
    useEffect(() => {
      if (sliderRef.current) {
        sliderRef.current.addEventListener('scroll', handleScroll);
      }
  
      const pos = sliderRef.current
  
      return () => {
        if (pos) {
          pos.removeEventListener('scroll', handleScroll);
        }
      };
    }, []);

    return (
            <div className="flex gap-10 flex-col py-6 md:py-12 w-container-large mx-auto relative">
                <FadeInOnScroll>
                <div className="pb-8 border-b border-neutral-200 flex items-start md:items-center justify-between -md:flex-col">
                    <h2 className="text-red-500 font-bold text-2xl md:text-[4rem] w-2/3 md:tracking-[0.2rem]">{t("newProducts")}</h2>
                    <div className="flex gap-4 flex-col md:items-end">
                        <Link href={`/${i18n?.language}/products?category=table-and-chair`} className="text-neutral-800 md:text-xl underline hover:text-red-500">
                            {t('viewMore')}
                        </Link>
                    </div>
                </div>
                </FadeInOnScroll>

                <div className="relative">
                    <div className="flex gap-16 items-start overflow-x-scroll snap-x scrollbar-hide
                    snap-mandatory overscroll-x-contain overflow-y-visible pr-[3rem] pt-4" ref={sliderRef}>
                        {products.map((i, index) => (
                            <Link href={`/${i18n?.language}/products/${i.slug}`} key={index} 
                            className="flex gap-2.5 flex-col w-product-card min-w-[300px] snap-start
                            [&:hover>.absolute>img]:scale-[1.05]">
                                <div className="overflow-hidden">
                                    <Image src={i.image_url} alt="curtain image" width={400} height={400} className="object-cover
                                    transition-[transform] duration-700 min-h-[300px]"/>
                                </div>
                                <div className="w-full relative z-10 text-center items-center
                                transition-[padding] duration-700">
                                    <h5 className="text-neutral-900 text-xs md:text-xl tracking-wide">{i.title_vi}</h5>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <button className={`p-3 absolute left-0 md:opacity-100 transition-opacity duration-500
                    bottom-1/2 translate-x-[-30%] xl:translate-x-[-110%] translate-y-1/2 z-10 ${scrollPosition === 0 && "hidden"}`} 
                    onClick={prevSlide}>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="rotate-180">
                        <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z"
                        className="fill-red-500"/>
                        </svg>
                    </button>
                    <button className={`p-3 absolute right-0 md:opacity-100 transition-opacity 
                    duration-500 bottom-1/2 translate-x-[30%] xl:translate-x-[110%] translate-y-1/2 z-10 ${isScrollEnd && "hidden"}`} 
                    onClick={nextSlide}>
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="">
                        <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z"
                        className="fill-red-500"/>
                        </svg>                    
                    </button>
                </div>
            </div>
    )
};

export default TableandChair;