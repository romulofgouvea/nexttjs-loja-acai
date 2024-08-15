export interface CatalogItem {
    id: number;
    name: string;
    description: string;
    price: number;
    icon: any;
}

export interface CondimentItem {
    name: string;
    price: number;
}

export interface Condiment {
    acompanhamentos: string[];
    cobertura: "";
    adicionais: CondimentItem[];
}

export interface CartItem extends CatalogItem {
    condiments: Condiment;
}

export interface UserOrder {
    items: CartItem[];
    userName: string;
    total: number;
}
