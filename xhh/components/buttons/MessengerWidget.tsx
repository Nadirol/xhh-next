import Image from "next/image";
import { messengerLogo } from "../../public/assets";

const MessengerWidget = () => {

    return (
        <a target="_blank" href="http://m.me/XuanHoaHome" className="rounded-[100%] overflow-hidden relative z-10 shadow-bold">
            <Image src={messengerLogo} alt="zalo logo" className="w-9 md:w-12 rounded-[100%] aspect-square"/>                
        </a>
    )
};

export default MessengerWidget;