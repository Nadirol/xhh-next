

import { TFunction, i18n } from 'next-i18next';
import { IProduct } from '../../interface/interface';
import Image from 'next/image';
import Breadcrumb from '../Breadcrumb';
import { logoRed, logoTextWhite } from '../../public/assets';
import { useState } from 'react';
import BonusBanner from './BonusBanner';
import CallWidget from '../buttons/CallWidget';
import ZaloWidget from '../buttons/ZaloWidget';
import Widgets from '../Widgets';

const ComplexProductDetails = ({ t, product, routes }: { t: TFunction, product: IProduct, routes: { name: string | undefined, path: string }[]}) => {
    const [activeImage, setActiveImage] = useState(0);
    const [activeType, setActiveType] = useState(0);

    const handleMouseEnterImage = (index: number) => {
      setActiveImage(index)
    }

    return (
        <main className="pt-[8rem] relative z-10 flex gap-12 flex-col">
          <div className="w-container-large mx-auto flex gap-12 -md:flex-col">

            <div className="flex gap-12 flex-col">
              <div className="flex justify-center items-center md:min-w-[400px]">
                <Image src={product.preview_images ? product.preview_images[activeImage] : logoRed} alt="product image" 
                width={300} height={300} className="w-3/4 object-cover aspect-square"/>
              </div>

              {product.preview_images && (
                <div className="flex justify-between">
                  {product.preview_images.map((image, index) => (
                    <Image key={index} src={image} alt="preview image" 
                    width={100} height={100} className={`flex-[30%] aspect-square object-cover 
                    ${activeImage === index ? 'border-4' : ''} border-red-500`}
                    onMouseEnter={() => handleMouseEnterImage(index)}/>
                  ))}
                </div>
              )}

            </div>

            <div className="flex gap-4 flex-col">
              <Breadcrumb t={t} routes={routes}/>
              <div className="flex gap-1 flex-col">
                <h1 className="text-neutral-800 font-semibold text-[2rem] xl:text-[4rem] leading-tight">{product.title_vi}</h1>
              </div>

              {(product.specific_description_vi && product.specific_description_en) && (
                <div className="flex gap-4 flex-col">
                  <div className="flex">
                    {(i18n?.language === "vi" ? product.specific_description_vi : product.specific_description_en).map((d, index) => (
                      <button key={index} onClick={() => setActiveType(index)}
                      className={`-md:text-sm xl:text-xl px-6 py-2  
                      ${activeType === index ? "bg-red-500 text-neutral-50" : "text-neutral-700 border border-neutral-400"}`}>
                        {d.product_type}
                      </button>
                    ))}
                  </div>

                  <ul className="flex gap-4 flex-col list-disc list-inside pb-4 border-b">
                    <li className='text-red-700 font-medium text-2xl'>
                      <span className='relative'>{t('size')}:</span>
                      <ul className="flex gap-2 flex-col text-neutral-800 font-normal text-sm ml-6 mt-1">
                        {(i18n?.language === "vi" ? product.specific_description_vi : product.specific_description_en)[activeType].size.map((s, index) => (
                          <li key={index}>- {s}</li>
                        ))}
                      </ul>
                    </li>

                    <li className='text-red-700 font-medium text-2xl'>
                      <span className='relative'>{t('specs')}:</span>
                      <ul className="flex gap-2 flex-col text-neutral-800 font-normal text-sm ml-8 mt-1">
                        {(i18n?.language === "vi" ? product.specific_description_vi : product.specific_description_en)[activeType].specs.map((s, index) => (
                          <li key={index}>- {s}</li>
                        ))}
                      </ul>
                    </li>

                    <li className='text-red-700 font-medium text-2xl'>
                      <span className='relative'>
                        {t('colors') + ": "}
                      </span>  
                      <span className='text-neutral-800 font-normal text-sm relative'>
                        {(i18n?.language === "vi" 
                        ? product.specific_description_vi 
                        : product.specific_description_en)[activeType].colors}
                      </span>
                    </li>
                  </ul>
                </div>
              )}

              <div className="flex gap-2 flex-col">
                <h3 className='text-red-700 font-medium'>{t('guarantee')}:</h3>
                <ul className='list-disc ml-8 text-neutral-800 text-sm'>
                  <li>{t('guarantee1')}</li>
                  <li>{t('guarantee2')}</li>
                  <li>{t('guarantee3')}</li>
                  <li>{t('guarantee4')}</li>
                </ul>
              </div>

            </div>
          </div>

          {(product.details_vi && product.details_en) && (
            <div className="w-container-large mx-auto flex gap-4 flex-col">
              <h3 className="text-neutral-800 font-semibold text-2xl underline">{t('benefits')}</h3>
              <ul className="flex gap-4 flex-col list-disc list-inside">
                {(i18n?.language === "vi" ? product.details_vi : product.details_en).map((d, index) => (
                  <li key={index} className="text-neutral-700 text-xl">{d}</li>
                ))}
              </ul>
            </div>
          )}

          <BonusBanner t={t}/>
          <Widgets t={t}/>

        </main>
    )
};

export default ComplexProductDetails;