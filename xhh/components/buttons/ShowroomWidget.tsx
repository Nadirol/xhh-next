import { TFunction, i18n } from "next-i18next";
import Image from "next/image";
import { locationIcon } from "../../public/assets";
import Link from "next/link";

const ShowroomWidget = ({ t }: { t: TFunction }) => {

    return (
        <Link target="_blank" href={`/${i18n?.language}/contact`} className="flex gap-2 flex-col items-center relative z-30 -md:hidden">
            <div className="rounded-[100%] bg-red-500 p-2 md:p-3 relative z-50 shadow-bold">
                <div className="aspect-square w-5">
                    <Image src={locationIcon} alt="zalo logo" className="m-auto"/>                
                </div>
            </div>

            <h6 className="relative z-30 text-xs md:text-sm text-red-500 font-semibold">Showroom</h6>
        </Link>
    )
};

export default ShowroomWidget;