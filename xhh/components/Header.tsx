import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { aboutIcon, closeIcon, homeIcon, logoDark, logoLight, mediaIcon, menuIcon, phoneIcon, sliderImage1, sliderImage2, sliderImage3, ukFlag, vietnamFlag } from "../public/assets";
import SliderImage from "./header/SliderImage";
import Link from "next/link";

// run function when clicking outside of ref
const ClickDetector = (ref: React.MutableRefObject<HTMLDivElement | null>, func: () => void, secondRef: React.MutableRefObject<HTMLDivElement | null>) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (ref.current && !ref.current.contains(event.target) && !secondRef.current?.contains(event.target)) {
                func()
            }
        }
  
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
    },[ref])
};

const lngs = new Map([
    ['en', { nativeLanguage: 'English', flag: ukFlag }],
    ['vi', { nativeLanguage: 'Tiếng Việt', flag: vietnamFlag }],
]);

const sliderImages = [sliderImage1, sliderImage2, sliderImage3];

const sliderText = [
    "Your Space, Your Signature Style",
    "Creating Harmony Through Design",
    "Where Style Meets Comfort"
]

const Header = ({ t }: { t: TFunction }) => {


    const [sidenavOpened, setSidenavOpened] = useState(false);
    const sideNavRef = useRef(null);

    const hideSideNav = () => {
        setSidenavOpened(false)
    };

    ClickDetector(sideNavRef, hideSideNav, sideNavRef);

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

    return (
        <div className="relative z-20 min-h-screen bg-black">
            <header className="relative z-10 backdrop-blur-[2px] backdrop-brightness-90">
                {/* top nav */}
                <nav className="w-container-large mx-auto flex items-center justify-between -xl:px-4 relative z-20 
                border-b border-slate-300 border-opacity-50">
                    <Link href="/" className="p-4 h-full">
                        <Image src={logoDark} alt="" className="w-[3rem] xl:w-[4rem]" loading="lazy"/>
                    </Link>

                    <div className="flex">
                        <div className="flex gap-12 items-center text-neutral-50 xl:pr-8 xl:border-r border-opacity-50 border-slate-300">
                            <ul className="hidden xl:flex font-medium">
                                <li className="inline-block relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="/" className="relative z-10">{t('home')}</Link>
                                </li>
                                <li className="inline-block relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="#services" className="relative z-10">{t('products').toUpperCase()}</Link>
                                </li>
                                <li className="inline-block relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="#about" className="relative z-10">{t('about')}</Link>
                                </li>
                                <li className="inline-block relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="#contact" className="relative z-10">
                                        {t('contact')}
                                    </Link>
                                </li>
                            </ul>

                            <div className="flex gap-8 items-center justify-end -xl:ml-auto">
                                <div className="relative py-6 px-4 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-blue-500 after:translate-y-[-100%] 
                                [&:hover]:after:translate-y-0 after:transition-all after:duration-75 nav-link-background [&:hover>.grid]:h-full">
                                    <div className="flex gap-2 xl:gap-4 items-center cursor-pointer relative z-10">
                                        <h1 className="text-neutral-50 font-medium text-xs md:text-base leading-5">
                                            {i18n?.language.toUpperCase()}
                                        </h1>
                                        <Image src={lngs.get(i18n?.language || "en")?.flag || ukFlag} 
                                        alt="language image" width={38} height={21}/>
                                    </div>
                                    <div className={`grid h-0 min-w-[10rem]
                                    transition-[height] duration-300 absolute z-30 bottom-0 right-0 
                                    translate-y-[100%] overflow-hidden`}>
                                        {Array.from(lngs.keys()).map((lng: string) => (
                                        <button type="submit" key={lng} onClick={() => { i18n?.changeLanguage(lng) }} disabled={i18n?.resolvedLanguage === lng}
                                            className={`${(i18n?.language === lng || i18n?.language.slice(0,2).toLowerCase() === lng) ? 'text-neutral-50' : 'text-neutral-300'} 
                                            font-normal hover:text-neutral-50 px-8 py-2 min-h-[2rem] bg-blue-500`}>
                                            {lngs.get(lng)?.nativeLanguage}
                                        </button>
                                        ))}
                                    </div>
                                </div>
                                <button onClick={() => setSidenavOpened(prevState => !prevState)} 
                                className="xl:hidden">
                                    <Image src={menuIcon} alt="menu button icon" className="" loading="lazy"/>
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-4 items-center justify-center -xl:hidden px-4">
                            <Image src={phoneIcon} alt="phone icon" />
                            <div className="flex flex-col text-neutral-50 text-sm">
                                <h4>English: 037 9748 073</h4>
                                <h4>Tiếng Việt: 098 5080 324</h4>
                            </div>
                        </div>
                    </div>

                </nav>
            </header>

            <div className={`w-sidenav h-screen min-h-full fixed right-0 top-0 bg-filter-extra-dark z-40 
                ${sidenavOpened ? 'translate-x-0' : 'translate-x-[100%]'} transition-all duration-300
                flex flex-col items-center justify-between py-8 md:py-[3.75rem] mx-auto xl:hidden`} ref={sideNavRef}>
                    <button onClick={() => setSidenavOpened(false)} 
                        className="xl:hidden ml-auto mr-6">
                            <Image src={closeIcon} alt="menu button icon" className="" loading="lazy"/>
                    </button>
                    <div className="flex gap-[1.875rem] flex-col items-center">

                        <Link href="/">
                            <Image src={logoDark} alt="" className="w-[10rem]" loading="lazy"/>
                        </Link>
                        
                        <nav className="flex gap-6 flex-col">
                            <Link href="/" className="text-neutral-100 font-medium text-base leading-5 flex gap-4" onClick={() => setSidenavOpened(false)}>
                            <Image src={homeIcon} alt="home icon"  loading="lazy"/>
                            {t('home')}
                            </Link>
                            <Link href="#services" className="text-neutral-100 font-medium text-base leading-5 flex gap-4" onClick={() => setSidenavOpened(false)}>
                            <Image src={mediaIcon} alt="about icon" loading="lazy" />
                            {t('products').toUpperCase()}
                            </Link>
                            <Link href="#about" className="text-neutral-100 font-medium text-base leading-5 flex gap-4" onClick={() => setSidenavOpened(false)}>
                            <Image src={aboutIcon} alt="airplane icon" loading="lazy" />
                            {t('about')}
                            </Link>
                            <Link href="#contact" className="text-neutral-100 font-medium text-base leading-5 flex gap-4 " onClick={() => setSidenavOpened(false)}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.6 24C23 24 23.3333 23.8667 23.6 23.6C23.8667 23.3333 24 23 24 22.6V17.2C24 16.8889 23.9 16.6164 23.7 16.3827C23.5 16.1489 23.2444 15.9991 22.9333 15.9333L18.3333 15C18.0222 14.9556 17.7053 14.9836 17.3827 15.084C17.06 15.1844 16.7991 15.3342 16.6 15.5333L13.4667 18.6667C11.7778 17.6444 10.2333 16.4333 8.83333 15.0333C7.43333 13.6333 6.26667 12.1333 5.33333 10.5333L8.53333 7.26667C8.73333 7.06667 8.86133 6.83867 8.91733 6.58267C8.97333 6.32667 8.97867 6.04356 8.93333 5.73333L8.06667 1.06667C8.02222 0.755556 7.87778 0.5 7.63333 0.3C7.38889 0.0999999 7.11111 0 6.8 0H1.4C0.999998 0 0.666664 0.133333 0.399998 0.4C0.133331 0.666667 0 1 0 1.4C0 4.26667 0.639111 7.06133 1.91733 9.784C3.19555 12.5067 4.88444 14.9178 6.984 17.0173C9.08356 19.1169 11.4947 20.8058 14.2173 22.084C16.94 23.3622 19.7342 24.0009 22.6 24Z" 
                                className="fill-neutral-100"/>
                            </svg>              
                            {t('contact')}
                            </Link>

                        </nav>
                    </div>

                    <div className="flex gap-6 flex-col -xl:items-center">
                        <div className="flex gap-3 flex-col -xl:items-center">
                        <div className="flex gap-4 items-center">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.6 24C23 24 23.3333 23.8667 23.6 23.6C23.8667 23.3333 24 23 24 22.6V17.2C24 16.8889 23.9 16.6164 23.7 16.3827C23.5 16.1489 23.2444 15.9991 22.9333 15.9333L18.3333 15C18.0222 14.9556 17.7053 14.9836 17.3827 15.084C17.06 15.1844 16.7991 15.3342 16.6 15.5333L13.4667 18.6667C11.7778 17.6444 10.2333 16.4333 8.83333 15.0333C7.43333 13.6333 6.26667 12.1333 5.33333 10.5333L8.53333 7.26667C8.73333 7.06667 8.86133 6.83867 8.91733 6.58267C8.97333 6.32667 8.97867 6.04356 8.93333 5.73333L8.06667 1.06667C8.02222 0.755556 7.87778 0.5 7.63333 0.3C7.38889 0.0999999 7.11111 0 6.8 0H1.4C0.999998 0 0.666664 0.133333 0.399998 0.4C0.133331 0.666667 0 1 0 1.4C0 4.26667 0.639111 7.06133 1.91733 9.784C3.19555 12.5067 4.88444 14.9178 6.984 17.0173C9.08356 19.1169 11.4947 20.8058 14.2173 22.084C16.94 23.3622 19.7342 24.0009 22.6 24Z"
                            className="fill-neutral-100"/>
                            </svg>                
                            <div className="flex flex-col">
                            <h1 className="text-neutral-100 font-regular text-xs xl:text-lg">ENG: 0379748073</h1>
                            <h1 className="text-neutral-100 font-regular text-xs xl:text-lg">VN: 0985080324</h1>
                            </div>
                        </div>

                        <div className="flex gap-4 -xl:justify-center items-center">
                            <svg width="15" height="17" viewBox="0 0 30 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 17C16.0312 17 16.9144 16.6668 17.6494 16.0004C18.3844 15.334 18.7512 14.5339 18.75 13.6C18.75 12.665 18.3825 11.8643 17.6475 11.1979C16.9125 10.5315 16.03 10.1989 15 10.2C13.9688 10.2 13.0856 10.5332 12.3506 11.1996C11.6156 11.866 11.2487 12.6661 11.25 13.6C11.25 14.535 11.6175 15.3357 12.3525 16.0021C13.0875 16.6685 13.97 17.0011 15 17ZM15 29.495C18.8125 26.3217 21.6406 23.4385 23.4844 20.8454C25.3281 18.2523 26.25 15.9505 26.25 13.94C26.25 10.8517 25.1637 8.3232 22.9912 6.3546C20.8187 4.386 18.155 3.40113 15 3.4C11.8438 3.4 9.17937 4.38487 7.00688 6.3546C4.83437 8.32433 3.74875 10.8528 3.75 13.94C3.75 15.9517 4.67188 18.254 6.51562 20.8471C8.35938 23.4402 11.1875 26.3228 15 29.495ZM15 34C9.96875 30.1183 6.21125 26.5132 3.7275 23.1846C1.24375 19.856 0.00125 16.7745 0 13.94C0 9.69 1.50813 6.30417 4.52437 3.7825C7.54063 1.26083 11.0325 0 15 0C18.9688 0 22.4612 1.26083 25.4775 3.7825C28.4937 6.30417 30.0012 9.69 30 13.94C30 16.7733 28.7575 19.8549 26.2725 23.1846C23.7875 26.5143 20.03 30.1195 15 34Z" 
                            className="fill-neutral-100"/>
                            </svg>
                            <h1 className="text-neutral-100 font-regular text-xs xl:text-lg -xl:w-1/2">
                            {t('addressDetails')}
                            </h1>
                        </div>
                        </div>
                        <div className="flex gap-[1.125rem] flex-col -xl:items-center">
                        <h1 className="text-neutral-100 font-medium text-lg md:text-2xl">Socials</h1>
                        <div className="flex gap-6">
                            <a href="https://www.facebook.com/boommedia.vn" target="_blank">
                            <svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
                                <path d="M36 18.0451C36 8.08421 27.936 0 18 0C8.064 0 0 8.08421 0 18.0451C0 26.7789 6.192 34.0511 14.4 35.7293V23.4586H10.8V18.0451H14.4V13.5338C14.4 10.0511 17.226 7.21804 20.7 7.21804H25.2V12.6316H21.6C20.61 12.6316 19.8 13.4436 19.8 14.4361V18.0451H25.2V23.4586H19.8V36C28.89 35.0977 36 27.4105 36 18.0451Z" className="fill-neutral-100"/>
                            </svg>
                            </a>
                        </div>
                        </div>
                    </div>
            </div>

            {/* sticky nav */}
            <div className={`fixed bg-white z-30 transition-[top] top-0 left-0 w-full shadow-lg
            ${scrollPosition > 100 ? "top-0" : "top-[-120px]"}`}>
                <nav className={`w-container-large mx-auto flex items-center justify-between`}>
                    <Link href="/" className="p-4 h-full">
                        <Image src={logoLight} alt="" className="w-[3rem] xl:w-[48px]" loading="lazy"/>
                    </Link>

                    <div className="flex">
                        <div className="flex gap-12 items-center text-neutral-800 pr-8">
                            <ul className="hidden xl:flex font-medium h-full">
                                <li className="flex relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background h-full">
                                    <Link href="/" className="relative z-10">{t('home')}</Link>
                                </li>
                                <li className="relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="#services" className="relative z-10">{t('products').toUpperCase()}</Link>
                                </li>
                                <li className="relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="#about" className="relative z-10">{t('about')}</Link>
                                </li>
                                <li className="relative py-6 px-2 after:absolute after:inset-0 
                                after:z-0 after:w-full after:h-plus-15 after:bg-red-500 after:translate-y-[-110%] 
                                [&:hover]:after:translate-y-0 after:transition-all nav-link-background">
                                    <Link href="#contact" className="relative z-10">
                                        {t('contact')}
                                    </Link>
                                </li>
                            </ul>

                            <div className="flex gap-8 items-center justify-end -xl:ml-auto">
                                <div className="relative py-6 px-4 after:absolute after:inset-0
                                after:z-0 after:w-full after:h-plus-15 after:bg-blue-500 after:translate-y-[-100%] 
                                [&:hover]:after:translate-y-0 after:transition-all after:duration-75 nav-link-background 
                                [&:hover>.grid]:h-full">
                                    <div className="flex gap-2 xl:gap-4 items-center cursor-pointer relative z-10">
                                        <h4 className="text-neutral-800 font-medium text-xs md:text-base leading-5">
                                            {i18n?.language.toUpperCase()}
                                        </h4>
                                        <Image src={lngs.get(i18n?.language || "en")?.flag || ukFlag} 
                                        alt="language image" width={38} height={21}/>
                                    </div>
                                    <div className={`grid h-0 min-w-[10rem]
                                    transition-[height] duration-300 absolute z-30 bottom-0 right-0 
                                    translate-y-[100%] overflow-hidden`}>
                                        {Array.from(lngs.keys()).map((lng: string) => (
                                        <button type="submit" key={lng} onClick={() => { i18n?.changeLanguage(lng) }} disabled={i18n?.resolvedLanguage === lng}
                                            className={`${(i18n?.language === lng || i18n?.language.slice(0,2).toLowerCase() === lng) ? 'text-neutral-50' : 'text-neutral-300'} 
                                            font-normal hover:text-neutral-50 px-8 py-2 min-h-[2rem] bg-blue-500`}>
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
                            <div className="flex flex-col text-neutral-80 text-sm">
                                <h4>English: 037 9748 073</h4>
                                <h4>Tiếng Việt: 098 5080 324</h4>
                            </div>
                        </div>
                    </div>

                </nav>
            </div>

            {/* slider */}
            {sliderImages.map((image, index) => (
                <SliderImage
                key={index}
                image={image}
                index={index}
                activeSlide={activeSlide}
                />
            ))}


            {/* slider dots */}
            <div className="absolute left-8 md:left-24 bottom-8 md:bottom-24 z-10 flex gap-4 flex-col">
                {sliderImages.map((image, index) => {
                return (
                    <button className="flex gap-3 items-center w-fit"  key={index} onClick={() => setActiveSlide(index)}>
                        <div className={`${activeSlide === index ? 'h-8' : 'h-2 rounded-[50%]'} 
                        bg-white w-2 rounded-2xl transition-all duration-300`}>
                        </div>
                        {activeSlide === index && (
                            <h5 className={`text-neutral-50 font-medium text-xl animate-slide-in-bl`}>
                                0{index+1}
                            </h5>
                        )}
                    </button>
                )
                })}
            </div>

            {/* banner text */}
                {sliderText.map((text, index) => (
                    <h1 key={index} 
                    className={`text-neutral-50 font-bold text-3xl md:text-[3rem] xl:text-[4rem] 
                    absolute bottom-1/2 translate-x-1/2 translate-y-1/2 z-10 text-center right-1/2
                    w-full md:w-3/4 xl:w-3/5 max-w-[900px] leading-snug tracking-[0.4rem]
                    ${index === activeSlide ? "opacity-100 animate-slide-in-from-right" : "opacity-0 pointer-events-none"} 
                    transition-all duration-1000`}>
                        {text.toUpperCase()}
                    </h1>
                ))}

        </div>

    )
};

export default Header;