export interface IDish {
    id: number;
    name: string;
    description: string;
    urlImage: string;
    category: {
        id: number;
        category: string;
    };
    price: number;
    weight: number;
}

export interface ICartItem {
    id: number;
    dishId: number;
    quantity: number;
    cartId: number;
}

export interface IUser{
    id: number;
    username: string;
    number: string;
    dateOfBirth: Date;
    email: string;
}

export interface IUserResponse {
    id: number;
    username: string;
    number: string;
    dateOfBirth: Date;
}

export interface IOrder {
    id: number;
    address: string;
}

