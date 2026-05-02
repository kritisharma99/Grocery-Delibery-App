export const ProductCategory = {
    Fruits: 'fruits',
    Vegetables: 'vegetables',
    Dairy: 'dairy',
    Bakery: 'bakery',
    Beverages: 'beverages',
  } as const
  
  export type ProductCategory = (typeof ProductCategory)[keyof typeof ProductCategory]
  
  export const OrderStatus = {
    Idle: 'idle',
    Processing: 'processing',
    Success: 'success',
    Failed: 'failed',
  } as const
  
  export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]
  
  export interface Product {
    id: string
    name: string
    category: ProductCategory
    price: number
    rating: number
    image: string
    description: string
  }
  
  export interface CartItem {
    productId: string
    quantity: number
  }
  
  export interface User {
    name: string
    email: string
    location: string
    verified: boolean
  }
  