const MoveSliderButton = ({ direction, handleClick }: { direction: "prev" | "next", handleClick: () => void}) => {
    return (
        <button className="p-3 border-2 hover:border-neutral-800 border-white transition-shadow duration-300 aspect-square" 
        onClick={handleClick}>
            <svg width="12" height="9" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={`${direction === "prev" ? "rotate-180" : ""} m-auto`}>
                <path d="M10 12L8.6 10.55L12.15 7H0V5H12.15L8.6 1.45L10 0L16 6L10 12Z" fill="#462653"/>
            </svg>
        </button>
    )
};

export default MoveSliderButton;