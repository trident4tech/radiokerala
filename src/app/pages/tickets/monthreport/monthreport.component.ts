import { ChangeDetectionStrategy,Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-monthreport',
  templateUrl: './monthreport.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./monthreport.component.scss']
})
export class MonthreportComponent implements OnInit {
    public dest: string='';
  constructor(public config:ConfigService) {
    this.config.checkAccesswith404('pages/monthreport'); 
   }

  ngOnInit(): void {
    this.dest = "https://analytics.zoho.in/open-view/"+this.config.monthzoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Parent%20Destination%22%3D'"+localStorage.getItem('parentDest')+"'";
    if (this.config.isCounterStaff)
      this.dest = "https://analytics.zoho.in/open-view/"+this.config.monthzoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Counter%20Staff%22%3D'"+localStorage.getItem('username')+"'";
    else if (localStorage.getItem('parentDest')==localStorage.getItem('destName')) {
      this.dest = "https://analytics.zoho.in/open-view/"+this.config.monthzoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Parent%20Destination%22%3D'"+localStorage.getItem('destName')+"'";
    }
    
    
  
  }

}
