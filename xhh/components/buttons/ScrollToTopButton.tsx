import Image from "next/image";
import { useEffect, useState } from "react";
import { arrowRightIcon, arrowUpIcon } from "../../public/assets";

const ScrollToTopButton = () => {
    const isBrowser = () => typeof window !== 'undefined'; //The approach recommended by Next.js

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
    };

    function scrollToTop() {
        if (!isBrowser()) return;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <button className={`p-3 md:p-4 shadow-card-bold transition-all duration-1000 
        rounded-[50%] aspect-square bg-white shadow-bold
        ${scrollPosition < 50 ? "translate-y-[-30%] opacity-0" : "opacity-100 translate-y-0"}`} onClick={scrollToTop}>
          {/* <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z" fill="white"/>
          </svg> */}
                <Image src={arrowUpIcon} alt="arrow right icon" className="w-3 md:w-4 aspect-square m-auto"/>
        </button>
    )
};

export default ScrollToTopButton;