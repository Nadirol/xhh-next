export interface IProduct {
    id: number,
    title_vi: string,
    title_en: string,
    category: string,
    image_url: string,
    details_vi: string[] & JSON;
    details_en: string[] & JSON;
    slug: string,
    product_type: string,
    description_vi: string[] | null,
    description_en: string[] | null,
    benefits_vi: string[] | null,
    benefits_en: string[] | null,
    preview_images: string[] | null,
    other_images: string[] | null,
    specific_description_vi: ITableAndChairDescription[] | null,
    specific_description_en: ITableAndChairDescription[] | null
}

interface ITableAndChairDescription {
    product_type: string,
    size: string[],
    specs: string[],
    colors: string
}
