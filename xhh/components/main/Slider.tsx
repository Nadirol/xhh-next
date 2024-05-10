// @ts-nocheck

import { Slide, SlideshowRef } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { useRef } from "react";
import { slider1, slider2 } from "../../public/assets";
import Image from "next/image";

const indicators = (index: number) => 
    (
    <div className={`[&.active]:bg-red-500 indicator w-2.5 h-2.5 bg-neutral-400 hover:bg-red-500 rounded-[100%] ${index === 0 ? '' : 'ml-2'}`}>
    </div>
    );

const Slider = () => {
    const slideRef = useRef<SlideshowRef>(null)

    return (
        <div className="w-container mx-auto relative">
            <Slide indicators={indicators} transitionDuration={500} duration={1000} autoplay={false} arrows={false} ref={slideRef}>
                <div>
                    <Image src={slider1} alt="" className="object-cover w-full pointer-events-none"/>
                </div>
                <div>
                    <Image src={slider2} alt="" className="object-cover w-full pointer-events-none"/>
                </div>
                <div>
                    <Image src={slider1} alt="" className="object-cover w-full pointer-events-none"/>
                </div>
                <div>
                    <Image src={slider2} alt="" className="object-cover w-full pointer-events-none"/>
                </div>
            </Slide>
        </div>

    )
};

export default Slider;