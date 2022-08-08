import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConfigService } from '../../../config.service';




@Component({
  selector: 'ngx-ticketmod',
  templateUrl: './ticketmod.component.html',
  styleUrls: ['./ticketmod.component.scss']
})
export class TicketmodComponent implements OnInit {
    public detail : any;
    public ticketData : any;
    public totalAmount :number;
    public tno : number =0;
    public amount : number;

    // @ViewChild('tno') inputOne: ElementRef;

  constructor(public config:ConfigService,protected ref: NbDialogRef<TicketmodComponent>) { }

  ngOnInit(): void {
    this.tno = this.detail.quantity;
    this.amount = this.totalAmount-(this.detail.quantity*this.detail.rate);
     // let nextInput: HTMLInputElement = document.getElementById("tno") as HTMLInputElement;
     // nextInput.focus();
     // nextInput.value = this.detail.quantity;
     // nextInput.select();
    // this.tno = parseInt(nextInput.value);
    //var nextInput = document.getElementById('tno');
    //nextInput.focus();
    //nextInput.select();
    //this.inputOne.nativeElement.focus();


  }
dismiss() {
    this.ref.close();
  }
  update(mode,form) {
    this.detail.quantity = form.value['tno'];
    if (mode==this.config.OTNO) {
        this.detail.quantity = parseInt(this.detail.quantity)-1;        
        //this.totalAmount = this.totalAmount-parseInt(this.detail.rate);
    }
    else{
        this.detail.quantity = parseInt(this.detail.quantity)+1;
        //this.totalAmount = this.totalAmount+parseInt(this.detail.rate);
    }
    this.detail.total = this.detail.quantity*this.detail.rate;
    this.ticketData.noticket = this.detail.quantity;
    this.totalAmount = this.amount+this.detail.total;
  }
  doQuantitySave(form) {
     this.detail.quantity = form.value['tno'];
     this.detail.total = this.detail.quantity*this.detail.rate;
     this.ticketData.noticket = this.detail.quantity;
     this.totalAmount = this.amount+this.detail.total;
     this.ref.close();
  }

}
