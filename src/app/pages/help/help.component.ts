import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  constructor(protected ref: NbDialogRef<HelpComponent>,) { }

  ngOnInit(): void {
  }
 dismiss() {
    this.ref.close();
  }
}
