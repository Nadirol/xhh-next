import { TFunction } from "next-i18next";
import Image from "next/image";
import { zaloLogo } from "../../public/assets";

const ZaloWidget = ({ t }: { t: TFunction }) => {

    return (
        <a target="_blank" href="https://zalo.me/0373522843" className="rounded-[100%] overflow-hidden relative z-10 shadow-bold">
            <Image src={zaloLogo} alt="zalo logo" className="w-9 md:w-12 rounded-[100%] aspect-square"/>                
        </a>
    )
};

export default ZaloWidget;