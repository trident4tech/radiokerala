import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';


@Component({
  selector: 'ngx-viewclass',
  templateUrl: './viewclass.component.html',
  styleUrls: ['./viewclass.component.scss']
})
export class ViewclassComponent implements OnInit {

 public detail:any;
 public dataArray;
  constructor(protected ref: NbDialogRef<ViewclassComponent>,public config:ConfigService,public http: HttpClient) { 
    //this.config.checkAccesswith404('pages/viewclass'); 
    this.dataArray = JSON.parse ( localStorage.getItem ( 'viewdata' ) );
    
  }


  ngOnInit(): void {
  }
    dismiss() {
    this.ref.close();
  }


  getplaceholder(itemArray , selected){
    if ( selected == null || selected == undefined || selected =='' ){
      return ''
    }else{
      for (let key in itemArray) {
        if (itemArray [key]['key'] == selected) {
          return itemArray [key]['value'];
        }
      }
    }

  }


  

}
