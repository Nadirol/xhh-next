import { TFunction } from "next-i18next"
import Image from "next/image";
import FadeInOnScroll from "../animated/FadeInOnScroll";
import { interiorImage1, interiorImage2, interiorImage3, interiorImage4 } from "../../public/assets";
import ProductCard from "../cards/ProductCard";

const interiorImages = [{ image: interiorImage1, title: "Holz", id: "63V93W6D" }, { image: interiorImage2, title: "Bonita", id: "11SJ1HQZ" }, 
{ image: interiorImage3, title: "Belling", id: "NZPSA20W" }, { image: interiorImage4, title: "Leo", id: "86M1IMJS" }, 
{ image: interiorImage4, title: "Orion", id: "U4JKQXUE" }, { image: interiorImage1, title: "Fetra", id: "P2GTPI4A" }, 
{ image: interiorImage2, title: "Jasmine", id: "A9D2X2NW" }, { image: interiorImage3, title: "Alice", id: "W7AC6NYS" }];

const ProductList = ({ t }: { t: TFunction}) => {

    return (
        <div className="w-container-large mx-auto ">
            <div className="grid gap-y-12 grid-cols-3">
                {interiorImages.map((item, index) => (
                    <ProductCard key={index} title={item.title} image={item.image} id={item.id}/>
                ))
                }
            </div>

        </div>
    )
};

export default ProductList;