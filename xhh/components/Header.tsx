import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { bagIcon2, logoTextRed, phoneIcon, ukFlag, vietnamFlag } from "../public/assets";
import Link from "next/link";

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

const lngs = new Map([
    ['vi', { nativeLanguage: 'Tiếng Việt', flag: vietnamFlag }],
    ['en', { nativeLanguage: 'English', flag: ukFlag }],
]);


const Header = ({ t }: { t: TFunction }) => {
    const [sidenavOpened, setSidenavOpened] = useState(false);
    const sideNavRef = useRef(null);
    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);
    
    const hideSideNav = () => {
        setSidenavOpened(false)
    };

    useClickDetector([sideNavRef, menuButtonRef, closeButtonRef], hideSideNav);

    const [mobileNavOpened, setMobileNavOpened] = useState(false);
    const mobileNavRef = useRef(null);
    const mobileMenuButtonRef = useRef(null);
    const mobileCloseButtonRef = useRef(null);
    
    const hideMobileNav = () => {
        setMobileNavOpened(false)
    };

    useClickDetector([mobileNavRef, mobileMenuButtonRef, mobileCloseButtonRef], hideMobileNav);

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

    return (
        <div className={`relative z-20 bg-black`}>
            <>
                <header className={`z-[40] flex items-center bg-scroll bg-repeat px-8 transition-all duration-500
                ${scrollPosition > 0 ? "md:fixed md:w-full bg-[#eee] shadow-light" : "bg-white relative"}`}>
                    {/* top nav */}
                    <nav className=" relative z-20 md:px-8 md:ml-[33%] md:w-1/3 flex justify-center">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="h-full">
                                <Image src={logoTextRed} alt="" 
                                className={`w-[10rem] transtion-all duration-500 ${scrollPosition > 0 ? "py-2 -md:py-[12px]" : "-md:py-[12px] py-[38px]"}`} 
                                loading="lazy"/>
                            </Link>
                        </div>
                    </nav>

                    <div className=" -xl:hidden ml-auto pr-[15px] flex gap-8 items-center">
                        <Link href={`/${i18n?.language}/cart`} className="flex flex-col items-center">
                            <Image src={bagIcon2} alt="" className="w-6 pt-2"/>
                            <h6>{t('cart')}</h6>
                        </Link>

                        <div className="">
                            <div className="pl-[70px] flex gap-2">
                                {Array.from(lngs.keys()).map((lng: string) => (
                                <button type="submit" key={lng} onClick={() => { i18n?.changeLanguage(lng) }} disabled={i18n?.resolvedLanguage === lng}
                                    className={`${(i18n?.language === lng || i18n?.language.slice(0,2).toLowerCase() === lng) ? 'text-red-500' : 'text-[#666]'} 
                                    font-normal block text-xs leading-[25px] hover:text-red-500`}>
                                    {lngs.get(lng)?.nativeLanguage}
                                </button>
                                ))}
                            </div>

                            <div className="flex gap-4 items-center justify-center">
                                <Image src={phoneIcon} alt="phone icon" />
                                <div className="flex flex-col text-neutral-900 font-bold text-xl">
                                    <a target="_blank" href="https://zalo.me/0373522843">0373-522-843</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="md:hidden bg-red-500 w-full text-white relative">
                    <div className="px-8 flex justify-between items-center">
                        <h3>Menu</h3>

                        <button className={`p-[15px] transition-all duration-500`} ref={mobileNavRef}
                        onClick={() => setMobileNavOpened(prevState => !prevState)}>
                            <div className="inline-block h-[15px] w-[21px] relative">
                                <div className={`w-full h-[3px] bg-white absolute block top-0 mt-[-2px] transition-all duration-200
                                ${sidenavOpened ? 'translate-x-[-100%] opacity-0' : ''}`}></div>
                                <div className={`w-full h-[3px] bg-white absolute block top-1/2 mt-[-2px] transition-all duration-200
                                ${sidenavOpened ? 'opacity-0' : ''}`}></div>
                                <div className={`w-full h-[3px] bg-white absolute block bottom-0 mt-[-2px] transition-all duration-200
                                ${sidenavOpened ? 'translate-x-[100%] opacity-0' : ''}`}></div>

                                <div className={`w-full h-[3px] bg-white absolute block transition-all 
                                duration-[500ms] right-1/2 bottom-1/2
                                ${sidenavOpened ? 'translate-x-1/2 translate-y-1/2' : 'translate-x-[100%] translate-y-[400%] opacity-0'} rotate-45`}></div>
                                <div className={`w-full h-[3px] bg-white absolute block transition-all 
                                duration-[500ms] right-1/2 bottom-1/2
                                ${sidenavOpened ? 'translate-x-1/2 translate-y-1/2' : 'translate-x--1/2 translate-y-[400%] opacity-0'} rotate-[315deg]`}></div>
                            </div>
                        </button>
                    </div>

                    <div className={`${mobileNavOpened ? 'max-h-[900px] animate-hide-scroll ' : 'max-h-0 overflow-hidden'} transition-all duration-500
                        flex flex-col w-full absolute left-0 bottom-0 translate-y-[100%] z-[1] overflow-y-auto scrollbar-hide bg-red-700`} ref={sideNavRef}>
                        <div className="flex flex-col relative z-10">
                            <ul className="">
                                <li className="w-full">
                                    <Link href="/" className="text-white text-[14px] leading-[45px] font-bold relative z-10 w-full pl-[32px]
                                    before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                                    hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                                    onClick={() => setSidenavOpened(false)}>
                                        {t('home')}
                                    </Link>
                                </li>

                                <li className="[&:hover>.categories]:flex">
                                    <Link href={`/${i18n?.language}/products`} className="text-white w-full font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[32px]
                                    before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block
                                    hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300
                                    transition-all [&:hover~.categories]:pointer-events-auto" 
                                    onClick={() => setSidenavOpened(false)}>
                                        {t('products').toUpperCase()}
                                    </Link>

                                    <div className={`absolute right-0 top-0 h-full w-[300px] bg-white translate-x-[100%] pt-[172px] gap-4 flex-col pl-10
                                    border-l border-red-500 ${sidenavOpened ? '' : ''} hidden categories`}>
                                        <Link href="/" className="text-white font-bold hover:text-red-500 transition-all">
                                            {t('table-and-chair')}                                    
                                        </Link>
                                        <Link href="/" className="text-white font-semibold hover:text-red-500 transition-all">
                                            {t('single-table')}                                    
                                        </Link>
                                        <Link href="/" className="text-white font-semibold hover:text-red-500 transition-all">
                                            {t('single-chair')}                                    
                                        </Link>
                                        <Link href="/" className="text-white font-bold hover:text-red-500 transition-all">
                                            {t('shelf')}                                    
                                        </Link>
                                    </div>
                                </li>
                                
                                <li className="w-full">
                                    <Link href={`/${i18n?.language}/about`} className="text-white font-bold text-[14px] leading-[45px] relative z-10 w-full h-full pl-[32px]
                                    before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                                    hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                                    onClick={() => setSidenavOpened(false)}>
                                        <span className="relative z-10">
                                            {t('about').toUpperCase()}
                                        </span>
                                    </Link>
                                </li>

                                <li className="w-full">
                                    <Link href={`/${i18n?.language}/contact`} className="text-white font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[32px]
                                    before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                                    hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                                    onClick={() => setSidenavOpened(false)}>
                                        <span className="relative z-10">
                                            {t('contact').toUpperCase()}
                                        </span>
                                    </Link>
                                </li>

                                <li className="w-full">
                                    <Link href={`/${i18n?.language}/news`} className="text-white font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[32px]
                                    before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                                    hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                                    onClick={() => setSidenavOpened(false)}>
                                        <span className="relative z-10">
                                            {t('news').toUpperCase()}
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <button className={`-md:hidden p-[15px] fixed left-[25px] z-[999999] transition-all duration-500 
                ${scrollPosition > 0 ? 'top-[12px]' : 'top-[42px]'}`} ref={menuButtonRef}
                onClick={() => setSidenavOpened(prevState => !prevState)}>
                    <div className="inline-block h-[15px] w-[21px] relative [&:hover>div]:bg-[#777]">
                        <div className={`w-full h-[3px] bg-[#333] absolute block top-0 mt-[-2px] transition-all duration-200
                        ${sidenavOpened ? 'translate-x-[-100%] opacity-0' : ''}`}></div>
                        <div className={`w-full h-[3px] bg-[#333] absolute block bottom-1/2 mt-[-2px] transition-all duration-200
                        ${sidenavOpened ? 'opacity-0' : ''}`}></div>
                        <div className={`w-full h-[3px] bg-[#333] absolute block bottom-0 mt-[-2px] transition-all duration-200
                        ${sidenavOpened ? 'translate-x-[100%] opacity-0' : ''}`}></div>

                        <div className={`w-full h-[3px] bg-[#333] absolute block transition-all 
                        duration-[500ms] right-1/2 bottom-1/2
                        ${sidenavOpened ? 'translate-x-1/2 translate-y-1/2' : 'translate-x-[100%] translate-y-[400%] opacity-0'} rotate-45`}></div>
                        <div className={`w-full h-[3px] bg-[#333] absolute block transition-all 
                        duration-[500ms] right-1/2 bottom-1/2
                        ${sidenavOpened ? 'translate-x-1/2 translate-y-1/2' : 'translate-x--1/2 translate-y-[400%] opacity-0'} rotate-[315deg]`}></div>
                    </div>
                </button>
            </>

            <div className={`w-[225px] h-screen min-h-full fixed left-0 top-0 bg-white z-[1000] 
                ${sidenavOpened ? 'translate-x-0' : 'translate-x-[-100%]'} transition-all duration-300
                flex flex-col pt-[162px]`} ref={sideNavRef}>
                <div className="flex flex-col">
                    <ul className="">
                        <li className="w-full">
                            <Link href="/" className="text-[#666] text-[14px] leading-[45px] font-bold relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                {t('home')}
                            </Link>
                        </li>

                        <li className="[&:hover>.categories]:flex">
                            <Link href={`/${i18n?.language}/products`} className="text-[#666] w-full font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300
                            transition-all [&:hover~.categories]:pointer-events-auto" 
                            onClick={() => setSidenavOpened(false)}>
                                {t('products').toUpperCase()}
                            </Link>

                            <div className={`absolute right-0 top-0 h-full w-[300px] bg-white translate-x-[100%] pt-[172px] flex-col pl-10
                            border-l border-red-500 ${sidenavOpened ? '' : ''} hidden categories`}>
                                <Link href={`/${i18n?.language}/products?category=table-and-chair`} className="text-[#666] font-bold hover:text-red-500 transition-all mb-2 text-xl">
                                    {t('table-and-chair')}                                    
                                </Link>

                                <div className="flex flex-col gap-2 mb-4">
                                    <Link href={`/${i18n?.language}/products?category=table-and-chair`} className="text-neutral-700 hover:text-red-500 transition-all">
                                        {t('tableChairSet')}                                    
                                    </Link>

                                    <Link href={`/${i18n?.language}/products?category=single-table`} className="text-neutral-700 hover:text-red-500 transition-all">
                                        {t('single-table')}                                    
                                    </Link>

                                    <Link href={`/${i18n?.language}/products?category=single-chair`} className="text-neutral-700 hover:text-red-500 transition-all">
                                        {t('single-chair')}                                    
                                    </Link>
                                </div>

                                <Link href="/" className="text-[#666] font-bold hover:text-red-500 transition-all">
                                    {t('shelf')}                                    
                                </Link>
                            </div>
                        </li>
                        
                        <li className="w-full">
                            <Link href={`/${i18n?.language}/about`} className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full h-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('about').toUpperCase()}
                                </span>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Link href={`/${i18n?.language}/contact`} className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('contact').toUpperCase()}
                                </span>
                            </Link>
                        </li>

                        <li className="w-full">
                            <Link href={`/${i18n?.language}/news`} className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-[-1] block transition-all
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('news').toUpperCase()}
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    )
};

export default Header;