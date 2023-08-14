import { TFunction } from "next-i18next"
import ProductCard from "../cards/ProductCard";
import { IProduct } from "../../interface/interface";
import { useEffect, useState } from "react";
import supabase from "../../supabase";

const RelatedProducts = ({ t, product }: { t: TFunction, product: IProduct }) => {
    const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
    const itemsPerPage = 4;
    const [totalFetchedItems, setTotalFetchedItems] = useState(0);
    const [fetchMoreVisible, setFetchMoreVisible] = useState(true)

    const fetchInitialItems = async () => {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', product?.category)
          .range(totalFetchedItems, totalFetchedItems + itemsPerPage);
    
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
      console.log("fetching")
      async function fetchData() {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', product?.category)
          .range(totalFetchedItems, totalFetchedItems + itemsPerPage);

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

    return (
        <div className="w-container-large mx-auto">
            <div className="flex flex-col items-start w-fit">
            <h3>You may also like</h3>
            <span className="w-full h-1 bg-red-500"></span>
            </div>
            <div className="flex gap-4 items-center">
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