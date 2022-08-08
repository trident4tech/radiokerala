import { Component, OnInit , ViewChild,ChangeDetectionStrategy} from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { NbDialogService } from '@nebular/theme';
import { AddbookingComponent } from '../addbooking/addbooking.component';
import { NbMenuService } from '@nebular/theme';
@Component({
  selector: 'ngx-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent implements OnInit {
   itemsa = [
    { title: 'Profile' ,icon: 'eye-outline'},
    { title: 'Logout' },
  ];
items: NbMenuItem[] = [
    {
      title: 'Menu link with parameters',
      expanded: false,
      children: [
        {
          title: 'Goes into angular `routerLink`',
          link: '', // goes into angular `routerLink`
        },
        {
          title: 'Goes directly into `href` attribute',
          url: '/example/menu/menu-link-params.component#some-location', // goes directly into `href` attribute
        },
        {
          title: 'Menu item path match `prefix`',
          link: '/example/menu/menu-link-params.component',
          queryParams: {someUrlParam: 'true'},
          pathMatch: 'prefix',
        },
        {
          title: 'Will be opened in new window (target=`_blank`)',
          url: 'https://github.com/akveo/nebular',
          target: '_blank',
        },
        {
          title: 'Menu item with icon',
          link: '/example/menu/menu-link-params.component',
          icon: 'eye-outline',
        },
        {
          title: 'Hidden menu item',
          link: '',
          hidden: true,
        },
      ],
    },
  ];
  @ViewChild('item', { static: true }) accordion;

  togglea() {
    this.accordion.toggle();
  }
  constructor(private dialogService: NbDialogService, private menuService: NbMenuService) { }

  ngOnInit() {
    
  }
   async add(){
      this.dialogService.open(AddbookingComponent)
      .onClose.subscribe();
    //   this.dialogService.open(AddComponent, {
    //   context: {
    //     title: 'This is a title passed to the dialog component',
    //   },
    // });

  }
  clickbtn (a) {
    this.menuService.onItemClick().subscribe((event) => {
    console.log('logout clicked'+event.item.title +a);
  
});
  }

}

({
  selector: 'nb-select-multiple',
  templateUrl: './template.component.html',
})
export class SelectMultipleComponent {
}
