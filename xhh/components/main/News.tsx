import { TFunction } from "i18next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IPost } from "../../interface/interface";
import { arrowRightIcon } from "../../public/assets";
import { urlFor } from "../../lib/sanity";
import { IdealImage } from "../SanityImage";

const News = ({ t, data }: { t: TFunction, data: IPost[] }) => {
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
        <div className="w-container mx-auto divide-y divide-gray-200 relative [&:hover>button]:opacity-100 mb-10">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-primary-dark sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              {t('news')}
            </h1>
          </div>
    
          <div className="flex gap-16 items-start overflow-x-scroll snap-x scrollbar-hide
            snap-mandatory overscroll-x-contain overflow-y-visible pr-[3rem] pt-4" ref={sliderRef}> 
            {data.map((post) => (
              <div key={post._id} className="w-post min-w-[300px] snap-start">
                <article className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0">
                  <Link
                    href={`/news/${post.slug.current}`}
                    className="space-y-3 xl:col-span-4"
                  >
                    <IdealImage image={post.image}/>
                    <div>
                      <h3 className="text-2xl font-bold leading-8 tracking-tight text-gray-900">
                        {post.title}
                      </h3>
                    </div>

                    <p className="text-base font-medium leading-6 text-primary-medium">
                      {new Date(post._createdAt).toISOString().split("T")[0]}
                    </p>

                    <p className="prose max-w-none text-gray-500 line-clamp-4">
                      {post.overview}
                    </p>
                  </Link>
                </article>
              </div>
            ))}
          </div>

          <button className={`p-3 absolute bg-primary-dark rounded-[100%] left-0 md:opacity-20 transition-opacity duration-500
          bottom-1/2 translate-x-[-30%] xl:translate-x-[-110%] translate-y-1/2 z-10 ${scrollPosition === 0 && "hidden"}`} 
          onClick={prevSlide}>
              <Image src={arrowRightIcon} alt="arrow icon" className="rotate-180 w-2 md:w-4"/>
          </button>
          <button className={`p-3 absolute bg-primary-dark rounded-[100%] right-0 md:opacity-20 transition-opacity 
          duration-500 bottom-1/2 translate-x-[30%] xl:translate-x-[110%] translate-y-1/2 z-10 ${isScrollEnd && "hidden"}`} 
          onClick={nextSlide}>
              <Image src={arrowRightIcon} alt="arrow icon" className="w-2 md:w-4"/>
          </button>
        </div>
      );
};

export default News;

