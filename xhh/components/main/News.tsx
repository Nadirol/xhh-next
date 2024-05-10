import { TFunction } from "i18next";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IPost } from "../../interface/interface";

import { IdealImage } from "../SanityImage";

const News = ({ t, data }: { t: TFunction, data: IPost[] }) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

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
        <div className="w-container-large mx-auto relative [&:hover>button]:opacity-100 mb-10">
          <div className="space-y-2 pt-6 pb-8 md:space-y-5">
            <h2 className="text-center text-[#444] text-[30px] font-bold pb-[22px] mb-[25px] relative
                before:absolute before:right-1/2 before:bottom-0 before:h-[1px] before:w-8 before:bg-red-500 before:translate-x-1/2">
              {t('news')}
            </h2>
          </div>
    
          <div className="flex gap-8 -md:flex-col items-start overflow-x-scroll snap-x scrollbar-hide
            snap-mandatory overscroll-x-contain overflow-y-visible py-4" ref={sliderRef}> 
            {data.map((post) => (
              <div key={post._id} className="md:w-1/2 snap-start">
                <article className="">
                  <div
                    className="flex gap-4"
                  >
                    <div className="flex-1 text-[#c87065] flex flex-col gap-3">
                      <div className="flex gap-2.5">
                        <span className="w-10 min-w-[40px] h-10 border border-[#c87065] flex items-center justify-center font-bold">
                          {new Date(post._createdAt).getDate()}
                        </span>

                        <div className="font-bold">
                          <span>
                            {new Date(post._createdAt).toLocaleString('default', { month: 'long' })}, {new Date(post._createdAt).getFullYear()}
                          </span>

                          <h3 className="text-neutral-700">
                            {post.title}
                          </h3>
                        </div>
                      </div>

                      <p className="max-w-none text-gray-500 line-clamp-4">
                        {post.overview}
                      </p>

                      <Link
                        href={`/news/${post.slug.current}`}
                        className="mt-auto"
                      >
                        {t('readMore')}
                      </Link>
                    </div>

                    <div className="flex-1">
                      <IdealImage image={post.image}/>
                    </div>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      );
};

export default News;

