import { Observable } from "rxjs"
import { Injectable } from "@angular/core"
import { Http, Response } from "@angular/http"
import {CartItem, Item} from '../models/item'
import {Cart} from '../models/cart'
import { CartStorage, LocalStorage } from "./storage";

@Injectable()
export class CartService {
    private static service: CartService = null;
    private cart: Cart = new Cart([
        new Item(1, "item1".toString(), 100.0, 100.0, ""),
        new Item(2, "item2".toString(), 100.0, 100.0, ""),
        new Item(3, "item3".toString(), 100.0, 100.0, ""),
        new Item(4, "item4".toString(), 100.0, 100.0, ""),
        new Item(5, "item5".toString(), 100.0, 100.0, ""),
        new Item(6, "item6".toString(), 100.0, 100.0, "")
    ]);
    public total: number;

    private constructor(private storage: LocalStorage) {
         
    }

    static getInstance() {
        if (!CartService.service) {
            CartService.service = new CartService(new LocalStorage());
        }

        return CartService.service;
    }

    // simulate a async request
    public async fetchCartItems(): Promise<Array<CartItem>> {
        var newcart: Cart = await this.storage.load();
        if (newcart != null && newcart != undefined)
            this.cart = newcart;
        this.total = this.cart.getTotalPrice();
        return this.cart.toList();
    }

    // simulate a async request
    public async deleteCartItem(itemId: number): Promise<boolean> {
        if (!this.cart.remove(itemId))
            return false;
        this.total = this.cart.getTotalPrice();
        console.log(this.cart.listMap);
        console.log(this.cart.stringify());
        await this.storage.save(this.cart);
        return true;
    }

    public async saveCart(): Promise<boolean> {
        this.total = this.cart.getTotalPrice();
        await this.storage.save(this.cart);
        return true;
    }
}