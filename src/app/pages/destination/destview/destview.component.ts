import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-destview',
  templateUrl: './destview.component.html',
  styleUrls: ['./destview.component.scss']
})
export class DestviewComponent implements OnInit {

  public detail:any;
  constructor(protected ref: NbDialogRef<DestviewComponent>,public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('pages/viewclass'); 
  }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }

}
