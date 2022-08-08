import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

 constructor( private router: Router,
    public config:ConfigService,
    public http: HttpClient,
    private activerouter: ActivatedRoute) { 
    this.config.checkAccesswith404('pages/accounts/collection');
    }
  ngOnInit(): void {
    let url = this.config.accountUrl+"?user="+localStorage.getItem('user')+"&&token="+this.config.doDecrypt(localStorage.getItem('token'))+"&&col="+this.config.OTYES;
    window.open(url, '_blank');
    this.router.navigate(['/pages/dashboard/']);
  }

}
