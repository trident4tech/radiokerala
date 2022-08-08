import { Component } from '@angular/core';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
    public cver: string='';
    public lver:string='';

    constructor(public config:ConfigService) {
    
    }

    ngOnInit() {
         this.cver = localStorage.getItem('cver');
         this.lver = localStorage.getItem('lver');
     }
}
