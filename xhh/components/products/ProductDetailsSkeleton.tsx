import { Fira_Sans } from 'next/font/google'

import Header from "../Header";
import Footer from "../Footer";

import { TFunction, i18n } from 'next-i18next';

const fira = Fira_Sans({ subsets: ['latin','vietnamese'], weight: ["300","400","500","600","700"] });
const ProductDetailsSkeleton = ({ t }: { t: TFunction}) => {

    return (
        <>
        <div className={`${fira.className} flex flex-col overflow-hidden`}>
          <Header
            t={t}
          />
  
          <main className="pt-[8rem] pb-[4rem] relative z-10 flex gap-12 flex-col">
            <div className="w-container-large mx-auto flex gap-12 items-start">
              <div className="w-[500px] h-[300px] bg-gray-200 animate-pulse">
              </div>

              <div className="flex gap-4 flex-col">
                <div className="h-8 bg-gray-200 w-[12rem]"></div>
                <div className="flex gap-4 flex-col">
                    <div className="h-12 bg-gray-200 w-[16rem]"></div>
                    <div className="h-4 bg-gray-200 w-24"></div>
                </div>
  
                <div className="h-32 bg-gray-200 w-[30rem]">
                </div>
                
                <h3 className="text-neutral-500">
                    <div className="h-4 bg-gray-200 w-[40rem]"></div>
                </h3>
              </div>
            </div>
          </main>
  
          <Footer
            t={t}
          />
        </div>
      </>
    )
};

export default ProductDetailsSkeleton;