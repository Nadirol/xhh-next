import { TFunction, i18n } from "next-i18next"
import { arrowUpIcon, nanoWindowImage, tableAndChairImage, woodenTileBg } from "../../public/assets";
import Image from "next/image";
import { useEffect, useState } from "react";
import FadeInOnScroll from "../animated/FadeInOnScroll";

const itemsImage = [nanoWindowImage, woodenTileBg, tableAndChairImage];

const itemDataEn = [
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
        details: [
            "Table height: from 53cm to 72cm",
            "Chair height: from 37cm to 47cm",
            "Anti-hunch chair with high-quality foam seat and backrest, the backrest is designed to hug the child's spine, supporting the back more effectively",
            "The table top is made of high-quality MDF wood against mold, termites, warping, high-quality materials, especially safe for babies",
            "The table top is covered with anti-glare, anti-fouling Mattle. You can draw markers directly on the table and clean it easily. The tilt of the table top is adjustable by a knob, flexible from 0 to 55 degrees, suitable for different needs: writing, drawing or reading..",
            "The table has drawers for convenient storage",
            "The legs of the table and chair are designed with a solid, anti-vibration powder-coated steel frame; The table legs and footrests can be easily adjusted in height to suit the baby's physique."
        ],
        description: [
            "Creative thinking and your child's health all start with a good study space and correct sitting posture",
        ],
        benefits: []
    },
]

const itemDataVi = [
    {
        title: "Cửa lưới chống bụi mịn Nano",
        details: [
            "Mắt lưới: 0.00005mm",
            "3 lớp sợi nano",
            "Độ rộng sợi nano: 250nm",
            "Chống tia cực tím 90% - chống nắng 50%",
            "Chống ăn mòn",
            "Dễ dàng làm sạch"
        ],
        description: [
            "Cửa lưới chống bụi mịn Nano là một sản phẩm hoàn toàn mới trên thị trường, được thiết kế để lắp đặt trên cửa sổ nhằm ngăn cản côn trùng, hạt phấn, bụi và mưa... bay vào trong nhà gây ảnh hưởng sức khỏe.",
            "Với công nghệ sợi nano độc đáo, cửa lưới chống bụi mịn Nano giúp bạn tận hưởng không khí và ánh sáng mặt trời tự nhiên mà vẫn có thể sử dụng máy lạnh.",
            "Đặc biệt, sản phẩm dễ dàng tháo lắp và vệ sinh, có thể tùy chỉnh kích thước theo từng cửa sổ, mang đến tiện ích tối đa cho người sử dụng."
        ],
        benefits: [
            "Bảo vệ hệ hô hấp và da: Sản phẩm giúp lọc côn trùng, hạt phấn, bụi và mưa, bảo vệ hệ hô hấp và da của bạn khỏi các tác động tiêu cực, đồng thời cải thiện chất lượng không khí trong nhà.",
            "Tận hưởng không khí trong lành và ánh sáng tự nhiên: Sản phẩm cho phép bạn tận hưởng không khí ngoài trời và ánh sáng mặt trời tự nhiên mà không cần lo lắng về việc các thành phần gây hại từ ngoài trời xâm nhập vào nhà.",
            "Tiết kiệm năng lượng: Bạn có thể mở cửa sổ để hưởng thụ không khí trong lành mà vẫn giữ được máy lạnh hoạt động, giúp tiết kiệm năng lượng.",
            "Dễ dàng tháo lắp và vệ sinh: Sản phẩm được thiết kế để dễ dàng tháo lắp và vệ sinh, giúp bạn vệ sinh thường xuyên mà không lo bám bụi.",
            "Kích thước có thể tùy chỉnh: Sản phẩm có thể tùy chỉnh kích thước theo từng cửa sổ, mang lại sự tiện lợi cho người dùng và phù hợp với mọi không gian sống.",
            "Đóng góp vào việc bảo vệ môi trường: Bạn đang góp phần giảm tiêu thụ năng lượng và bảo vệ môi trường."
        ]
    },
    {
        title: "Vỉ gỗ 12 nan",
        details: [
            "Kích thước: 30cm x 30 cm x 2 cm",
            "Số nan gỗ: 12 nan",
            "Phong cách thiết kế: Bắc Âu, Tây Âu, Tối Giản, Hiện Đại",
            "Chất liệu: 100% gỗ nguyên khối Acacia Loại 1 tiêu chuẩn châu Âu",
            "Màu sắc: Màu gỗ tự nhiên",
            "Xử lý bề mặt: Phun bóng PU"
        ],
        description: [
            "Vỉ gỗ XUÂN HÒA được sử dụng là gỗ Acacia nhập khẩu loại 1 từ Châu Âu. Gỗ có độ cứng cao, chịu được va đập và ma sát. Gỗ cũng có khả năng chống nước và chống mối mọt siêu tốt, dùng bền tới 5 năm.",
            "Gỗ Acacia được xử lý bằng công nghệ hiện đại để tăng độ mịn bề mặt và bền cho sản phẩm. Mặt trên phủ một lớp sơn PU chống nước và chống tia UV để bảo vệ gỗ khỏi các yếu tố bên ngoài. Sản phẩm được XUÂN HÒA gia công kỹ lưỡng để loại bỏ các lỗi như nứt, rác, mốc...",
        ],
        benefits: [
            "Sản phẩm được làm từ gỗ tự nhiên ACACIA cao cấp tiêu chuẩn Châu Âu, có độ bền và chống mối mọt tốt. Gỗ có màu sắc đẹp, không bị phai màu hay cong vênh khi tiếp xúc với nước hoặc ánh nắng mặt trời.",
            "Vỉ gỗ XUÂN HÒA có thiết kế 12 nan đẹp mắt, dễ dàng lắp đặt và tháo rời. Chỉ cần ghép các vỉ gỗ lại với nhau theo hình vuông hoặc chữ nhật tuỳ theo không gian của bạn. Bạn cũng có thể cắt hoặc khoan các vỉ gỗ để phù hợp với kích thước mong muốn.",
            "Sản phẩm có kích thước 30cm x 30cm với độ dày 2cm, phù hợp với nhiều không gian khác nhau. Bạn có thể lót sàn cho ban công, sân thượng, sân vườn, hồ bơi, quán cà phê, nhà hàng, khách sạn, resort...",
            "Vỉ gỗ lót sàn thiết kế XUÂN HÒA sẽ mang lại cho bạn một không gian sống xanh, sang trọng và thân thiện với môi trường."
        ]
    },
    {
        title: "Bàn ghế chống gù",
        details: [
            "Chiều cao nâng hạ bàn: từ 53cm đến 72 cm",
            "Chiều cao nâng hạ ghế: từ 37cm đến 47cm",
            "Ghế chống gù chất liệu đệm ngồi và tựa lưng bằng đệm mút cao cấp, tựa lưng thiết kế giúp ôm sát cột sống của trẻ, nâng đỡ phần lưng hiệu quả hơn",
            "Mặt bàn được làm bằng gỗ MDF cao cấp chống ẩm mốc, mối mọt, cong vênh, chất liệu cao cấp đặc biệt an toàn cho bé",
            "Mặt bàn được phủ lớp Mattle chống loá, chống bám bẩn, có thể vẽ bút dạ trực tiếp lên mặt bàn và lau chùi dễ dàng. Độ nghiêng mặt bàn điều chỉnh bằng nút vặn, linh hoạt từ 0-55 độ, phù hợp nhu cầu sử dụng khác nhau: viết, vẽ hoặc đọc sách..",
            "Bàn có ngăn kéo để đồ tiện dụng",
            "Chân bàn và chân ghế được thiết kế với khung trụ thép sơn tĩnh điện kiên cố, vững chắc, chống rung; Chân bàn và chân ghế nâng hạ theo khấc có thể dễ dàng điều chỉnh chiều cao phù hợp với vóc dáng bé."
        ],
        description: [
            "Tư duy sáng tạo và sức khỏe của con đều bắt đầu từ một không gian học tập tốt và tư thế ngồi đúng",
        ],
        benefits: []
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

    const [itemData, setItemData] = useState(i18n?.language === "en" ? itemDataEn : itemDataVi);
    
    useEffect(() => {
        setItemData(i18n?.language === "en" ? itemDataEn : itemDataVi)
    }, [i18n?.language])

    const handlePrevItem = () => {
        const prevItem = getPreviousIndex(activeItem, itemsImage.length);

        setActiveItem(prevItem);
    };

    const handleNextItem = () => {
        const nextItem = getNextIndex(activeItem, itemsImage.length);

        setActiveItem(nextItem);
    };

    var slugify = require('slugify')

    return (
            <div className="flex gap-10 flex-col py-6 md:py-12 w-container-large mx-auto">

                <FadeInOnScroll>
                    <div className="grid xl:grid-cols-2 gap-x-12 gap-y-12">
                        <div className="flex items-start gap-8 flex-col">
                            <div className="relative -xl:aspect-square xl:min-h-[600px] w-[90%] md:w-full">
                                {itemsImage.map((image, index) => (
                                    <Image key={index} src={image} alt="window preview image" 
                                    className={`object-cover w-full md:w-[95%] aspect-square absolute transition-all duration-100
                                    border border-neutral-300
                                    ${activeItem === index ? "z-10 top-4 md:bottom-0 left-4 md:right-0" 
                                    : getNextIndex(activeItem, itemsImage.length) === index 
                                    ? "top-2 md:bottom-8 left-2 md:right-8" 
                                    : "z-[-1] top-0 md:bottom-16 left-0 md:right-16"}`}/>
                                ))}
                                <div className="relative w-full md:w-[95%] aspect-square">
                                    <button className="bg-white hover:bg-red-500 rounded-[100%] absolute translate-y-1/2 translate-x--[100%]
                                    left-0 bottom-1/2 p-3 z-30 border hover:border-0" 
                                    onClick={handlePrevItem}>
                                        <div className="aspect-square w-5">
                                            <Image src={arrowUpIcon} alt="" className="rotate-[-90deg]" />
                                        </div>
                                    </button>
                                    <button className="bg-white hover:bg-red-500 rounded-[100%] absolute translate-y-1/2 translate-x-[100%]
                                    right-0 bottom-1/2 p-3 z-30 border hover:border-0" 
                                    onClick={handleNextItem}>
                                        <div className="aspect-square w-5">
                                            <Image src={arrowUpIcon} alt="" className="rotate-90" />
                                        </div>                                
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="">
                            {itemData.map((item, index) => (
                                <div key={index} className={`${index === activeItem ? "block" : "hidden"} animate-fade-in-up`}>
                                    <h2 className="text-neutral-800 font-medium text-3xl md:text-[3rem] leading-tight pb-4 border-b border-slate-300">
                                        {item.title}
                                    </h2>
                                    <div className="py-4 flex gap-6 flex-col">
                                        <div className="flex gap-3">
                                            <button className={`relative px-2.5 py-1 text-neutral-900 text-base md:text-2xl before:absolute overflow-hidden
                                            before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-neutral-900 
                                            before:transition-[transform] [&:hover]:before:translate-x-0 
                                            ${activeItemTab === 0 ? "before:translate-x-0" : "before:translate-x-[-100%]"}`}
                                            onClick={() => setActiveItemTab(0)}>
                                                {t("details")}
                                            </button>
                                            <button className={`relative px-2.5 py-1 text-neutral-900 text-base md:text-2xl before:absolute overflow-hidden
                                            before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-neutral-900 
                                            before:transition-[transform] [&:hover]:before:translate-x-0
                                            ${activeItemTab === 1 ? "before:translate-x-0" : "before:translate-x-[-110%]"}`}
                                            onClick={() => setActiveItemTab(1)}>
                                                {t("description")}
                                            </button>
                                            <button className={`relative px-2.5 py-1 text-neutral-900 text-base md:text-2xl before:absolute overflow-hidden
                                            before:left-0 before:bottom-0 before:h-[2px] before:w-full before:bg-neutral-900 
                                            before:transition-[transform] [&:hover]:before:translate-x-0
                                            ${activeItemTab === 2 ? "before:translate-x-0" : "before:translate-x-[-100%]"}`}
                                            onClick={() => setActiveItemTab(2)}>
                                                {t("benefits")}
                                            </button>
                                        </div>
                                        <ul className={`flex gap-3 flex-col list-disc list-inside items-start`}>
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
                                            <a href={`/${i18n?.language}/products/${slugify(itemDataVi[activeItem].title, {lower: true})}`}
                                            className="text-neutral-50 font-medium text-sm px-8 py-2 bg-red-600">
                                                {t('viewMore')}
                                            </a>
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