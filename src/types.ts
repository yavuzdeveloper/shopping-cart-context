export interface Book {
  id: number;
  name: string;
  author: string;
  price: number;
  image: string;
}

export interface CartModel {
items: CartItem[];
}

export interface CartItem {
  book: Book;      
  count: number;
}