import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { aboutIcon, closeIcon, homeIcon, logoTextWhite, logoTextRed, mediaIcon, menuIcon, phoneIcon, sliderImage1, sliderImage2, sliderImage3, ukFlag, vietnamFlag, arrowRightIcon } from "../public/assets";
import SliderImage from "./header/SliderImage";
import Link from "next/link";
import { useRouter } from "next/router";

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
    ['en', { nativeLanguage: 'English', flag: ukFlag }],
    ['vi', { nativeLanguage: 'Tiếng Việt', flag: vietnamFlag }],
]);

const sliderImages = [sliderImage1, sliderImage2, sliderImage3];

const categories = ["table-and-chair","shelf","wooden-tile"]

const Header = ({ t }: { t: TFunction }) => {

    const sliderText = [
        t('slogan1'),
        t('slogan2'),
        t('slogan3'),

    ]

    const [sidenavOpened, setSidenavOpened] = useState(false);
    const sideNavRef = useRef(null);
    const menuButtonRef = useRef(null);
    const closeButtonRef = useRef(null);

    const openSideNav = () => {
        console.log('working')
        setSidenavOpened(true)
    };

    console.log(sidenavOpened)
    
    const hideSideNav = () => {
        setSidenavOpened(false)
    };

    useClickDetector([sideNavRef, menuButtonRef, closeButtonRef], hideSideNav);

    const [activeSlide, setActiveSlide] = useState(1);

    useEffect(() => {
      const interval = setInterval(() => {
        setActiveSlide(prevSlide => {
          return prevSlide + 1 > sliderImages.length - 1 ? 0 : prevSlide + 1
        })
      }, 10000);

      return () => clearInterval(interval)
    },[]);

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

    const router = useRouter();

    const [lngDropdownOpened, setLngDropdownOpened] = useState(false);
    const dropdownRef = useRef(null);
    const languageButtonRef = useRef(null);

    const hideDropdown = () => {
      setLngDropdownOpened(false);
    }

    const dropdownStickyRef = useRef(null);
    const languageButtonStickyRef = useRef(null);

    useClickDetector([languageButtonRef, dropdownRef, languageButtonStickyRef, dropdownStickyRef], hideDropdown);

    return (
        <div className={`relative z-20 bg-black`}>
            {(router.pathname === "/" || router.pathname === `/${i18n?.language}`) 
            ? (
                <>
                    <header className={`z-[999] flex items-center bg-scroll bg-repeat px-8 transition-all duration-500
                    ${scrollPosition > 0 ? "fixed w-full bg-[#eee] shadow-light" : "bg-white relative"}`}>
                        {/* top nav */}
                        <nav className=" relative z-20 px-8 ml-[33%] w-1/3 flex justify-center">
                            <div className="flex items-center justify-between">
                                <Link href="/" className="h-full">
                                    <Image src={logoTextRed} alt="" 
                                    className={`w-[10rem] transtion-all duration-500 ${scrollPosition > 0 ? "py-2" : "py-[38px]"}`} 
                                    loading="lazy"/>
                                </Link>
                            </div>
                        </nav>

                        <div className="flex gap-4 items-center justify-center -xl:hidden ml-auto pr-[15px]">
                            <Image src={phoneIcon} alt="phone icon" />
                            <div className="flex flex-col text-neutral-900 font-medium text-xl">
                                <a target="_blank" href="https://zalo.me/0373522843">0373-522-843</a>
                            </div>
                        </div>
                    </header>

                    <button className={`p-[15px] fixed left-[25px] z-[999999] transition-all duration-500 
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

                    {/* sticky nav */}
                    {/* <div className={`hidden fixed bg-white z-30 transition-[top] top-0 left-0 w-full shadow-lg
                    ${scrollPosition > 100 ? "top-0" : "top-[-120px]"}`}>
                        <nav className={`w-container-large mx-auto flex items-center justify-between`}>
                            <Link href="/" className="p-4 h-full">
                                <Image src={logoTextRed} alt="" className="w-[3rem] xl:w-[6rem]" loading="lazy"/>
                            </Link>

                            <div className="flex">
                                <div className="flex gap-12 items-center text-neutral-800 xl:pr-8">

                                    <ul className="hidden xl:flex font-medium h-full">
                                            <Link href="/" className="[&:hover>li>h4]:text-neutral-50">
                                                <li className="inline-block relative py-6 px-3 after:absolute after:inset-0 h-full
                                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                    <h4 className="relative z-10 transition-colors duration-300">{t('home')}</h4>
                                                </li>
                                            </Link>
                                            <Link href={`/${i18n?.language}/products`} className="[&:hover>li>h4]:text-neutral-50">
                                                <li className="relative py-6 px-3 after:absolute after:inset-0 h-full [&:hover>.grid]:h-[12rem]
                                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                    <h4 className="relative z-10 transition-colors">{t('products').toUpperCase()}</h4>

                                                    <div className={`grid h-0 min-w-[12rem] transition-[height] duration-300 absolute
                                                    z-30 bottom-0 left-0 translate-y-[100%] overflow-hidden`}>
                                                        {categories.map((ctg: string) => (
                                                        <Link href={`/${i18n?.language}/products?category=${ctg}`} key={ctg} 
                                                        className={`text-neutral-50 font-normal hover:text-neutral-50 pl-4 pr-8 py-3 bg-red-500
                                                        hover:bg-red-800 flex justify-between items-center`}>
                                                            {t(ctg)}
                                                            <Image src={arrowRightIcon} alt="arrow right icon" />
                                                        </Link>
                                                        ))}
                                                    </div>                                            
                                                </li>
                                            </Link>
                                            <Link href={`/${i18n?.language}/about`} className="[&:hover>li>h4]:text-neutral-50">
                                                <li className="inline-block relative py-6 px-3 after:absolute after:inset-0 h-full
                                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                    <h4 className="relative z-10 transition-colors duration-300">{t('about')}</h4>
                                                </li>
                                            </Link>
                                            <Link href={`/${i18n?.language}/contact`} className="[&:hover>li>h4]:text-neutral-50">
                                                <li className="inline-block relative py-6 px-3 after:absolute after:inset-0 h-full
                                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                    <h4 className="relative z-10 transition-colors duration-300">{t('contact')}</h4>
                                                </li>
                                            </Link>
                                    </ul>
                                    <div className="flex gap-8 items-center justify-end -xl:ml-auto">
                                        <div className="relative py-6 px-4 after:absolute after:inset-0
                                        after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-100%] 
                                        [&:hover]:after:translate-y-0 after:transition-all after:duration-75 nav-link-background 
                                        [&:hover>.grid]:h-full [&:hover>.flex>h4]:text-neutral-100">
                                            <div className="flex gap-2 xl:gap-4 items-center cursor-pointer relative z-10" ref={languageButtonStickyRef}
                                            onClick={() => setLngDropdownOpened(true)}>
                                                <h4 className="text-neutral-800 font-medium text-xs 
                                                md:text-base leading-5 transition-colors duration-300">
                                                    {i18n?.language.toUpperCase()}
                                                </h4>
                                                <Image src={lngs.get(i18n?.language || "en")?.flag || ukFlag} 
                                                alt="language image" width={38} height={21}/>
                                            </div>
                                            <div className={`grid h-0 min-w-[10rem] ${(lngDropdownOpened && scrollPosition > 100) ? "-xl:h-full" : ""}
                                            transition-[height] duration-300 absolute z-30 bottom-0 right-0 
                                            translate-y-[100%] overflow-hidden`} ref={dropdownStickyRef}>
                                                {Array.from(lngs.keys()).map((lng: string) => (
                                                <button type="submit" key={lng} onClick={() => { i18n?.changeLanguage(lng) }} disabled={i18n?.resolvedLanguage === lng}
                                                    className={`${(i18n?.language === lng || i18n?.language.slice(0,2).toLowerCase() === lng) ? 'text-neutral-50' : 'text-neutral-300'} 
                                                    font-normal hover:text-neutral-50 px-8 py-2 min-h-[2rem] bg-red-500`}>
                                                    {lngs.get(lng)?.nativeLanguage}
                                                </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => setSidenavOpened(prevState => !prevState)} 
                                        className="xl:hidden">
                                            <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.83334 22C1.31389 22 0.878173 21.824 0.526173 21.472C0.174173 21.12 -0.00121588 20.6849 6.34372e-06 20.1667C6.34372e-06 19.6472 0.176006 19.2115 0.528006 18.8595C0.880006 18.5075 1.31512 18.3321 1.83334 18.3333H31.1667C31.6861 18.3333 32.1218 18.5093 32.4738 18.8613C32.8258 19.2133 33.0012 19.6484 33 20.1667C33 20.6861 32.824 21.1218 32.472 21.4738C32.12 21.8258 31.6849 22.0012 31.1667 22H1.83334ZM1.83334 12.8333C1.31389 12.8333 0.878173 12.6573 0.526173 12.3053C0.174173 11.9533 -0.00121588 11.5182 6.34372e-06 11C6.34372e-06 10.4806 0.176006 10.0448 0.528006 9.69283C0.880006 9.34083 1.31512 9.16545 1.83334 9.16667H31.1667C31.6861 9.16667 32.1218 9.34267 32.4738 9.69467C32.8258 10.0467 33.0012 10.4818 33 11C33 11.5194 32.824 11.9552 32.472 12.3072C32.12 12.6592 31.6849 12.8346 31.1667 12.8333H1.83334ZM1.83334 3.66667C1.31389 3.66667 0.878173 3.49067 0.526173 3.13867C0.174173 2.78667 -0.00121588 2.35156 6.34372e-06 1.83334C6.34372e-06 1.31389 0.176006 0.878173 0.528006 0.526173C0.880006 0.174173 1.31512 -0.00121588 1.83334 6.3437e-06H31.1667C31.6861 6.3437e-06 32.1218 0.176006 32.4738 0.528006C32.8258 0.880006 33.0012 1.31512 33 1.83334C33 2.35278 32.824 2.7885 32.472 3.1405C32.12 3.4925 31.6849 3.66789 31.1667 3.66667H1.83334Z" fill="#171717"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center justify-center -xl:hidden px-4">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5 14.42V17.956C18.5001 18.2092 18.4042 18.453 18.2316 18.6382C18.059 18.8234 17.8226 18.9363 17.57 18.954C17.133 18.984 16.776 19 16.5 19C7.663 19 0.5 11.837 0.5 3C0.5 2.724 0.515 2.367 0.546 1.93C0.563722 1.67744 0.676581 1.44101 0.861804 1.26841C1.04703 1.09581 1.29082 0.999886 1.544 1H5.08C5.20404 0.999875 5.3237 1.04586 5.41573 1.12902C5.50776 1.21218 5.5656 1.32658 5.578 1.45C5.601 1.68 5.622 1.863 5.642 2.002C5.84073 3.38892 6.248 4.73783 6.85 6.003C6.945 6.203 6.883 6.442 6.703 6.57L4.545 8.112C5.86445 11.1865 8.31455 13.6365 11.389 14.956L12.929 12.802C12.9919 12.714 13.0838 12.6509 13.1885 12.6237C13.2932 12.5964 13.4042 12.6068 13.502 12.653C14.767 13.2539 16.1156 13.6602 17.502 13.858C17.641 13.878 17.824 13.899 18.052 13.922C18.1752 13.9346 18.2894 13.9926 18.3724 14.0846C18.4553 14.1766 18.5002 14.2961 18.5 14.42Z" 
                                    className="stroke-neutral-800"/>
                                    </svg>
                                    <div className="flex flex-col text-red-500 text-xl font-medium">
                                        <a target="_blank" href="https://zalo.me/0373522843">0373-522-843</a>
                                    </div>
                                </div>
                            </div>

                        </nav>
                    </div> */}
                </>
            )
            : (
                <header className="relative z-10">
                    {/* top nav */}
                    <div className={`fixed bg-white z-30 transition-[top] top-0 left-0 w-full shadow-lg`}>
                        <nav className={`w-container-large mx-auto flex items-center justify-between`}>
                            <Link href="/" className="p-4 h-full">
                                <Image src={logoTextRed} alt="" className="w-[3rem] xl:w-[6rem]" loading="lazy"/>
                            </Link>

                            <div className="flex">
                                <div className="flex gap-12 items-center text-neutral-800 xl:pr-8">
                                    <ul className="hidden xl:flex font-medium h-full">
                                        <Link href="/" className="[&:hover>li>h4]:text-neutral-50">
                                            <li className="inline-block relative py-6 px-3 after:absolute after:inset-0 h-full
                                            after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                            [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                <h4 className="relative z-10 transition-colors duration-300">{t('home')}</h4>
                                            </li>
                                        </Link>
                                        <Link href={`/${i18n?.language}/products`} className="[&:hover>li>h4]:text-neutral-50">
                                                <li className="relative py-6 px-3 after:absolute after:inset-0 h-full [&:hover>.grid]:h-[12rem]
                                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                    <h4 className="relative z-10 transition-colors">{t('products').toUpperCase()}</h4>

                                                    <div className={`grid h-0 min-w-[12rem] transition-[height] duration-300 absolute
                                                    z-30 bottom-0 left-0 translate-y-[100%] overflow-hidden`}>
                                                        {categories.map((ctg: string) => (
                                                        <Link href={`/${i18n?.language}/products?category=${ctg}`} key={ctg} 
                                                        className={`text-neutral-50 font-normal hover:text-neutral-50 pl-4 pr-8 py-3 bg-red-500
                                                        hover:bg-red-800 flex justify-between items-center`}>
                                                            {t(ctg)}
                                                            <Image src={arrowRightIcon} alt="arrow right icon" />
                                                        </Link>
                                                        ))}
                                                    </div>                                            
                                                </li>
                                            </Link>
                                        <Link href={`/${i18n?.language}/about`} className="[&:hover>li>h4]:text-neutral-50">
                                            <li className="inline-block relative py-6 px-3 after:absolute after:inset-0 h-full
                                            after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                            [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                <h4 className="relative z-10 transition-colors duration-300">{t('about')}</h4>
                                            </li>
                                        </Link>
                                        <Link href={`/${i18n?.language}/contact`} className="[&:hover>li>h4]:text-neutral-50">
                                            <li className="inline-block relative py-6 px-3 after:absolute after:inset-0 h-full
                                            after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                            [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                                <h4 className="relative z-10 transition-colors duration-300">{t('contact')}</h4>
                                            </li>
                                        </Link>
                                    </ul>

                                    <div className="flex gap-8 items-center justify-end -xl:ml-auto">
                                        <div className="relative py-6 px-4 after:absolute after:inset-0
                                        after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-100%] 
                                        [&:hover]:after:translate-y-0 after:transition-all after:duration-75 nav-link-background 
                                        [&:hover>.grid]:h-full [&:hover>.flex>h4]:text-neutral-100">
                                            <div className="flex gap-2 xl:gap-4 items-center cursor-pointer relative z-10" ref={languageButtonRef} onClick={() => setLngDropdownOpened(true)}>
                                                <h4 className="text-neutral-800 font-medium text-xs md:text-base leading-5 transition-colors duration-300">
                                                    {i18n?.language.toUpperCase()}
                                                </h4>
                                                <Image src={lngs.get(i18n?.language || "en")?.flag || ukFlag} 
                                                alt="language image" width={38} height={21}/>
                                            </div>
                                            <div className={`grid h-0 min-w-[10rem] ${lngDropdownOpened ? "-xl:h-full" : ""}
                                            transition-[height] duration-300 absolute z-30 bottom-0 right-0 
                                            translate-y-[100%] overflow-hidden`} ref={dropdownRef}>
                                                {Array.from(lngs.keys()).map((lng: string) => (
                                                <button type="submit" key={lng} onClick={() => { i18n?.changeLanguage(lng) }} disabled={i18n?.resolvedLanguage === lng}
                                                    className={`${(i18n?.language === lng || i18n?.language.slice(0,2).toLowerCase() === lng) ? 'text-neutral-50' : 'text-neutral-300'} 
                                                    font-normal hover:text-neutral-50 px-8 py-2 min-h-[2rem] bg-red-500`}>
                                                    {lngs.get(lng)?.nativeLanguage}
                                                </button>
                                                ))}
                                            </div>
                                        </div>
                                        <button onClick={() => setSidenavOpened(prevState => !prevState)} 
                                        className="xl:hidden">
                                            <svg width="33" height="22" viewBox="0 0 33 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M1.83334 22C1.31389 22 0.878173 21.824 0.526173 21.472C0.174173 21.12 -0.00121588 20.6849 6.34372e-06 20.1667C6.34372e-06 19.6472 0.176006 19.2115 0.528006 18.8595C0.880006 18.5075 1.31512 18.3321 1.83334 18.3333H31.1667C31.6861 18.3333 32.1218 18.5093 32.4738 18.8613C32.8258 19.2133 33.0012 19.6484 33 20.1667C33 20.6861 32.824 21.1218 32.472 21.4738C32.12 21.8258 31.6849 22.0012 31.1667 22H1.83334ZM1.83334 12.8333C1.31389 12.8333 0.878173 12.6573 0.526173 12.3053C0.174173 11.9533 -0.00121588 11.5182 6.34372e-06 11C6.34372e-06 10.4806 0.176006 10.0448 0.528006 9.69283C0.880006 9.34083 1.31512 9.16545 1.83334 9.16667H31.1667C31.6861 9.16667 32.1218 9.34267 32.4738 9.69467C32.8258 10.0467 33.0012 10.4818 33 11C33 11.5194 32.824 11.9552 32.472 12.3072C32.12 12.6592 31.6849 12.8346 31.1667 12.8333H1.83334ZM1.83334 3.66667C1.31389 3.66667 0.878173 3.49067 0.526173 3.13867C0.174173 2.78667 -0.00121588 2.35156 6.34372e-06 1.83334C6.34372e-06 1.31389 0.176006 0.878173 0.528006 0.526173C0.880006 0.174173 1.31512 -0.00121588 1.83334 6.3437e-06H31.1667C31.6861 6.3437e-06 32.1218 0.176006 32.4738 0.528006C32.8258 0.880006 33.0012 1.31512 33 1.83334C33 2.35278 32.824 2.7885 32.472 3.1405C32.12 3.4925 31.6849 3.66789 31.1667 3.66667H1.83334Z" fill="#171717"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="flex gap-4 items-center justify-center -xl:hidden px-4">
                                    <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18.5 14.42V17.956C18.5001 18.2092 18.4042 18.453 18.2316 18.6382C18.059 18.8234 17.8226 18.9363 17.57 18.954C17.133 18.984 16.776 19 16.5 19C7.663 19 0.5 11.837 0.5 3C0.5 2.724 0.515 2.367 0.546 1.93C0.563722 1.67744 0.676581 1.44101 0.861804 1.26841C1.04703 1.09581 1.29082 0.999886 1.544 1H5.08C5.20404 0.999875 5.3237 1.04586 5.41573 1.12902C5.50776 1.21218 5.5656 1.32658 5.578 1.45C5.601 1.68 5.622 1.863 5.642 2.002C5.84073 3.38892 6.248 4.73783 6.85 6.003C6.945 6.203 6.883 6.442 6.703 6.57L4.545 8.112C5.86445 11.1865 8.31455 13.6365 11.389 14.956L12.929 12.802C12.9919 12.714 13.0838 12.6509 13.1885 12.6237C13.2932 12.5964 13.4042 12.6068 13.502 12.653C14.767 13.2539 16.1156 13.6602 17.502 13.858C17.641 13.878 17.824 13.899 18.052 13.922C18.1752 13.9346 18.2894 13.9926 18.3724 14.0846C18.4553 14.1766 18.5002 14.2961 18.5 14.42Z" 
                                    className="stroke-neutral-800"/>
                                    </svg>
                                    <div className="flex flex-col text-red-500 text-xl font-medium">
                                        <a target="_blank" href="https://zalo.me/0373522843">0373-522-843</a>
                                    </div>
                                </div>
                            </div>

                        </nav>
                    </div>
                </header>
            )}

            <div className={`w-[225px] h-screen min-h-full fixed left-0 top-0 bg-white z-[1000] 
                ${sidenavOpened ? 'translate-x-0' : 'translate-x-[-100%]'} transition-all duration-300
                flex flex-col pt-[162px]`} ref={sideNavRef}>
                    <div className="flex flex-col">
                        <nav className="flex flex-col">
                            <Link href="/" className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px] transition-all duration-300
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-0
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('home')}
                                </span>
                            </Link>

                            <Link href={`/${i18n?.language}/products`} className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-0  transition-all duration-300
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('products').toUpperCase()}
                                </span>
                            </Link>

                            <Link href={`/${i18n?.language}/about`} className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-0  transition-all duration-300
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('about').toUpperCase()}
                                </span>
                            </Link>

                            <Link href={`/${i18n?.language}/contact`} className="text-[#666] font-bold text-[14px] leading-[45px] relative z-10 w-full pl-[70px]
                            before:absolute before:left-0 before:top-0 before:w-full before:h-full before:bg-red-500 before:z-0  transition-all duration-300 
                            hover:text-white before:translate-x-[-100%] [&:hover:before]:translate-x-0 before:transition-all before:duration-300" 
                            onClick={() => setSidenavOpened(false)}>
                                <span className="relative z-10">
                                    {t('contact').toUpperCase()}
                                </span>
                            </Link>
                        </nav>
                    </div>
            </div>
        </div>

    )
};

export default Header;