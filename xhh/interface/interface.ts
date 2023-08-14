export interface IProduct {
    id: number,
    title_vi: string,
    title_en: string,
    category: string,
    image_url: string,
    details_vi: string[] & JSON;
    slug: string
}