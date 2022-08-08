import { ChangeDetectionStrategy, Component, ViewChild, OnInit,ElementRef } from '@angular/core';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-dailyincome',
  templateUrl: './dailyincome.component.html',
   changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./dailyincome.component.scss']
})
export class DailyincomeComponent implements OnInit {

 public dest:string='';
   constructor(public config:ConfigService) { 
    this.config.checkAccesswith404('pages/misdashboard'); 
   }

  ngOnInit(): void {
    this.dest = "https://analytics.zoho.in/open-view/"+this.config.dailyincome;
  }

}
