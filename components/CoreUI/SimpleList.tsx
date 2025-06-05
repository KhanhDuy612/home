import getAssetUrl from "@/utils/asset-url";
import { SimpleList } from "../ArtFairs/art-fair.interface";

interface SimpleListDetailProps {
    simple_list?: SimpleList[];
}

export default function SimpleListDetail({ simple_list = [] }: SimpleListDetailProps) {
    return (
        <>
            {simple_list?.map(item => (
                <>
                    {item.link_id?.link && <a
                        href={item.link_id.link}
                        className="text-[12.5px] font-normal text-[#757575] uppercase tracking-[1.8125px]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.link_id.family_name}
                    </a>}
                    {item.link_id?.file && <a
                        href={getAssetUrl(item.link_id.file)}
                        className="text-[12.5px] font-normal text-[#757575] uppercase tracking-[1.8125px]"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {item.link_id.family_name}
                    </a>}
                </>

            ))}
        </>
    );
}
