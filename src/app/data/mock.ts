import { Item } from '../models/item'
import { Cart } from '../models/cart';

export const itemDatabase = {
    1: new Item(1, "item1".toString(), 100.0, 100.0, ""),
    2: new Item(2, "item2".toString(), 100.0, 100.0, ""),
    3: new Item(3, "item3".toString(), 100.0, 100.0, ""),
};


export let cart: Cart = new Cart([
    new Item(1, "item1".toString(), 100.0, 100.0, ""),
    new Item(2, "item2".toString(), 100.0, 100.0, ""),
    new Item(3, "item3".toString(), 100.0, 100.0, "")
]);