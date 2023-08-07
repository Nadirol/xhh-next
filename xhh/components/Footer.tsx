import { TFunction } from "next-i18next"
import Image from "next/image";
import { facebookIcon, facebookSmall, locationSmall, mailSmall, phoneSmall } from "../public/assets";

const Footer = ({ t }: { t: TFunction}) => {

    return (
        <div className="">
            <div className="relative min-h-[30rem]">
                <div className="bg-center bg-cover h-full absolute inset-0 bg-footer-background opacity-[0.125] saturate-[0.1]"></div>
                <div className="w-container-large mx-auto py-8 relative z-10 border-b border-stone-300">
                    <h2 className="text-neutral-800 font-bold text-4xl text-center">LOGO</h2>
                </div>

                <div className="w-container-large mx-auto py-8 flex justify-between md:items-end -md:flex-col -md:gap-8">
                    <div className="flex gap-4 flex-col md:w-1/3">
                        <h3 className="text-neutral-800 font-semibold text-3xl">Lets design together</h3>
                        <span className="w-20 h-1 bg-red-800 rounded-2xl"></span>
                        <p>
                            One of the reasons we became interior designers in the first place was because we love collecting and 
                            then putting it all together. But when youre designing your own house, the hardest thing is to finish it, 
                            as youre always adding your next favourite thing, and finally theres no space left.

                        </p>
                    </div>

                    <div className="flex gap-4 flex-col md:w-1/3">
                        <h3 className="text-neutral-800 font-semibold text-3xl">Contact</h3>
                        <span className="w-20 h-1 bg-red-600 rounded-2xl"></span>
                        <div className="flex gap-2.5 flex-col">
                            <div className="flex gap-2">
                                <div className="w-6 aspect-square flex items-center justify-center">
                                    <Image src={locationSmall} alt="location icon" />
                                </div>
                                <h5>7 Yen The, Dien Bien, Ba Dinh, Ha Noi</h5>
                            </div>
                            <div className="flex gap-2">
                            <div className="w-6 aspect-square flex items-center justify-center">
                                    <Image src={phoneSmall} alt="phone icon" />
                                </div>                            
                                <div className="flex flex-col">
                                    <h5>English: 037 9748 073</h5>
                                    <h5>Tiếng Việt: 098 5080 324</h5>
                                </div>                          
                            </div>
                            <div className="flex gap-2">
                                <div className="w-6 aspect-square flex items-center justify-center">
                                    <Image src={mailSmall} alt="mail icon" />
                                </div>                            
                                <h5>sales@xhhome.vn</h5>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-6 aspect-square flex items-center justify-center">
                                    <Image src={facebookSmall} alt="facebook icon" />
                                </div>                            
                                <h5>Xuân Hoà Home</h5>
                            </div>
                        </div>
                    </div>            
                </div>
            </div>
            <div className="bg-red-600 text-center py-2 text-neutral-50 text-sm">
                <h6>© 2023. XUÂN HOÀ HOME</h6>
            </div>
        </div>
    )
};

export default Footer;