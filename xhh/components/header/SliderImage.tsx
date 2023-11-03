import Image, { StaticImageData } from "next/image";
const SliderImage = ({ image, index, activeSlide }: { image: string | StaticImageData, index: number, activeSlide: number }) => {
    return (
      <Image src={image} alt="background image" className={`absolute z-0 top-0 left-0 overflow-hidden mx-auto object-cover brightness-[0.8]
      transition-opacity duration-[1.2s] ${activeSlide === index ? "opacity-100" : "opacity-0"} h-screen max-h-screen pointer-events-none`}/>
    )
};

export default SliderImage;