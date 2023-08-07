import { TFunction } from "next-i18next"
import { interiorImage1, interiorImage2, interiorImage3, interiorImage4 } from "../../public/assets";
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";

const interiorImages = [{ image: interiorImage1, title: "Holz" }, { image: interiorImage2, title: "Bonita" }, 
{ image: interiorImage3, title: "Belling" }, { image: interiorImage4, title: "Leo" }, 
{ image: interiorImage4, title: "Orion" }, { image: interiorImage1, title: "Fetra" }, 
{ image: interiorImage2, title: "Jasmine" }, { image: interiorImage3, title: "Alice" }];


const Curtains = ({ t }: { t: TFunction}) => {

    return (
        <FadeInOnScroll>
            <div className="flex gap-10 flex-col py-12 w-container-large mx-auto">
                <div className="pb-8 border-b border-neutral-200">
                    <h2 className="text-red-900 font-bold text-2xl md:text-[4rem] w-2/3 tracking-[0.2rem]">Curtains</h2>
                </div>
                <div className="grid grid-cols-4 w-full">
                    {interiorImages.map((i, index) => (
                        <div key={index} className="relative aspect-square cursor-pointer flex items-end 
                        [&:hover>.absolute>img]:scale-[1.05] [&:hover>.relative]:py-4">
                            <div className="overflow-hidden absolute z-0 inset-0">
                                <Image src={i.image} alt="curtain image" className="object-cover aspect-square  
                                transition-[transform] duration-700 brightness-90"/>
                            </div>
                            <div className="w-full py-2 bg-filter-dark relative z-10 text-center items-center
                            transition-[padding] duration-700">
                                <h5 className="text-neutral-100 text-xl tracking-wide">{i.title}</h5>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </FadeInOnScroll>

    )
};

export default Curtains;