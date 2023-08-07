import { TFunction } from "next-i18next"
import { arrowUpIcon, tableChairImage, windowImage, woodenFloorImage } from "../../public/assets";
import Image from "next/image";
import { useState, useEffect } from "react";
import FadeInOnScroll from "../animated/FadeInOnScroll";

const itemsImage = [windowImage, woodenFloorImage, tableChairImage];

const itemData = [
    {
        title: "Nano Mesh Door",
        details: ["Mesh eye: 0.00005mm","3 nanofiber layer", 
        "Nanofiber thickness: 250nm", "UV resistant 90% - sunproof 50%", 
        "Anticorrosion", "Easy to clean"],
        description: [
            "Nano mesh door is a brand new product on the market, designed to install on windows to stop insects, pollen grains, dusts and rain... flying into the house and damaging your health. With unique nanofiber technology, Nano mesh door helps you to enjoy fresh air and natural sun lights while still using coolers.",
            "Especially, this product is easy to uninstall and cleaning, can change size for each window, which will bring maximum benefit to the user."
        ],
        benefits: [
            "Protect your respiratory system and skin: The product filters insects, pollen grains, dusts and rain which protects your respiratory system and skin from negative impacts, while also improves indoor air quality.",
            "Enjoy fresh air and natural light: The product allows you to enjoy outdoor air and natural sunlight without worrying about harmful ingredients from the outdoors entering your home.",
            "Energy saving: You can open the window to enjoy fresh air and still keep the air conditioner working, helping to save energy.",
            "Easy to remove and clean: The product is designed for easy removal and cleaning, allowing you to clean regularly without worrying about dust.",
            "Customizable size: The product can be customized according to the size of each window, bringing convenience to users and suitable for any living space.",
            "Contributing to the protection of the environment: You are contributing to reducing energy consumption and protecting the environment."
        ]
    },
    {
        title: "12-spoke Wooden Blister",
        details: ["Size: 30cm x 30cm x 2cm","Number of spokes: 12", 
        "Design style: North Europe, West Europe, Simplify, Modern", "Material: 100% Acacia solid wood Grade 1 European standard", 
        "Color: Natural wood color", "Surface treatment: PU spray"],
        description: [
            "Xuan Hoa Wood Blisters used are made from Acacia wood type 1 from Europe. The wood has high hardness, withstands impact and friction. The wood is also resistant to water and termites super well, durable to use up to 5 years.",
            "Acacia wood is treated with modern technology to increase the surface smoothness and durability of the product. The top surface is covered with a water-resistant and UV-resistant PU paint to protect the wood from external factors. The product is carefully processed to remove errors such as cracks, garbage, mold..."
        ],
        benefits: [
            "The product is made from high quality European standard ACACIA natural wood, with good durability and resistance to termites. The wood has beautiful colors, does not fade or warp when exposed to water or sunlight.",
            "Xuan Hoa wooden blister has a beautiful 12 spokes design, easy to install and disassemble. Just join the wooden blisters together in a square or rectangular shape depending on your space. You can also cut or drill wooden blisters to fit the desired size.",
            "The product has a size of 30cm x 30cm with a thickness of 2cm, suitable for many different spaces. You can line the floor for balconies, terraces, gardens, swimming pools, cafes, restaurants, hotels, resort...",
            "Xuan Hoa designed wooden floor covering will bring you a green, luxurious and environmentally friendly living space."
        ]
    },
    {
        title: "Anti-hunch tables and chairs",
        details: ["Mesh eye: 0.00005mm","3 nanofiber layer", 
        "Nanofiber thickness: 250nm", "UV resistant 90% - sunproof 50%", 
        "Anticorrosion", "Easy to clean"],
        description: [
            "Nano mesh door is a brand new product on the market, designed to install on windows to stop insects, pollen grains, dusts and rain... flying into the house and damaging your health. With unique nanofiber technology, Nano mesh door helps you to enjoy fresh air and natural sun lights while still using coolers.",
            "Especially, this product is easy to uninstall and cleaning, can change size for each window, which will bring maximum benefit to the user."
        ],
        benefits: [
            "Protect your respiratory system and skin: The product filters insects, pollen grains, dusts and rain which protects your respiratory system and skin from negative impacts, while also improves indoor air quality.",
            "Enjoy fresh air and natural light: The product allows you to enjoy outdoor air and natural sunlight without worrying about harmful ingredients from the outdoors entering your home.",
            "Energy saving: You can open the window to enjoy fresh air and still keep the air conditioner working, helping to save energy.",
            "Easy to remove and clean: The product is designed for easy removal and cleaning, allowing you to clean regularly without worrying about dust.",
            "Customizable size: The product can be customized according to the size of each window, bringing convenience to users and suitable for any living space.",
            "Contributing to the protection of the environment: You are contributing to reducing energy consumption and protecting the environment."
        ]
    },
]

const getPreviousIndex = (num: number, max: number) => {
    return num === 0 ? max - 1 : num -1
}

const getNextIndex = (num: number, max: number) => {
    return num === max - 1 ?  0 : num + 1
}

const FeaturedItems = ({ t }: { t: TFunction}) => {
    const [activeItem, setActiveItem] = useState(0);
    const [activeItemTab, setActiveItemTab] = useState(0);

        // useEffect(() => {

        //   const interval = setInterval(() => {
        //     setActiveItem(prevSlide => {
        //       return prevSlide + 1 > itemsImage.length - 1 ? 0 : prevSlide + 1
        //     })
        //   }, 30000);

        //   return () => clearInterval(interval);
        // },[]);

    const handlePrevItem = () => {
        const prevItem = getPreviousIndex(activeItem, itemsImage.length);

        setActiveItem(prevItem);
    };

    const handleNextItem = () => {
        const nextItem = getNextIndex(activeItem, itemsImage.length);

        setActiveItem(nextItem);
    };


    return (
            <div className="flex gap-10 flex-col py-6 md:py-12 w-container-large mx-auto">
                <FadeInOnScroll>
                    <div className="pb-4 md:pb-8 border-b border-neutral-200">
                        <h2 className="text-red-900 font-bold text-[2rem] md:text-[3rem] xl:text-[6rem] md:w-2/3 tracking-[0.2rem]">
                            Our Most Innovative Items
                        </h2>
                    </div>
                </FadeInOnScroll>

                <FadeInOnScroll>
                    <div className="grid xl:grid-cols-2 gap-x-12 gap-y-12">
                        <div className="flex items-start gap-8 flex-col">
                            <div className="relative -xl:aspect-square xl:min-h-[600px] w-[90%] md:w-full">
                                {itemsImage.map((image, index) => (
                                    <Image key={index} src={image} alt="window preview image" 
                                    className={`object-cover w-full md:w-[90%] aspect-square absolute transition-all duration-100
                                    ${activeItem === index ? "z-10 top-4 md:bottom-0 left-4 md:right-0" 
                                    : getNextIndex(activeItem, itemsImage.length) === index 
                                    ? "top-2 md:bottom-8 left-2 md:right-8" 
                                    : "z-[-1] top-0 md:bottom-16 left-0 md:right-16"}`}/>
                                ))}
                            </div>
                            <div className="flex gap-4 pl-12">
                                <button className="hover:translate-x-[-40%] transition-all" 
                                onClick={handlePrevItem}>
                                    <Image src={arrowUpIcon} alt="" className="rotate-[-90deg]" />
                                </button>
                                <button className="hover:translate-x-[40%] transition-all"
                                onClick={handleNextItem}>
                                    <Image src={arrowUpIcon} alt="" className="rotate-90"/>
                                </button>
                            </div>
                        </div>

                        <div className="">
                            {itemData.map((item, index) => (
                                <div key={index} className={`${index === activeItem ? "block" : "hidden"} animate-fade-in-up`}>
                                    <h2 className="text-neutral-800 font-medium text-3xl md:text-[3rem] pb-4 border-b border-slate-300">
                                        {item.title}
                                    </h2>
                                    <div className="py-4 flex gap-6 flex-col">
                                        <div className="flex gap-3">
                                            <button className={`relative px-2.5 py-1 text-neutral-900 text-base md:text-2xl before:absolute overflow-hidden
                                            before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-neutral-900 
                                            before:transition-[transform] [&:hover]:before:translate-x-0
                                            ${activeItemTab === 0 ? "before:translate-x-0" : "before:translate-x-[-100%]"}`}
                                            onClick={() => setActiveItemTab(0)}>
                                                Details
                                            </button>
                                            <button className={`relative px-2.5 py-1 text-neutral-900 text-base md:text-2xl before:absolute overflow-hidden
                                            before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-neutral-900 
                                            before:transition-[transform] [&:hover]:before:translate-x-0
                                            ${activeItemTab === 1 ? "before:translate-x-0" : "before:translate-x-[-110%]"}`}
                                            onClick={() => setActiveItemTab(1)}>
                                                Description
                                            </button>
                                            <button className={`relative px-2.5 py-1 text-neutral-900 text-base md:text-2xl before:absolute overflow-hidden
                                            before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-neutral-900 
                                            before:transition-[transform] [&:hover]:before:translate-x-0
                                            ${activeItemTab === 2 ? "before:translate-x-0" : "before:translate-x-[-100%]"}`}
                                            onClick={() => setActiveItemTab(2)}>
                                                Benefits
                                            </button>
                                        </div>
                                        <ul className={`flex gap-3 flex-col list-disc list-inside`}>
                                            {activeItemTab === 0
                                            ? item.details.map((d, index) => (
                                                <li key={index} className="text-neutral-600 font-normal -md:text-xs leading-relaxed">
                                                    {d}
                                                </li>
                                            )) 
                                            : activeItemTab === 1
                                            ? item.description.map((d, index) => (
                                                <li key={index} className="text-neutral-600 font-normal -md:text-xs leading-relaxed">
                                                    {d}
                                                </li>
                                            )) 
                                            : item.benefits.map((d, index) => (
                                                <li key={index} className="text-neutral-600 font-normal -md:text-xs leading-relaxed">
                                                    {d}
                                                </li>
                                            )) 
                                            }
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </FadeInOnScroll>

            </div>
    )
};

export default FeaturedItems;