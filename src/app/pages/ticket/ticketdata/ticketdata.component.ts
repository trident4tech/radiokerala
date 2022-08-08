import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-ticketdata',
  templateUrl: './ticketdata.component.html',
  styleUrls: ['./ticketdata.component.scss']
})
export class TicketdataComponent implements OnInit {

  constructor(protected ref: NbDialogRef<TicketdataComponent>) { 
    
  }

  ngOnInit(): void {
  }
   dismiss() {
    this.ref.close();
  }

}
