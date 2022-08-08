import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { ConfigService } from '../../config.service';

@Component({
  selector: 'ngx-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {

  constructor(protected ref: NbDialogRef<DeleteComponent>,
  	public config:ConfigService) { }

  ngOnInit(): void {
  }
  cancel() {
    this.ref.close();
  }
  confirmdelete () {
  	this.ref.close(this.config.OTYES);
  }

}
