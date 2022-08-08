import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-weatherview',
  templateUrl: './weatherview.component.html',
  styleUrls: ['./weatherview.component.scss']
})
export class WeatherviewComponent implements OnInit {

  public detail:any;
  constructor(protected ref: NbDialogRef<WeatherviewComponent>,public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('pages/viewclass'); 
  }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }

}

