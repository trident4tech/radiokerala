import { Component, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-misdashboard',
  templateUrl: './misdashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./misdashboard.component.scss']
})
export class MisdashboardComponent implements OnInit {

  public dest:string='';
   constructor(public config:ConfigService) { 
    this.config.checkAccesswith404('pages/misdashboard'); 
   }

  ngOnInit(): void {
    this.dest = "https://analytics.zoho.in/open-view/"+this.config.miszoho;
  }

}
