import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-addbooking',
  templateUrl: './addbooking.component.html',
  styleUrls: ['./addbooking.component.scss']
})
export class AddbookingComponent implements OnInit {

  constructor(protected ref: NbDialogRef<AddbookingComponent>) { }

  ngOnInit(): void {
  }
  dismiss() {
    this.ref.close();
  }

}
