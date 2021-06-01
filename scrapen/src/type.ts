export interface Product {
    id: number;
    price: number;
    title: string;
    quantity: string;
    image: string;
}

export interface Selectors {
    titles: string;
    prices: string;
    quantity: string;
    images: string;
}

export interface Supermarket {
    imagePath: string;
    pages: string[];
    title: string;
    selectors: Selectors;
}
