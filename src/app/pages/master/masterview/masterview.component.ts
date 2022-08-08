import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-masterview',
  templateUrl: './masterview.component.html',
  styleUrls: ['./masterview.component.scss']
})
export class MasterviewComponent implements OnInit {
	public fields :any[]=[];
	public segment :string='';
	public data :any=[];
	public fkeys:any=[];
   public fkeyvalues :any[]=[];
   constructor(protected ref: NbDialogRef<MasterviewComponent>,public config:ConfigService,public http: HttpClient) { 
   }

  ngOnInit(): void {
  }
   dismiss() {
    this.ref.close();
  }

}
