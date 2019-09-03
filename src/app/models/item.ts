import { NzTreeHigherOrderServiceToken } from "ng-zorro-antd";

export class Item {

    constructor(
            public id: number,
            private _name: string,
            public currentPrice: number,
            public originalPrice: number,
            private _image: string) {
    }

    copy():Item {
        const item: Item = this;
        return new Item(item.id, item.name, item.currentPrice, item.originalPrice, item.image);
    }

    get name(): string { 
        return this._name;
    }
    set name(val: string) {
        this._name = val;
    }

    get image(): string { 
        return this._image;
    }
    set image(val: string) {
        this._image = val;
    }
}

export class CartItem extends Item {
    private _count: number;

    constructor(item: Item, count: number) {
        super(item.id, item.name, item.currentPrice, item.originalPrice, item.image);
        this._count = count;
    }

    get count(): number {
        return this._count;
    }
    set count(count: number) {
        this._count = count;
    }
}