export interface IProduct {
    id: number,
    title_vi: string,
    title_en: string,
    category: string,
    category_vi: string | null,
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
        discount: number,
        quantity: number
    }[] | null,
    color_set: {
        color: string,
        image: string
    }[] | null,
    quantity: number | null,
    sale_price: number | null
}

export interface ICartProduct {
    id: number,
    title_vi: string,
    title_en: string,
    category: string,
    image_url: string,
    slug: string,
    price: number,
    quantity: number
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
    banner1: {
        image: any,
        link: string
        title: string,
        category: string,
        price: string
    },
    banner2: {
        image: any
        link: string
        title: string,
    },
    banner3: {
        image: any
        link: string
        text1: string,
        text2: string,
    }
    slider: {
        image: any
        link: string
    }[]
}

export interface ICoupon {
    coupon: string,
    discountPercentage: number
}

export interface IOrder {
    _type: "order",
    code: string,
    username: string,
    email: string | null,
    phoneNumber: string,
    phoneNumber2: string | null,
    date: string,
    address: {
        city: string,
        district: string,
        ward: string,
        details: string
    },
    products: {
        title: string,
        quantity: number
    }[],
    paymentMethod: "paymentAfter" | "cardPayment",
    total: number,
    note: string,
    isCompleted: boolean
}
