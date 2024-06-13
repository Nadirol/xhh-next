import { TFunction } from "next-i18next"
import ProductCard from "../cards/ProductCard";
import { ICartProduct, IProduct } from "../../interface/interface";
import { useRecoilState } from "recoil";

import { useEffect, useRef, useState } from "react";
import { latestCartItemState } from "../../atoms/latestCartItemState";
import { cartState } from "../../atoms/cartState";
import CartItemToast from "../CartItemToast";

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

const ProductList = ({ t, products, sortItems, sortOption }: { t: TFunction, products: IProduct[], sortItems: any, sortOption: any }) => {
    const [cartItems, setCartItems] = useRecoilState(cartState);

    const [latestCartItem, setLatestCartItem] = useRecoilState(latestCartItemState);
    const [toastVisible, setToastVisible] = useState(false);

    const toastRef = useRef(null);

    const hideToast = () => {
      setToastVisible(false)
    }
  
    useClickDetector([toastRef], hideToast)
  
    const addItemToCart = (product: IProduct) => {
      if (!product.price && !product.price_set ) {
        return 
      }
  
      const productMainData: ICartProduct = {
        id: product.id,
        title_vi: product.title_vi,
        title_en: product.title_en,
        category: product.category,
        image_url: product.image_url,
        slug: product.slug,
        price: product.price_set ? product.price_set[0].price : (product.price ? product.price : 0),
        quantity: 1
      }
  
      setLatestCartItem({...productMainData, quantity: 1});
  
      if (cartItems.findIndex((addedProduct) => addedProduct.slug === product.slug) === -1) {
        setCartItems((prevState: ICartProduct[]) => [...prevState, {...productMainData, quantity: 1}]);
      } else {
        setCartItems((prevState) => prevState.map(item => {
          return item.slug === product.slug ? {...item, quantity: item.quantity + 1} : {...item, quantity: 1}
        }));
      };
      
      window.dispatchEvent(new Event("storage"));
  
      setToastVisible(true);
  
    };

    return (
        <div className="w-container-large mx-auto ">
            {products && (
                <div className="grid gap-4 md:gap-y-10 md:grid-cols-2 xl:grid-cols-3 mb-4">
                    {sortItems(sortOption, products)?.map((item: IProduct, index: number) => (
                        <ProductCard key={index} product={item} t={t} addItemToCart={addItemToCart}/>
                    ))
                    }
                </div>
            )}

            {toastVisible && (
                <CartItemToast
                    item={latestCartItem}
                    t={t}
                    toastRef={toastRef}
                    cartItems={cartItems}
                    toastVisible={toastVisible}
                    setToastVisible={setToastVisible}
                    selectedSize={0}
                    products={products}
                />
            )}

            <div className={`bg-filter-dark w-screen h-screen fixed inset-0 z-[40] ${toastVisible ? "" : "hidden"}`}></div>
        </div>
    )
};

export default ProductList;

