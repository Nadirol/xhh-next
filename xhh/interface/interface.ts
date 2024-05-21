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
    specific_description_vi: ITableAndChairDescription | null,
    specific_description_en: ITableAndChairDescription | null,
    features_vi: { icon: string, feature: string }[] | null,
    features_en: ITableAndChairDescription[] | null,
    isNew: boolean | null,
    price: number | null,
    bonus: string[] | null,
    price_set: {
        size: string,
        fullPrice: number,
        price: number,
        discount: number
    }[] | null
}

export interface IPriceSet {
    size: string,
    fullPrice: number,
    price: number,
    discount: number
}

interface ITableAndChairDescription {
    product_type: string,
    size: string,
    specs: string[] | null,
    colors: string,
    materials: string | null,
    [key: string]: any;
}

export interface IPost {
    title: string,
    overview: string,
    content: any,
    _id: string,
    slug: {
        current: string
    },
    _createdAt: string,
    image: any,
    published: boolean
}

export interface IBanner {
    title: string,
    image: any,
    banner1: {
        image: any | null,
        link: string | null
    },
    banner2: {
        image: any | null,
        link: string | null
    },
    banner3: {
        image: any | null,
        link: string | null
    }
}