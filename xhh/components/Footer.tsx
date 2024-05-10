import { TFunction } from "next-i18next"
import Image from "next/image";
import { facebookSmall, locationSmall, logoTextRed, mailSmall, phoneSmall } from "../public/assets";
import Link from "next/link";

const Footer = ({ t }: { t: TFunction}) => {

    return (
        <div className="bg-[#f6f6f6]">
            <div className="w-container-large mx-auto py-16 flex justify-between md:items-end -md:flex-col -md:gap-8 relative z-10">
                <div className="flex gap-4 flex-col md:w-1/3">
                    <div className="flex gap-2 flex-col">
                        <h3 className="text-neutral-800 font-semibold text-3xl">{t('contact')}</h3>
                        <span className="w-20 h-[2px] bg-red-600 rounded-2xl"></span>
                    </div>

                    <div className="flex gap-2.5 flex-col">
                        <div className="flex gap-2">
                            <div className="w-6 aspect-square flex items-center justify-center">
                                <Image src={locationSmall} alt="location icon" />
                            </div>
                            <h5>{t('addressDetails')}</h5>
                        </div>
                        <div className="flex gap-2">
                        <div className="w-6 aspect-square flex items-center justify-center">
                                <Image src={phoneSmall} alt="phone icon" />
                            </div>                            
                            <div className="flex flex-col">
                                <a target="_blank" href="https://zalo.me/0373522843">0373 522 843</a>
                            </div>                          
                        </div>
                        <div className="flex gap-2">
                            <div className="w-6 aspect-square flex items-center justify-center">
                                <Image src={mailSmall} alt="mail icon" />
                            </div>                            
                            <h5>sales@xhhome.vn</h5>
                        </div>
                        <a href="https://www.facebook.com/XuanHoaHome" target="_blank" className="flex gap-2">
                            <div className="w-6 aspect-square flex items-center justify-center">
                                <Image src={facebookSmall} alt="facebook icon" />
                            </div>                            
                            <h5>Xuân Hoà Home</h5>
                        </a>
                    </div>
                </div>            
            </div>
            <div className="bg-neutral-300 text-center py-4 text-neutral-50 text-sm">
                <h6>© 2023. XUÂN HOÀ HOME</h6>
            </div>
        </div>
    )
};

export default Footer;