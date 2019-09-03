import { Component, OnInit } from '@angular/core';
import { CartService } from './services/cartService'
import { CartItem } from './models/item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {
    this.loadData();
  }

  public isLoadingOne:boolean = false;
  public size = 'large';
  public _data:Array<CartItem> = [];
  private cartService: CartService
  
  constructor() {
    this.cartService = CartService.getInstance();
  }

  loadData(): void {
    this.cartService.fetchCartItems().then((list: Array<CartItem>) => {
      this._data = list;
      console.log(list);
    });
  }

  loadOne(): void {
    this.isLoadingOne = true;
    setTimeout(() => {
      this.isLoadingOne = false;
    }, 5000);
  }
}
