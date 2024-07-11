// @ts-nocheck

import { Slide, SlideshowRef } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useRef } from "react";
import { slider1, slider2, slider3 } from "../../public/assets";
import Image from "next/image";
import Link from 'next/link';
import { i18n } from 'next-i18next';
import { urlFor } from '../../lib/sanity';

const indicators = (index: number) => 
    (
        <div className={`[&.active]:bg-red-500 indicator w-2.5 h-2.5 bg-neutral-400 hover:bg-red-500 rounded-[100%] ${index === 0 ? '' : 'ml-2'}`}>
        </div>
    );

const Slider = ({ sliderBanner }) => {
    const slideRef = useRef<SlideshowRef>(null);

    return (
        <div className="w-container mx-auto relative">
                {sliderBanner ? (
                    <Slide indicators={indicators} transitionDuration={500} duration={1000} autoplay={false} arrows={false} ref={slideRef}>
                        {sliderBanner.map((s, index) => (
                            <Link key={index} href={s.link}>
                                <Image src={urlFor(s.image).url()} width={1200} height={480} alt="" className="object-cover w-full pointer-events-none"/>
                            </Link>
                        ))}
                    </Slide>
                )
                : (
                    <Slide indicators={indicators} transitionDuration={500} duration={1000} autoplay={false} arrows={false} ref={slideRef}>
                        <Link href={`/${i18n?.language}/products?category=table-and-chair`}>
                            <Image src={slider1} alt="" className="object-cover w-full pointer-events-none"/>
                        </Link>
                        <Link href={`/${i18n?.language}/products/set-do-dung-hoc-tap-7-mon`}>
                            <Image src={slider2} alt="" className="object-cover w-full pointer-events-none"/>
                        </Link>
                        <Link href={`/${i18n?.language}/products/bang-tu-dan-tuong-xuan-hoa-home`}>
                            <Image src={slider3} alt="" className="object-cover w-full pointer-events-none"/>
                        </Link>
                    </Slide>
                )}

        </div>

    )
};

export default Slider;