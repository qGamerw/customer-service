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
    cartItemId: number;
}

export interface IDishFromOrderResponse {
    dishId: number;
    dishName: string;
    quantity: number;
}

export interface IDishFromOrderHistory {
    orderId: number;
    dishId: number;
    dishName: string;
    quantity: number;
}

export interface IDeliveryInfo {
    username: string;
    clientPhoneNumber: string;
    description: string;
    address: string;
    flat: number;
    floor: number;
    frontDoor: number;
}

export interface IOrderFromHistory extends IDeliveryInfo {
    id: number;
    clientId: number;
    totalPrice: number;
    totalWeight: number;
    listDishesFromOrder: IDishFromOrderHistory[];
    status: string;
    orderTime: string;
    refusalReason: string | null;
}

export interface IOrderResponse extends IDeliveryInfo {
    clientId: number;
    totalPrice: number;
    totalWeight: number;
    listDishesFromOrder: IDishFromOrderResponse[];
}

export interface IUser {
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



