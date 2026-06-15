export interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
