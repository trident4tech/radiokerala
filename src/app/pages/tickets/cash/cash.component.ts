import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {

 public rec : number;
    public balance : number;
    public totalAmount :number;
    public balanceCheck:boolean;
    public showPrintBtn:boolean;
  constructor(public config:ConfigService,protected ref: NbDialogRef<CashComponent>) { }

  ngOnInit(): void {
  }
dismiss() {
    this.ref.close();
  }
  calcBalance() {
    if (!isNaN(this.rec))
        this.balance = this.rec-this.totalAmount;
    if ((this.rec>0 && this.balanceCheck) || !this.balanceCheck)
        this.showPrintBtn = true;
    else
        this.showPrintBtn = false;
  }

}
