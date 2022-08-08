import { Component, OnInit,HostListener } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConfigService } from '../../../config.service';

enum KEY_CODE {
  KEY_F2 = 113,
  KEY_F4 = 115,
  KEY_F9 = 120,
  KEY_EQUAL = 187,
  KEY_RIGHT = 39,
  KEY_ENTER = 13,
  KEY_DOWN= 40,
  KEY_UP = 38,
  KEY_LEFT = 37,
  KEY_PLUS =107,
  KEY_MINUS =109,
  KEY_STAR = 106,
  KEY_SLASH = 111,
  KEY_NUM_ENTER = 13
}


@Component({
  selector: 'ngx-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  public title:any='';
  constructor(protected ref: NbDialogRef<ConfirmComponent>,
  	public config:ConfigService) { }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event) {
    if (event.keyCode==KEY_CODE.KEY_NUM_ENTER ) {
      this.confirmaction();
    }
     if (event.keyCode==KEY_CODE.KEY_SLASH ) {
      this.ref.close();
    }
  }

  ngOnInit(): void {
    if (this.title=='') {
      this.title = "Are you sure you want to proceed?";
    }
  }
  cancel() {
    this.ref.close(this.config.OTNO);
  }
  confirmaction () {
  	this.ref.close(this.config.OTYES);
  }
   move(event: any) {
     if (event.keyCode==KEY_CODE.KEY_RIGHT) {
      var nextInput = document.getElementById('proceed');
         nextInput.focus();
     } 
    }
 moveprev(event: any) {
     if (event.keyCode==KEY_CODE.KEY_LEFT) {
      var nextInput = document.getElementById('cancelprint');
         nextInput.focus();
     } 
     if (event.keyCode==KEY_CODE.KEY_ENTER) {
      this.confirmaction();
     }
    }
}
