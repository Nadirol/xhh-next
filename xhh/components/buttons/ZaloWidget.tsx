import { TFunction } from "next-i18next";
import Image from "next/image";
import { zaloLogo } from "../../public/assets";

const ZaloWidget = ({ t }: { t: TFunction }) => {

    return (
        <a target="_blank" href="https://zalo.me/0373522843" className="rounded-[100%] overflow-hidden relative z-10">
            <Image src={zaloLogo} alt="zalo logo" className="w-9 md:w-12 rounded-[100%] aspect-square shadow-card-extrasemibold"/>                
        </a>
    )
};

export default ZaloWidget;