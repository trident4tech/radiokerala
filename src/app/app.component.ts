/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { SeoService } from './@core/utils/seo.service';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';
import { Observable, of, Observer, fromEvent, merge } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ConfigService } from './config.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { HelpComponent } from './pages/help/help.component';
import { SwUpdate } from '@angular/service-worker';

enum KEY_CODE {
  KEY_F2 = 113,
  KEY_F4 = 115,
  KEY_F9 = 120,
  KEY_TILLED = 192,
  KEY_EQUAL = 187,
  KEY_RIGHT = 39,
  KEY_ENTER = 13,
  KEY_DOWN = 40,
  KEY_UP = 38,
  KEY_LEFT = 37,
  KEY_QM = 191,
}

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  isConnected = true;
  noInternetConnection: boolean;

  constructor(private swUpdate: SwUpdate, private dialogService: NbDialogService,
    public http: HttpClient, public config: ConfigService, private connectionService: ConnectionService, private router: Router, private analytics: AnalyticsService, private seoService: SeoService) {
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.config.updateLatest();
      });
    }
     this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
     if (this.isConnected) {
      this.config.doSync();
     }
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event) {
    //    console.log(event.keyCode);
    if (event.keyCode == KEY_CODE.KEY_F2) {
      this.router.navigate(['/pages/newbooking']);
    }
    else if (event.keyCode == KEY_CODE.KEY_QM) {
      this.dialogService.open(HelpComponent)
        .onClose.subscribe();
    }
  }
  @HostListener('window:online', ['$event'])
  onlineEvent(event) {
    this.createOnline$().subscribe(isOnline => this.isConnected = isOnline);
    this.config.doSync();
  }

  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }
}
