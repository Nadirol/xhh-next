import { TFunction } from "next-i18next"

const ProductFilter = ({ t }: { t: TFunction}) => {

    return (
        <div className="w-container-large mx-auto flex flex-col">
            <div className="flex gap-2 items-center px-4 pb-2 border-b">
                <h3>Products</h3>
            </div>
            <div className="flex flex-col text-neutral-800 text-xl">
                <button className="py-2 relative before:absolute before:z-0 
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 px-4">
                        Curtains
                    </span>
                </button>
                <button className="py-2 relative before:absolute before:z-0 
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 px-4">
                        Doors
                    </span>
                </button>
                <button className="py-2 relative before:absolute before:z-0 
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 px-4">
                        Wooden Tiles
                    </span>
                </button>
                <button className="py-2 relative before:absolute before:z-0 text-start
                before:bg-red-500 before:w-full before:h-full flex items-center
                [&:hover]:before:translate-x-0 before:translate-x-[-105%] overflow-hidden
                before:transition-transform hover:text-neutral-50 transition-[color] duration-75">
                    <span className="relative z-10 px-4">
                        Tables and Chairs
                    </span>
                </button>
            </div>
        </div>
    )
};

export default ProductFilter;