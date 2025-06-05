import useHeaderState from "./hooks/useHeaderState";
import usePriceListQuery from "./hooks/usePriceListQuery";
import { IPriceRange } from "./header.interface";
import { redirect } from "next/navigation";
export default function SubMenuPrice() {
    const { showMenuPrice, setShowMenuPrice, setSelectedPriceRange, xPriceMenu, isWhiteHeader, href } = useHeaderState();
    const { data: priceList } = usePriceListQuery();
    const priceRanges = priceList?.prices || [];

    const handleClick = (range: IPriceRange | null) => {
        setSelectedPriceRange(range);
        setShowMenuPrice(false, '');
        redirect(`${href}?price=${range?.min}`);
    }

    if (!showMenuPrice) return null;
    return (
        <div className="fixed left-0 z-30 w-full h-full 2xl:top-0 top-9">
            <div onMouseLeave={() => setShowMenuPrice(false)}>
                <div className="bg-transparent h-27">

                </div>
                <div className={`relative flex items-center justify-start w-full ${isWhiteHeader ? 'bg-black/10' : 'bg-white'} shadow`} style={{
                    height: `${(priceRanges.length * 32) + 32}px`
                }}>
                    <div className="absolute flex flex-row transition-all duration-300" style={{ left: xPriceMenu - 170 }}>
                        <span className={`uppercase -mt-2 font-bold ${isWhiteHeader ? 'text-white' : 'text-black'}`}>{priceList?.title}</span>
                        <div className="w-10 ml-10 border-white h-38" style={{ borderLeft: isWhiteHeader ? '1px solid white' : '1px solid black' }}>
                        </div>
                        <ul className={`-mt-2 z-10 px-2 text-black w-[200px] ${isWhiteHeader ? 'text-white' : 'text-black'}`}>
                            {priceRanges?.map((range, idx) => (
                                <li
                                    key={idx}
                                    className={`p-1 cursor-pointer  ${isWhiteHeader ? 'hover:bg-gray-500' : 'hover:bg-gray-100'}`}
                                    onClick={() =>  handleClick(range)}
                                >
                                    {range.label}
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>

        </div>
    )
}
