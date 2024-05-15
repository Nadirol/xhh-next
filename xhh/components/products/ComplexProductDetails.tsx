

import { TFunction, i18n } from 'next-i18next';
import { IProduct } from '../../interface/interface';
import Image from 'next/image';
import Breadcrumb from '../Breadcrumb';
import { useState } from 'react';
import BonusBanner from './BonusBanner';
import Widgets from '../Widgets';

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const ComplexProductDetails = ({ t, product, routes }: { t: TFunction, product: IProduct, routes: { name: string | undefined, path: string }[]}) => {
    const [activeImage, setActiveImage] = useState(0);
    const [activeType, setActiveType] = useState(0);

    const handleMouseEnterImage = (index: number) => {
      setActiveImage(index)
    };

    return (
        <main className="pt-[8rem] relative z-10 flex gap-12 flex-col">
          <div className="w-container-large mx-auto flex gap-12 -md:flex-col">

            <div className="flex gap-12 flex-col">
              <div className="flex justify-center items-center md:min-w-[400px]">
                <Image src={product.preview_images ? product.preview_images[activeImage] : product.image_url} alt="product image" 
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

              {product.price && (
                <div className="">
                  <h3 className='text-3xl font-semibold text-red-500'>{numberWithCommas(product.price)} &nbsp;
                  <span className='text-base text-neutral-800 font-normal'>vnđ</span> <br />
                  <span className='text-base text-neutral-800 font-normal'>&#40;{t('discount')} &#41;</span>
                  </h3>
                </div>
              )}

              {(product.features_vi && product.features_en) && (
                <div className="flex gap-6 justify-between w-full">
                  {(i18n?.language === 'vi' ? product.features_vi : product.features_en)?.map((f, index) => (
                    <div key={index} className="flex gap-3 flex-col items-center">
                      <div className="p-2.5 rounded-[100%] bg-white">
                        <div className="w-16 aspect-square">
                          <Image src={f.icon} alt="icon" className="w-16" width={64} height={64}/>
                        </div>
                      </div>

                      <h3 className="text-center max-w-[6rem]">
                        {f.feature}
                      </h3>
                    </div>
                  ))}
                </div>
              )}

              {(product.description_vi && product.description_en) && (
                <div className="w-container-large mx-auto flex gap-4 flex-col">
                  <h3 className="text-neutral-800 font-semibold text-2xl underline">{t('details')}</h3>
                  <ul className="flex gap-4 flex-col list-disc list-inside">
                    {(i18n?.language === "vi" ? product.description_vi : product.description_en).map((d, index) => (
                      <li key={index} className="text-neutral-700 text-xl">{d}</li>
                    ))}
                  </ul>
                </div>
              )}

              {(product.specific_description_vi && product.specific_description_en) && (
                <div className="flex gap-4 flex-col">
                  <ul className="flex gap-4 flex-col list-disc list-inside pb-4 border-b">
                    {Object.keys((i18n?.language === "vi"
                      ? product.specific_description_vi
                      : product.specific_description_en)?.[activeType] ?? {}).map((key, index) => key !== "product_type" && (
                        <li key={index} className="text-red-700 font-medium text-2xl">
                          <span className="relative">{t(key)}:</span>
                          {Array.isArray((i18n?.language === "vi"
                              ? product.specific_description_vi
                              : product.specific_description_en)?.[activeType]?.[key])
                            ? (
                              <ul className="flex gap-2 flex-col text-neutral-800 font-normal text-sm ml-6 mt-1">
                              {(i18n?.language === "vi"
                                ? product.specific_description_vi
                                : product.specific_description_en)?.[activeType]?.[key]?.map((s: string, index: number) => (
                                  <li key={index}>- {s}</li>
                                ))}
                            </ul>
                            )
                            : (
                              <h3 className="text-neutral-800 font-normal text-sm ml-6 mt-1">
                                {(i18n?.language === "vi"
                                  ? product.specific_description_vi
                                  : product.specific_description_en)?.[activeType]?.[key]}
                              </h3>
                            )
                          }

                        </li>
                      ))}
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
          <BonusBanner t={t}/>
          <Widgets t={t}/>

        </main>
    )
};

export default ComplexProductDetails;