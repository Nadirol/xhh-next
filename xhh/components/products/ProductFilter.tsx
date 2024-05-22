import { TFunction, i18n } from "next-i18next"
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import slugify from "slugify";

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

const ProductFilter = ({ t, productCount, setSizes, tableSizes, sortOption, setSortOption, sortOptionsVisible, optionsRef, buttonRef, sortOptions, setSortOptionsVisible, size }
    : { t: TFunction, productCount: number, setSizes: string[], tableSizes: string[], sortOption: string, setSortOption: any, sortOptionsVisible: boolean,
        optionsRef: any, buttonRef: any, sortOptions: string[], setSortOptionsVisible: any, size:string | null
     }) => {
    const [categoryDropdownVisible, setCategoryDropdownVisible] = useState(false);
    const categoryDropdownRef = useRef(null);
    const categoryButtonRef = useRef(null);
    
    const hideCategories = () => {
        setCategoryDropdownVisible(false)
    };

    useClickDetector([categoryDropdownRef, categoryButtonRef], hideCategories);

    const [sizeDropdownVisible, setSizeDropdownVisible] = useState(false);
    const sizeDropdownRef = useRef(null);
    const sizeButtonRef = useRef(null);
    
    const hideSizes = () => {
        setSizeDropdownVisible(false)
    };

    useClickDetector([sizeDropdownRef, sizeButtonRef], hideSizes);

    return (
        <div className="w-container-large mx-auto flex justify-between items-center bg-white px-[30px] py-4">
            <div className="flex gap-5 text-[#999] text-base items-center">
                <button className="border border-[#999] pl-4 pr-2 py-1 rounded flex gap-2 items-center relative" ref={categoryButtonRef}
                onClick={() => setCategoryDropdownVisible(true)}>
                    {t('categories')}

                    <svg className="rotate-90" fill="#999" height="12" width="12" version="1.1" 
                        viewBox="0 0 330 330">
                        <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                        c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                        C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                        C255,161.018,253.42,157.202,250.606,154.389z"/>
                    </svg>

                    <div ref={categoryDropdownRef} 
                    className={`absolute z-30 left-0 top-0 translate-y-[20%] bg-white flex gap-2 flex-col border border-neutral-400 rounded
                    ${categoryDropdownVisible ? "" : "hidden"}`}>
                        <Link href={`/${i18n?.language}/products`} className="py-2 px-8 hover:bg-red-500 hover:text-white whitespace-nowrap">
                            {t('all')}
                        </Link>

                        <Link href={`/${i18n?.language}/products?category=table-and-chair`} className="py-2 px-6 hover:bg-red-500 hover:text-white">
                            {t('table-and-chair')}
                        </Link>

                        <Link href={`/${i18n?.language}/products?category=single-table`} className="py-2 px-6 hover:bg-red-500 hover:text-white">
                            {t('single-table')}
                        </Link>

                        <Link href={`/${i18n?.language}/products?category=single-chair`} className="py-2 px-6 hover:bg-red-500 hover:text-white">
                            {t('single-chair')}
                        </Link>

                        <Link href={`/${i18n?.language}/products?category=shelf`} className="py-2 px-6 hover:bg-red-500 hover:text-white">
                            {t('shelf')}
                        </Link>
                    </div>
                </button>

                <button className="border border-[#999] pl-4 pr-2 py-1 rounded flex gap-2 items-center relative" ref={sizeButtonRef}
                onClick={() => setSizeDropdownVisible(true)}>
                    {t('size')}

                    <svg className="rotate-90" fill="#999" height="12" width="12" version="1.1" 
                        viewBox="0 0 330 330">
                        <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                        c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                        C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                        C255,161.018,253.42,157.202,250.606,154.389z"/>
                    </svg>

                    <div ref={sizeDropdownRef} 
                    className={`absolute z-30 left-0 top-0 translate-y-[25%] bg-white flex gap-2 flex-col border border-neutral-400 rounded
                    ${sizeDropdownVisible ? "" : "hidden"} p-4`}>
                        <div className="flex gap-2.5">
                            <span className="whitespace-nowrap py-1 min-w-[80px]">{t('table-and-chair')}:</span>

                            <div className="flex gap-1 w-[400px] flex-wrap">
                                {setSizes.map(s => (
                                    <Link key={s} className={`border border-[#999] px-4 py-1 rounded whitespace-nowrap hover:bg-red-500 hover:text-white
                                    ${size === slugify(s) ? 'bg-red-500 text-white' : ''}`} 
                                    href={`/${i18n?.language}/products?category=table-and-chair&size=${slugify(s)}`}>
                                        {s}
                                    </Link>
                                ))}

                                {size && setSizes.includes(size) && (
                                    <Link className={`border border-[#999] px-2 py-1 rounded whitespace-nowrap hover:bg-red-500 hover:text-white}`} 
                                    href={`/${i18n?.language}/products?category=table-and-chair`}>
                                        {t('cancel')}
                                    </Link>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-2.5">
                            <span className="whitespace-nowrap py-1 min-w-[80px]">{t('single-table')}:</span>

                            <div className="flex gap-1 w-[400px] flex-wrap">
                                {tableSizes.map((s, index) => (
                                    <Link key={index} className={`border border-[#999] px-4 py-1 rounded whitespace-nowrap hover:bg-red-500 hover:text-white
                                    ${size === slugify(s) ? 'bg-red-500 text-white' : ''}`}
                                    href={`/${i18n?.language}/products?category=single-table&size=${slugify(s)}`}>
                                        {s}
                                    </Link>
                                ))}

                                {(size && tableSizes.includes(size.replaceAll("-"," "))) && (
                                    <Link className={`border border-[#999] px-2 py-1 rounded whitespace-nowrap hover:bg-red-500 hover:text-white}`} 
                                    href={`/${i18n?.language}/products?category=single-table`}>
                                        {t('cancel')}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            <div className="flex gap-2 text-[#999] items-center">
                <span>{t('order')}:</span>
                <button className="border border-[#999] pl-4 pr-2 py-1 rounded flex gap-2 items-center justify-between relative min-w-[160px]" ref={buttonRef} onClick={() => setSortOptionsVisible(true)}>
                    <span>{t(sortOption)}</span>
                    <svg className="rotate-90" fill="#999" height="12" width="12" version="1.1" 
                        viewBox="0 0 330 330">
                        <path id="XMLID_222_" d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001
                        c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213
                        C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606
                        C255,161.018,253.42,157.202,250.606,154.389z"/>
                    </svg>
                    <div ref={optionsRef} 
                    className={`absolute z-30 right-0 top-0 translate-y-[40%] bg-white flex gap-2 flex-col border border-neutral-400 rounded
                    ${sortOptionsVisible ? "" : "hidden"} p-4`}>
                        {sortOptions.map((s,index) => (
                            <button key={index} onClick={() => setSortOption(s)} className="hover:text-red-500">
                                {t(s)}
                            </button>
                        ))}
                    </div>
                </button>
            </div>
        </div>
    )
};

export default ProductFilter;