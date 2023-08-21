import { TFunction } from "next-i18next"
import ProductCard from "../cards/ProductCard";
import { IProduct } from "../../interface/interface";
import { useEffect, useRef, useState } from "react";
import supabase from "../../supabase";
import MoveSliderButton from "../buttons/MoveSliderButton";

const RelatedProducts = ({ t, product }: { t: TFunction, product: IProduct }) => {
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const itemsPerPage = 4;
    const [totalFetchedItems, setTotalFetchedItems] = useState(0);
    const [fetchMoreVisible, setFetchMoreVisible] = useState(true)

    const fetchInitialItems = async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('product_type', product?.product_type)
          .range(totalFetchedItems, totalFetchedItems + itemsPerPage - 1);
    
        if (data) {
            setRelatedProducts(data);
            setTotalFetchedItems(data.length);
            setFetchMoreVisible(data.length > 3);
        }
    
        if (error) {
            console.error('Error fetching data:', error);
        }
      };

    const fetchRelatedProducts = async () => {
      async function fetchData() {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', product?.category)
          .range(totalFetchedItems, totalFetchedItems + itemsPerPage - 1);

        if (data) {
            setRelatedProducts((prevItems) => [...prevItems, ...data]);
            setTotalFetchedItems((prevTotal) => prevTotal + data.length);
            setFetchMoreVisible(data.length > 3);
        }

        if (error) {
          console.error('Error fetching data:', error);
        }
      }
  
      fetchData();
    };
  
    useEffect(() => {
        fetchInitialItems();
    }, []);

    const handleLoadMore = () => {
        fetchRelatedProducts();
    };

    const sliderRef = useRef<HTMLDivElement>(null);

    const prevSlide = () =>
        sliderRef?.current?.scrollBy({
        top: 0,
        left: -100,
        behavior: "smooth",
        });

    const nextSlide = () => {
        sliderRef?.current?.scrollBy({
        top: 0,
        left: 200,
        behavior: "smooth",
        });
    };

    return (
        <div className="w-container-large mx-auto flex gap-4 flex-col">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-start w-fit">
                <h3 className="text-neutral-800 font-semibold text-3xl mb-2">You may also like</h3>
                <span className="w-full h-1 bg-red-500"></span>
              </div>
              <div className="">
                <MoveSliderButton direction="prev" handleClick={prevSlide}/>
                <MoveSliderButton direction="next" handleClick={nextSlide}/>
              </div>
            </div>

            <div className="flex gap-12 items-center overflow-x-scroll scrollbar-hide snap-x pr-4" ref={sliderRef}>
                {relatedProducts?.map((p, index) => (
                <ProductCard key={index} title={p.title_vi} image={p.image_url} slug={p.slug}/>
                ))}
                {fetchMoreVisible && (
                <button className="hover:pl-2 transition-[padding]" onClick={handleLoadMore}>
                    <svg width="32" height="24" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z" fill="#171717"/>
                    </svg>
                </button>
                )}
            </div>
        </div>
    )
};

export default RelatedProducts;