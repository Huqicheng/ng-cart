import {Item, CartItem} from './item'
import * as R from 'ramda'

var sumOfArr = R.curry(arr => {
    var sum = 0;
    arr.forEach(i => sum += i);
    return sum;
});

var lenOfArr = R.curry(arr => {
    return arr.length;
});

var aveOfArr = R.converge(R.divide, [sumOfArr, lenOfArr]);

export class Cart {
    private _listMap: Map<number, CartItem> = new Map<number, CartItem>()
    constructor(private _itemList: Array<Item>) {
        this._listMap = this.mergeItems();
    }

    get listMap(): Map<number, CartItem> {
        return this._listMap;
    }
    set listMap(val) {
        if (val.values)
            this._listMap = val;
        else {
            Object.keys(val).forEach((k) => {
                let item: CartItem = new CartItem(val[k], val[k].count);
                Object.keys(val[k]).forEach((k1) => {
                    item[k1] = val[k][k1];
                });
                this._listMap.set(parseInt(k), item);
            })  
        }
    }

    public add(item: Item) {
         
    }

    public getTotalPrice() {
        var total:number = 0.0;
        this._listMap.forEach((v,k,map) => {
            total += v.count * v.currentPrice;
        });
        return total;
    }

    // return false means has removed all items with id itemId
    public remove(itemId: number): boolean {
        if (!this._listMap.has(itemId)) {
            return false;
        }

        this._listMap.delete(itemId);

        console.log(this);

        return true;
    }

    get itemList(): Array<Item> {
        return this._itemList;
    }

    public toList(): Array<CartItem> {
        return Array.from(this._listMap.values());
    }

    public mergeItems(): Map<number, CartItem> {
        var map: Map<number, CartItem> = new Map<number, CartItem>();
        for (var i = 0; i < lenOfArr(this._itemList); i++) {
            var item:Item = this._itemList[i];
            if (!map.has(item.id)) {
                var cartItem: CartItem = new CartItem(item, 0);
                map = map.set(item.id, cartItem);
            }

            map.get(item.id).count += 1;
        }
        return map;
    }

    stringify(): string {
        return JSON.stringify(
            Array.from(
              this._listMap.entries()
            )
            .reduce((o, [key, value]) => { 
              o[key] = value; 
              return o; 
            }, {})
          );
    }
}