import { TFunction } from "next-i18next"
import Image from "next/image";
import { bagIcon, locationIcon, officeImage, phoneIcon, planeIcon } from "../../public/assets";

const Contact = ({ t }: { t: TFunction}) => {

    return (
        <div className="grid md:grid-cols-2 pt-16">
              <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7183.454728012203!2d105.89936137403186!3d21.04217083353362!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135a99767260733%3A0xae3333b685a10ece!2sJOYA%20TRAVEL!5e0!3m2!1sen!2sus!4v1690964884442!5m2!1sen!2sus" 
              allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className="border flex-1 border-neutral-500 aspect-square h-full w-full">
              </iframe>
              <div className="bg-red-600 px-12 py-8 relative">
                <Image src={bagIcon} alt="office image" className="absolute z-[0] saturate-[0.2] opacity-10 pointer-events-none"/>
                <div className="relative z-10 text-neutral-50 flex gap-6 flex-col">
                    <div className="flex gap-3 flex-col">
                        <h2 className="text-[2rem] leading-tight font-medium">Contact us</h2>
                        <span className="w-20 h-1 bg-red-800 rounded-2xl"></span>
                        <p className="text-sm md:w-1/2">
                            Feel free to contact us with a project proposal, quote or estimation, 
                            or simply to say hello. Here’s our contact info.
                        </p>
                    </div>

                    <div className="flex gap-10 flex-col">
                        <div className="flex gap-8 items-center">
                            <Image src={locationIcon} alt="location icon" className=""/>
                            <div className="flex gap-2 items-start flex-col">
                                <h3 className="text-2xl font-medium">Address</h3>
                                <span className="w-10 h-[2px] bg-red-600 rounded-2xl"></span>
                                <h5>7 Yen The, Dien Bien, Ba Dinh, Ha Noi</h5>
                            </div>
                        </div>
                        <div className="flex gap-8 items-center">
                            <svg width="60" height="68" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18.5 14.42V17.956C18.5001 18.2092 18.4042 18.453 18.2316 18.6382C18.059 18.8234 17.8226 18.9363 17.57 18.954C17.133 18.984 16.776 19 16.5 19C7.663 19 0.5 11.837 0.5 3C0.5 2.724 0.515 2.367 0.546 1.93C0.563722 1.67744 0.676581 1.44101 0.861804 1.26841C1.04703 1.09581 1.29082 0.999886 1.544 1H5.08C5.20404 0.999875 5.3237 1.04586 5.41573 1.12902C5.50776 1.21218 5.5656 1.32658 5.578 1.45C5.601 1.68 5.622 1.863 5.642 2.002C5.84073 3.38892 6.248 4.73783 6.85 6.003C6.945 6.203 6.883 6.442 6.703 6.57L4.545 8.112C5.86445 11.1865 8.31455 13.6365 11.389 14.956L12.929 12.802C12.9919 12.714 13.0838 12.6509 13.1885 12.6237C13.2932 12.5964 13.4042 12.6068 13.502 12.653C14.767 13.2539 16.1156 13.6602 17.502 13.858C17.641 13.878 17.824 13.899 18.052 13.922C18.1752 13.9346 18.2894 13.9926 18.3724 14.0846C18.4553 14.1766 18.5002 14.2961 18.5 14.42Z" stroke="#FAFAFA"/>
                            </svg>                        
                            <div className="flex gap-2 items-start flex-col">
                                <h3 className="text-2xl font-medium">Call us now</h3>
                                <span className="w-10 h-[2px] bg-red-600 rounded-2xl"></span>
                                <div className="flex flex-col">
                                    <h5>English: 037 9748 073</h5>
                                    <h5>Tiếng Việt: 098 5080 324</h5>
                                </div>                        
                            </div>
                        </div>
                        <div className="flex gap-8 items-center">
                            <Image src={planeIcon} alt="location icon" className=""/>
                            <div className="flex gap-2 items-start flex-col">
                                <h3 className="text-2xl font-medium">Email us</h3>
                                <span className="w-10 h-[2px] bg-red-600 rounded-2xl"></span>
                                <h5>sales@xhhome.vn</h5>
                            </div>
                        </div>
                    </div>

                </div>
              </div>
        </div>

    )
};

export default Contact;