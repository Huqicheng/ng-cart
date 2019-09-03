import { Component, ElementRef, HostListener, OnInit, ViewChild, Input } from '@angular/core';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { CartService } from '../services/cartService';

@Component({
  selector: 'ng-cart',
  template: `
    <nz-table #editRowTable nzBordered [nzData]="listOfData">
      <thead>
        <tr>
          <th nzWidth="30%">Product Name</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of editRowTable.data" class="editable-row">
          <td>
            <div class="editable-cell" *ngIf="editId !== data.id; else editTpl">
              <div class="editable-cell-value-wrap">
                {{ data.name }}
              </div>
            </div>
            <ng-template #editTpl>
              <input type="text" nz-input [(ngModel)]="data.name" />
            </ng-template>
          </td>
          <td>\${{ data.currentPrice }}</td>
          <td><nz-input-number [(ngModel)]="data.count" [nzMin]="1" [nzMax]="99" [nzStep]="1" (ngModelChange)="onDataChange()"></nz-input-number></td>
          <td>
            <a nz-popconfirm nzTitle="Sure to delete?" (nzOnConfirm)="deleteRow(data.id)">Remove</a>
          </td>
        </tr>
      </tbody>
    </nz-table>
  `,
  styles: [
    `
      button {
        margin-bottom: 16px;
      }

    `
  ]
})
export class ShoppingCartComponent implements OnInit {
  ngOnInit(): void {
  }
  i = 0;
  editId: string | null;
  @Input() listOfData: any[] = [];
  @ViewChild(NzInputDirective, { static: false, read: ElementRef }) inputElement: ElementRef;
  private cartService: CartService;
  constructor() {
    this.cartService = CartService.getInstance();
  }
  @HostListener('window:click', ['$event'])
  handleClick(e: MouseEvent): void {
    if (this.editId && this.inputElement && this.inputElement.nativeElement !== e.target) {
      this.editId = null;
    }
  }

  onDataChange(count: number) {
    this.cartService.saveCart();
  }

  deleteRow(id: number): void {
    console.log(id);
    this.cartService.deleteCartItem(id).then((val: boolean) => {
      if (true) {
        this.listOfData = this.listOfData.filter((val, index, data):boolean => {
          return val.id != id;
        });
      }
    });
  }
}
