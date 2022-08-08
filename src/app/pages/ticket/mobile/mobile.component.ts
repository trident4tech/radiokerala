import { Component, OnInit } from '@angular/core';
import { TicketdataComponent } from '../ticketdata/ticketdata.component';
import { ConfigService } from '../../../config.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss']
})
export class MobileComponent implements OnInit {
 public viewaction :any;
   constructor(private dialogService: NbDialogService,        
        public config:ConfigService,
      ) { }

  ngOnInit(): void {
  }
   async add(){
      this.viewaction = this.dialogService.open(TicketdataComponent).onClose.subscribe(() => {
       this.config.pageload(false,true);
        this.viewaction.unsubscribe();
      });      

  }

}
