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

export interface IDishFromCart extends IDish {
    quantity: number;
    idInCart: number;
}

export interface IUser{
    id: number;
    username: string;
    number: string;
    dateOfBirth: Date;
    email: string;
}

export interface IUserResponse {
    accessToken: string;
    id: number;
    username: string;
    number: string;
    dateOfBirth: Date;
    email: string;
    roles: string;
}

export interface IOrder {
    id: number;
    address: string;
}

export interface IRegistration {
    username: string;
    number: string;
    dateOfBirth: Date;
    email: string;
    password: string;
}

export interface ILogin {
    email: string;
    password: string;
}

export interface IDeliveryInfo {
    username: string;
    address: string;
    flat: number;
    floor: number;
    frontDoor: number;
    phoneNumber: string;
    description: string;
}
