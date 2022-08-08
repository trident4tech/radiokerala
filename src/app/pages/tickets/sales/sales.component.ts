import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-sales',
  templateUrl: './sales.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {
    public dest:string='';
   constructor(public config:ConfigService) {
    this.config.checkAccesswith404('pages/sales'); 
    }

  ngOnInit(): void {
    this.dest = "https://analytics.zoho.in/open-view/"+this.config.salezoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Parent%20Destination%22%3D'"+localStorage.getItem('parentDest')+"'";
    if (this.config.isCounterStaff)
      this.dest = "https://analytics.zoho.in/open-view/"+this.config.salezoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Counter%20Staff%22%3D'"+localStorage.getItem('username')+"'";
    else if (localStorage.getItem('parentDest')==localStorage.getItem('destName')) {
      this.dest = "https://analytics.zoho.in/open-view/"+this.config.salezoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Parent%20Destination%22%3D'"+localStorage.getItem('destName')+"'";
    }
  }


}
