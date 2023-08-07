import { TFunction } from "next-i18next"
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";

const About = ({ t }: { t: TFunction}) => {

    return (
        <div className="">
            <div className="bg-red-600 py-12 text-neutral-50">
                <FadeInOnScroll>
                    <div className="w-container-large mx-auto flex justify-between items-center">
                        <div className="flex gap-4 flex-col flex-1">
                            <h4 className="text-xl">XUÂN HOÀ HOME</h4>
                            <span className="bg-white h-[2px] w-8 mb-4"></span>
                            <h2 className="text-[4rem] leading-tight tracking-[0.075rem] font-bold">About Us</h2>
                        </div>
                        <p className="flex-1 text-neutral-100 leading-loose tracking-wide">
                            Xuan Hoa Home is a renowned manufacturer and retailer known for its high-quality and 
                            stylish home appliances and decor offerings. With a focus on craftsmanship and design, 
                            Xuan Hoa Home creates pieces that are both functional and aesthetically pleasing.
                        </p>
                    </div>
                </FadeInOnScroll>
            </div>
            <div className="relative h-[200px] md:h-[400px] flex items-center">
                <div className="bg-about-background bg-center bg-cover h-full brightness-50 absolute inset-0 z-1">
                </div>
                <FadeInOnScroll>
                    <div className="w-container-large mx-auto relative z-10 flex gap-10 flex-col">
                        <p className="flex-1 text-neutral-100 leading-loose tracking-wide w-1/2">
                            The company offers a wide range of products options for various living spaces, 
                            including living rooms, bedrooms, dining rooms, and outdoor areas. Our collection 
                            includes windows blinds, windows and doors, tables and chairs, wooden tiles, and more. 
                            Each piece is meticulously crafted using quality materials to ensure durability and longevity.
                        </p>
                        <button className="text-neutral-100 w-fit font-light underline">
                            Read More
                        </button>
                    </div>
                </FadeInOnScroll>
            </div>
        </div>

    )
};

export default About;