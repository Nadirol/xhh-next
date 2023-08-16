import { TFunction } from "next-i18next"
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";

const About = ({ t }: { t: TFunction}) => {

    return (
        <div className="">
            <div className="bg-red-600 py-12 text-neutral-50">
                <FadeInOnScroll>
                    <div className="w-container-large mx-auto flex gap-4 justify-between items-center -md:flex-col">
                        <div className="flex gap-2 md:gap-4 flex-col flex-1">
                            <h4 className="text-xl">XUÂN HOÀ HOME</h4>
                            <span className="bg-white h-[2px] w-8 md:mb-4"></span>
                            <h2 className="text-4xl md:text-[4rem] md:leading-tight tracking-[0.075rem] font-bold">{t('aboutUs')}</h2>
                        </div>
                        <p className="flex-1 text-neutral-100 leading-loose tracking-wide">
                            {t('aboutParagraph1')}
                        </p>
                    </div>
                </FadeInOnScroll>
            </div>
            <div className="relative h-[400px] flex items-center -md:flex-col -md:py-4">
                <div className="bg-about-background bg-center bg-cover h-full brightness-50 absolute inset-0 z-1">
                </div>
                <FadeInOnScroll>
                    <div className="w-container-large mx-auto relative z-10 flex gap-10 flex-col">
                        <p className="flex-1 text-neutral-100 leading-loose tracking-wide md:w-1/2">
                            {t('aboutParagraph2')}
                        </p>
                        <button className="text-neutral-100 w-fit font-light underline">
                            {t('readMore')}
                        </button>
                    </div>
                </FadeInOnScroll>
            </div>
        </div>

    )
};

export default About;