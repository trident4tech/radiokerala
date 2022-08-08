import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

 constructor( private router: Router,
    public config:ConfigService,
    public http: HttpClient,
    private activerouter: ActivatedRoute) { 
  this.config.checkAccesswith404('pages/accounts/entry');  
    }
  ngOnInit(): void {
    let url = this.config.accountUrl+"?user="+localStorage.getItem('user')+"&&token="+this.config.doDecrypt(localStorage.getItem('token'));
    window.open(url, '_blank');
    this.router.navigate(['/pages/dashboard/']);
  }

}

