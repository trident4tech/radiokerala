import { ConfigService } from '../../../config.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ChangeDetectionStrategy, Component, ViewChild, OnInit,ElementRef } from '@angular/core';


@Component({
  selector: 'ngx-daywisereport',
  templateUrl: './daywisereport.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./daywisereport.component.scss']
})
export class DaywisereportComponent implements OnInit {
    public dest:string='';


   constructor(public domSanitizer: DomSanitizer,public config:ConfigService) { 
    this.config.checkAccesswith404('pages/daywisereport'); 
   }

  ngOnInit(): void {    
    this.dest = "https://analytics.zoho.in/open-view/"+this.config.dailyzoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Parent%20Destination%22%3D'"+localStorage.getItem('parentDest')+"'";
    if (this.config.isCounterStaff)
      this.dest = "https://analytics.zoho.in/open-view/"+this.config.dailyzoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Counter%20Staff%22%3D'"+localStorage.getItem('username')+"'";
    else if (localStorage.getItem('parentDest')==localStorage.getItem('destName')) {
      this.dest = "https://analytics.zoho.in/open-view/"+this.config.dailyzoho+"?ZOHO_CRITERIA=%22Ticket%20Feed%22.%Parent%20Destination%22%3D'"+localStorage.getItem('destName')+"'";
    }    
  }

}
