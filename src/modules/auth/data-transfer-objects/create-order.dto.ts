
export class CreateOrderRequest {
    email: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    postCode?: string;
    country: string;
    regionState?: string;
    cartItems: {id: string; name: string; price: number; quantity: number} [];
    totalAmount: number;
    deliveryMethod: string;
    paymentMethod: string;

}