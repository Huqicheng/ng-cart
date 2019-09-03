import { Cart } from "../models/cart";
import { Injectable } from "@angular/core";
import { CartItem } from "../models/item";

// Abstraction for storage, can be localstorage / cookie / remote server
export interface CartStorage {
    save(cart: Cart);
    load();
}

@Injectable()
export class LocalStorage implements CartStorage {
    load(): Cart {
        var item = localStorage.getItem('cart');
        console.log(item);
        if (!item)
            return null;

        var cartMap: Map<number, CartItem> = JSON.parse(item) as Map<number, CartItem>;
        var cart: Cart = new Cart([]);
        Object.keys(cartMap).forEach((k) => {
            let item: CartItem = new CartItem(cartMap[k], cartMap[k].count);
            Object.keys(cartMap[k]).forEach((k1) => {
                item[k1] = cartMap[k][k1];
            });
            cart.listMap.set(parseInt(k), item);
            console.log(cart.listMap);
        })  
        return cart;
    }
    save(cart: Cart) {
        localStorage.setItem("cart", cart.stringify());
    }
}