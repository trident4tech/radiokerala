import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfigService } from '../../../config.service';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { MainComponent } from '../../../pages/dashboard/main/main.component';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  selectedItem :any;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  user: any;
  username : string ='';
  destinations : any[] = [];
  public cver:string='';
  public lver:string='';
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];

  currentTheme = 'default';
  hideMenuOnClick: boolean = false;

  userMenu = [  { title: 'Log out', link: '/pages/logout' } ];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private breakpointService: NbMediaBreakpointsService,
              public router: Router,
              public config:ConfigService,
              public http: HttpClient) {
    
  }

  ngOnInit() {  
    this.cver = localStorage.getItem('cver');
    this.lver = localStorage.getItem('lver');
    this.selectedItem = localStorage.getItem('maindest');
    this.destinations = [];
    var dests = localStorage.getItem('destinations');
    this.destinations = [];//JSON.parse(dests); 
    this.destinations[this.destinations.length]={'dest_id':'Select All','dest_name':'Select All'};
    this.username = localStorage.getItem('username');
    let val=localStorage.getItem('userId');
    
    if(val == null || val=='undefined'||val=='null' || val==''){
        this.router.navigateByUrl('/home');
    }

    this.currentTheme = this.themeService.currentTheme;

    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => this.user = users.nick);

    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.userPictureOnly = isLessThanXl);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
    const {is} = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint),
        takeUntil(this.destroy$),
      )
      .subscribe(currentBreakpoint => {
        this.userPictureOnly = currentBreakpoint.width < xl;
        this.hideMenuOnClick = currentBreakpoint.width <= is;
      });
    // ...
    this.menuService.onItemClick().subscribe(() => {
      if (this.hideMenuOnClick) {
        this.sidebarService.collapse('menu-sidebar');
      }
    });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeDest (selectedValue: any) {
    localStorage.setItem('maindest','');
    if (selectedValue!='Select All') {
      localStorage.setItem('maindest',selectedValue);
      // let myCompOneObj = new MainComponent(this.config,this.http);
      // myCompOneObj.loadData();
    }
    window.location.reload();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
}
