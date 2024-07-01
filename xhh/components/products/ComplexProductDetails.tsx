import { TFunction, i18n } from 'next-i18next';
import { ICartProduct, IProduct } from '../../interface/interface';
import Image from 'next/image';
import Breadcrumb from '../Breadcrumb';
import { useEffect, useRef, useState } from 'react';
import BonusBanner from './BonusBanner';
import Widgets from '../Widgets';
import Link from 'next/link';
import { PortableText } from "@portabletext/react";
import { urlFor } from '../../lib/sanity';
import { arrowUpIcon } from '../../public/assets';
import { useRecoilState } from 'recoil';
import { cartState } from '../../atoms/cartState';
import { latestCartItemState } from '../../atoms/latestCartItemState';
import CartItemToast from '../CartItemToast';
import supabase from '../../supabase';

function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const useClickDetector = (refs: React.MutableRefObject<HTMLDivElement | null>[], func: () => void) => {
  useEffect(() => {
      const handleClickOutside = (event: any) => {
          if (!refs.some(ref => ref.current?.contains(event.target))) {
              func()
          }
      }

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
  },[refs[0]])
};

const ComplexProductDetails = ({ t, product, routes, relevantProducts, contentData }: 
  { t: TFunction, product: IProduct, routes: { name: string | undefined, path: string }[], relevantProducts: IProduct[], contentData: any}) => {
    const [activeImage, setActiveImage] = useState(0);
    const [activeType, setActiveType] = useState(0);

    const handleMouseEnterImage = (index: number) => {
      setActiveImage(index)
    };

    const [descriptionExpanded, setDescriptionExpanded] = useState(false)
    
    const PortableTextComponent = {
      types: {
        image: ({ value }: { value: any }) => (
          <Image
            src={urlFor(value).url()}
            alt="Image"
            className="rounded-lg"
            width={800}
            height={800}
          />
        ),
      },
    };

    const [selectedSize, setSelectedSize] = useState(0);

    const [cartItems, setCartItems] = useRecoilState(cartState);

    const [latestCartItem, setLatestCartItem] = useRecoilState(latestCartItemState);
    const [toastVisible, setToastVisible] = useState(false);

    const toastRef = useRef(null);

    const hideToast = () => {
      setToastVisible(false)
    }

    useClickDetector([toastRef], hideToast)

    const addItemToCart = () => {
      if (!product.price && !product.price_set ) {
        return 
      } 

      const productMainData: ICartProduct = {
        id: product.id,
        title_vi: product.title_vi + (product.price_set ? " " + product.price_set[selectedSize].size : "") + (product.color_set ? " " + product.color_set[selectedColor].color : ""),
        title_en: product.title_en + (product.price_set && product.price_set[selectedSize].size) + (product.color_set && product.color_set[selectedColor].color),
        category: product.category,
        image_url: product.image_url,
        slug: product.slug,
        price: product.price_set ? product.price_set[selectedSize].price : (product.price ? product.price : 0),
        quantity: addCount
      }

      setLatestCartItem({...productMainData, quantity: addCount});

      if (cartItems.findIndex((addedProduct) => addedProduct.slug === product.slug) === -1) {
        setCartItems((prevState: ICartProduct[]) => [...prevState, {...productMainData, quantity: addCount}]);
      } else {
        setCartItems((prevState) => prevState.map(item => {
          return item.slug === product.slug ? {...item, quantity: item.quantity + addCount} : {...item, quantity: addCount}
        }));
      };
      
      window.dispatchEvent(new Event("storage"));

      // setTimeout(() => hideToast(), 5000);
    };

    const [addCount, setAddCount] = useState(1);

    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        async function fetchData() {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('isNew', true)
            .range(0, 8)
            .order('title_vi', { ascending: false });
          
          if (error) {
            console.error('Error fetching data:', error);
          } else {
            setProducts(data.reverse());
          }
        }
    
        fetchData();
    }, []);

    const [selectedColor, setSelectedColor] = useState(0);
    const [activeColor, setActiveColor] = useState(0);

    return (
        <main className="pt-[2rem] relative flex gap-12 flex-col bg-slate-100">
          <div className="w-container-large mx-auto">
            <Breadcrumb t={t} routes={routes}/>
          </div>

          <div className="w-container-large mx-auto flex gap-12 -md:flex-col bg-white p-5">
            <div className="flex gap-12 flex-col">
              <div className="flex justify-center items-center md:min-w-[400px]">
                <Image src={product.color_set ? product.color_set[activeColor].image : (product.preview_images ? product.preview_images[activeImage] : product.image_url)} alt="product image" 
                width={630} height={630} className="w-full object-cover aspect-square"/>
              </div>

              {product.preview_images && (
                <div className="flex justify-between">
                  {product.preview_images.map((image, index) => (
                    <Image key={index} src={image} alt="preview image" 
                    width={210} height={210} className={`flex-[30%] aspect-square object-cover 
                    ${activeImage === index ? 'border-4' : ''} border-red-500`}
                    onMouseEnter={() => handleMouseEnterImage(index)}/>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-8 flex-col">
              <div className="flex gap-1 flex-col">
                <h1 className="text-neutral-800 font-semibold text-[1rem] xl:text-[2rem] leading-tight">{product.title_vi}</h1>
              </div>

              {product.price && (
                <div className="">
                  <h3 className='text-3xl font-semibold text-red-500'>{numberWithCommas(product.price)} &nbsp;
                    <span className='text-base text-neutral-800 font-normal'>vnđ</span> <br />
                    <span className='text-base text-neutral-800 font-normal'>&#40;{t('discount')} &#41;</span>
                  </h3>
                </div>
              )}

              {product.price_set && (
                <div className="flex gap-4 flex-col">
                  <div className="flex gap-2 items-center">
                    <h4 className='text-neutral-500 line-through'>
                      đ{numberWithCommas(product.price_set[selectedSize].fullPrice)}
                    </h4>
                    <h4 className='text-3xl font-semibold text-red-500'>{numberWithCommas(product.price_set[selectedSize].price)}
                      <span className='text-base font-normal'>đ</span> <br />
                    </h4>

                    <div className="bg-red-500 rounded-2xl text-white px-4 py-1 ml-4">
                      {product.price_set[selectedSize].discount + "% " + t('sale')}
                    </div>
                  </div>

                  <div className="flex gap-2.5 items-center">
                    {product.price_set.map((p, index) => (
                      <button key={index} onClick={() => setSelectedSize(index)} 
                      className={`px-4 py-2 border border-neutral-600 hover:border-red-500 transition-all
                      font-bold hover:text-red-500 ${selectedSize === index ? 'border-red-500 text-red-500' : ''}`}>
                        {p.size}
                      </button>
                    ))}
                  </div>

                </div>
              )}

              {product.color_set && (
                <div className="flex gap-5 flex-wrap items-center">
                  <span className='text-xl'>{t('color')}:</span>
                  {product.color_set.map((s, index) => (
                    <button key={index} onMouseEnter={() => setActiveColor(index)} onClick={() => setSelectedColor(index)} 
                    onMouseLeave={() => selectedColor !== index && setActiveColor(selectedColor)}
                    className={`px-4 py-2 border-2 text-semibold border-neutral-500 hover:border-red-500 hover:text-red-500 
                    flex gap-2 items-center w-fit text-neutral-500 ${(selectedColor === index || activeColor === index) ? "text-red-500 border-red-500" : ""}`}>
                      <Image width={30} height={30} src={s.image} alt="" />
                      <span>{s.color}</span>
                    </button>
                  ))}
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
                <div className="flex gap-2 flex-col bg-zinc-100 p-5 w-[90%]">
                  <ul className="flex gap-2 flex-col list-disc list-inside">
                    {(i18n?.language === "vi" ? product.description_vi : product.description_en).map((d, index) => (
                      <li key={index} className="text-neutral-700">{d}</li>
                    ))}
                    {product.bonus && (
                      <li className="text-neutral-700">{t('bonus')}: {product.bonus?.join(', ')}</li>
                    )}
                  </ul>
                </div>
              )}

              {(product.specific_description_vi && product.specific_description_en) && (
                <div className="flex gap-4 flex-col">
                  <ul className="flex gap-4 flex-col list-disc list-inside">
                    {Object.keys((i18n?.language === "vi"
                      ? product.specific_description_vi
                      : product.specific_description_en) ?? {}).map((key, index) => key !== "product_type" && (
                        <li key={index} className="text-neutral-800 font-medium text-xl">
                          <span className="text-neutral-800 font-normal text-xl">
                            {t(key)}:&nbsp;
                            {(i18n?.language === "vi"
                              ? product.specific_description_vi
                              : product.specific_description_en)?.[key]}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              <div className="flex gap-2 items-center">
                <span className=''>{t('amount')}:</span>
                <input type="number" className='pl-4 pr-2 py-2 w-[3.5rem] border' value={addCount} onChange={(e) => setAddCount(parseInt(e.target.value))}/>

                <Link href={`/${i18n?.language}/cart`}  onClick={() => addItemToCart()}
                className='px-10 py-2 rounded bg-red-500 w-fit text-white hover:bg-red-700  font-semibold'>
                  {t('buy')}
                </Link>

                <button onClick={() =>{ addItemToCart(); setToastVisible(true)}}
                className='px-10 py-2 rounded bg-blue-500 w-fit text-white hover:bg-blue-700  font-semibold'>
                  {t('addToCart')}
                </button>
              </div>
            </div>
          </div>

          {(contentData) && (
            <div className={`w-container-large mx-auto flex gap-3 flex-col bg-white p-12 mb-4
            ${descriptionExpanded ? '' : 'max-h-[600px] after:from-white after:to-transparent after:bg-gradient-to-t' } overflow-hidden relative
            after:absolute after:z-[10] after:left-0 after:bottom-0 after:h-[300px] after:w-full`}>
              <h3 className='text-center text-[#444] text-[30px] font-bold pb-[22px] mb-[25px] relative
                before:absolute before:right-1/2 before:bottom-0 before:h-[1px] before:w-8 before:bg-red-500 before:translate-x-1/2'>{t('details')}</h3>

              <div className={`text-zinc-600 text-xl
                flex gap-4 flex-col mb-8 [&>ul]:list-disc [&>ul]:list-inside [&>ol]:list-decimal [&>ol]:list-inside
                [&>h1]:font-bold [&>h2]:font-bold [&>h3]:font-bold [&>h4]:font-bold [&>h5]:font-bold [&>h6]:font-bold
                [&>h1]:text-4xl [&>h2]:text-3xl [&>h3]:text-2xl [&>h4]:text-xl [&>h5]:text-lg
                [&>img]:h-1/2 [&>img]:w-1/2 [&>img]:mx-auto text-justify`}>
                  <PortableText
                    value={contentData.content}
                    components={PortableTextComponent}
                  />
              </div>

              <button className="absolute z-[20] bottom-4 right-1/2 translate-x-1/2 p-2" onClick={() => setDescriptionExpanded(prevState => !prevState)}>
                <Image src={arrowUpIcon} alt="arrow down icon" className={`${descriptionExpanded ? '' : 'rotate-180'}`}/>
              </button>
            </div>
          )}

          <div className="">
            <h2 className="text-center text-[#444] text-[30px] font-bold pb-[22px] mb-[25px] relative
                before:absolute before:right-1/2 before:bottom-0 before:h-[1px] before:w-8 before:bg-red-500 before:translate-x-1/2">
              {t('similarProducts')}
            </h2>

            <div className="relative w-container mx-auto grid md:grid-cols-2 xl:grid-cols-4">          
              {relevantProducts.map((i, index) => (
                      <Link href={`/${i18n?.language}/products/${i.slug}`} key={index} 
                      className="flex gap-2.5 flex-col justify-between w-product-card min-w-[300px] snap-start min-h-[422px] -md:mx-auto
                      [&:hover>.absolute>img]:scale-[1.05] p-[15px] pb-[20px] hover:shadow-card transition-all duration-500">
                      <div className="">
                          <div className="overflow-hidden">
                              <Image src={i.image_url} alt="curtain image" width={400} height={400} className="object-cover
                              transition-[transform] duration-700 min-h-[300px]"/>
                          </div>
                          <h3 className="text-[#434343] mb-[5px] font-semibold">{i.title_vi.toUpperCase()}</h3>
                      </div>

                      <div className="w-full relative z-10 items-center
                      transition-[padding] duration-700">
                          <div className="w-full flex justify-between items-center">
                              {i.price && (
                                  <h3 className="text-xl text-red-500 font-bold">
                                      {numberWithCommas(i.price)} đ
                                  </h3>
                              )}

                              <div className={`${i.price ? "flex flex-col items-end" : "w-full flex justify-between items-center"}`}>
                                  <h5>
                                      {t(i.category)}
                                  </h5>
                              </div>
                          </div>
                      </div>
                      </Link>
                  ))}
            </div>
          </div>

          {toastVisible && (
            <CartItemToast
              item={latestCartItem}
              t={t}
              toastRef={toastRef}
              cartItems={cartItems}
              toastVisible={toastVisible}
              setToastVisible={setToastVisible}
              selectedSize={selectedSize}
              products={products}
            />
          )}

          <div className={`bg-filter-dark w-screen h-screen fixed inset-0 z-[40] ${toastVisible ? "" : "hidden"}`}></div>

          <BonusBanner t={t}/>
          <Widgets t={t}/>

        </main>
    )
};

export default ComplexProductDetails;