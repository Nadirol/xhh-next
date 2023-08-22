import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { locationIcon, zaloLogo } from "../../public/assets";
import Link from "next/link";

const ShowroomWidget = ({ t }: { t: TFunction }) => {

    return (
        <Link target="_blank" href={`/${i18n?.language}/contact`} className="flex gap-2 flex-col items-center ">
            <div className="rounded-[100%] overflow-hidden relative z-10 bg-red-500 p-3 aspect-square shadow-bold">
                <Image src={locationIcon} alt="zalo logo" className="m-auto"/>                
            </div>
            <h6 className="text-sm text-red-500">Showroom</h6>
        </Link>
    )
};

export default ShowroomWidget;