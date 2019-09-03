import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { SummaryComponent } from './summary/summary.component';
import {CartService} from './services/cartService';
import {LocalStorage, CartStorage} from './services/storage'

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    SummaryComponent,
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: LocalStorage,
      useClass: LocalStorage,
    },
    { 
      provide: NZ_I18N, 
      useValue: en_US 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
