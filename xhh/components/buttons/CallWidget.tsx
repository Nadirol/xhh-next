import { TFunction } from "next-i18next";
import { useEffect, useRef, useState } from "react";

// run function when clicking outside of ref
const useClickDetector = (ref: React.MutableRefObject<HTMLDivElement | null>, func: () => void, secondRef: React.MutableRefObject<HTMLDivElement | null>) => {
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

const CallWidget = ({ t }: { t: TFunction }) => {

    const [callNumberVisible, setCallNumberVisible] = useState(false);
    const numbersRef = useRef(null);
    const buttonRef = useRef(null);

    const hidePopup = () => {
        setCallNumberVisible(false)
    }

    useClickDetector(buttonRef, hidePopup, numbersRef);

    return (
        <div className="relative">
            <button className="p-4 bg-red-400 rounded-[100%] after:inline-block after:w-full after:h-full after:absolute 
            after:duration-[400] after:transition-all after:inset-0 after:z-[-1] transition-all duration-[400] 
            after:rounded-[100%] after:bg-red-400 [&:hover]:after:scale-[1.4] [&:hover]:after:opacity-0 relative z-10" 
            onMouseEnter={() => setCallNumberVisible(prevState => !prevState)} ref={buttonRef}>
                <div className="aspect-square mx-auto">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.6 24C23 24 23.3333 23.8667 23.6 23.6C23.8667 23.3333 24 23 24 22.6V17.2C24 16.8889 23.9 16.6164 23.7 16.3827C23.5 16.1489 23.2444 15.9991 22.9333 15.9333L18.3333 15C18.0222 14.9556 17.7053 14.9836 17.3827 15.084C17.06 15.1844 16.7991 15.3342 16.6 15.5333L13.4667 18.6667C11.7778 17.6444 10.2333 16.4333 8.83333 15.0333C7.43333 13.6333 6.26667 12.1333 5.33333 10.5333L8.53333 7.26667C8.73333 7.06667 8.86133 6.83867 8.91733 6.58267C8.97333 6.32667 8.97867 6.04356 8.93333 5.73333L8.06667 1.06667C8.02222 0.755556 7.87778 0.5 7.63333 0.3C7.38889 0.0999999 7.11111 0 6.8 0H1.4C0.999998 0 0.666664 0.133333 0.399998 0.4C0.133331 0.666667 0 1 0 1.4C0 4.26667 0.639111 7.06133 1.91733 9.784C3.19555 12.5067 4.88444 14.9178 6.984 17.0173C9.08356 19.1169 11.4947 20.8058 14.2173 22.084C16.94 23.3622 19.7342 24.0009 22.6 24Z" fill="#FFFFFF"/>
                    </svg>                    
                </div>
                {callNumberVisible && (
                    <div className="absolute top-0 right-0 px-6 py-4 rounded-2xl translate-y-[-110%] bg-white shadow-card-extrasemibold
                    flex gap-4 flex-col cursor-default z-20 border border-neutral-400" ref={numbersRef}>
                        <h4 className="text-neutral-800 font-medium">{t('callUsNow')}</h4>
                        <a href="tel:+84985041369" className="text-neutral-800 font-semibold text-2xl whitespace-nowrap	">
                            0985 041 369
                        </a>
                    </div>
                )}

            </button>
        </div>
    )
};

export default CallWidget;