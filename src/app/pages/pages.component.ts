import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { MENU_ITEMS } from './pages-menu';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { NbMenuService, NbMenuItem } from '@nebular/theme';
import { map, startWith } from 'rxjs/operators';
import { Observable, of, Observer, fromEvent, merge } from 'rxjs';


@Component({
	selector: 'ngx-pages',
	styleUrls: ['pages.component.scss'],
	template: `
    <ngx-one-column-layout >
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

	allmenu = MENU_ITEMS;
	public menuItems: any = [];
	menu = MENU_ITEMS;
	public isOnline: boolean = true;
	constructor(private nbMenuService: NbMenuService, public config: ConfigService, public http: HttpClient) {
		//console.log(this.allmenu);

		this.createOnline$().subscribe(isOnline => {
			this.isOnline = isOnline
		});
		
		this.loadMenu();
		//this.loadDataMenu();
	}

	loadMenu() {

		if (localStorage.getItem('role')) {
			let roleid = localStorage.getItem('role');
			this.menu.forEach(element => {
				element.hidden = false;
				if (roleid=='1') {
					if (element.title=='New Survey' || element.title=='Offline Surveys') {
						element.hidden = true;
					}
				}
				else 
					if (element.title=='Survey List' || element.title=='GIS Dashboard') {
						element.hidden = true;
					}
			});
		}

/*
		if (localStorage.getItem('roleId')) {
			if (this.isOnline) {
				var formData: any = new FormData();
				formData.append('API_KEY', this.config.apiKey);
				formData.append('service', "masterlist");
				formData.append('roleid', localStorage.getItem('roleId'));
				formData.append('type', "getassignedmenu");
				this.http.post(this.config.apiUrl, formData)
					.subscribe((response) => {
						if (response['status'] == this.config.OTYES) {
							this.menuItems = response['data'];
							localStorage.setItem("myMenu", JSON.stringify(this.menuItems))
							this.loadDataMenu();
						}
					}, (error) => {
						this.config.showErrorToaster('Network Error occured..');
					}
					);


			}
			else
				this.loadDataMenu();
		}

		//console.log(this.menuItems);
		//this.nbMenuService.addItems(this.newMenuItem);
		*/

	}


	loadDataMenu() {
		this.menuItems = JSON.parse(localStorage.getItem("myMenu"));
		console.log(this.menuItems);
		this.menu.forEach(element => {
			if (element.children) {
				let permission = this.checkAccess(element);
				if (!permission) {
					element.hidden = true;
				}
				else
					element.hidden = false;
				element.expanded = false;
			} else {  
				if ( this.menuItems.includes(element.title) == false ) {
					element.hidden = true;
				} else
					element.hidden = false;
			}

		});
	}
	checkAccess(childmenu) {
		let found = false;
		childmenu.children.forEach(element => {  
			if ( this.menuItems.includes(element.title) == true ) {
				found = true;
				element.hidden = false;
			}
			else{
				element.hidden = true;
			}
		});
		return found;
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
