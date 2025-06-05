import { Exhibition } from "../Exhibitions/exhibition.interface"

export interface Banner {
    id: number
    slogan: string
    title_scroll: string
    section_scroll: string
    exhibitions: BannerExhibition[]
}

export interface BannerExhibition {
    id: number
    banner_id: number
    exhibitions_id: Exhibition
}

