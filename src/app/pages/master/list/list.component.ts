import { Component, OnInit,ViewChild} from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { NbComponentShape, NbComponentSize, NbComponentStatus } from '@nebular/theme';
import { FormsModule as ngFormsModule } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../modal-overlays/dialog/dialog-name-prompt/dialog-name-prompt.component';
import { NbMenuService } from '@nebular/theme';
import { Subscription } from 'rxjs/Subscription';
import { filter, map } from 'rxjs/operators';
import { ContextMenuComponent } from 'ngx-contextmenu';
import { MasteraddComponent } from '../masteradd/masteradd.component';
import { MasterviewComponent } from '../masterview/masterview.component';
import { MastereditComponent } from '../masteredit/masteredit.component';




@Component({
  selector: 'ngx-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
 	public  segment  :  string  = ""; 
	public loadMore : string;
    public showLoadMore:boolean=true;
	public showList:boolean=true;
	public showView:boolean=false;
	public dataArray:any[]=[];
	public successResponseArray   : any[]=[];
    public errorResponseArray     : any[]=[];
	public showSearch : boolean=false;
	public temptArray :any[]=[];
	public searchTerm: string='';
	public pkey: string='';
	public fields :any[]=[];
  public filters :any[]=[];
	public values:any=[];
	public fkeys:any=[];
  public fkeyvalues :any[]=[];
  public referencelink:any=[];
  public action :any;
  public viewaction :any;
  public elmt :any[]=[];
  sub;
    actionitems = [ 
     { title: 'Edit' ,icon: 'edit'},
     { title: 'View',icon:'eye-outline' },
     { title: 'Change Status',icon:'cube' },
     { title: 'Delete',icon:'trash' }
  ];
  @ViewChild('item', { static: true }) accordion;
   constructor(private dialogService: NbDialogService,
    private router: Router,
    private activerouter: ActivatedRoute,
    public config:ConfigService,
    public http: HttpClient,
    private menuService: NbMenuService
  ) { }


  ngOnInit(): void {
    this.config.postdata = {}; 
  	  this.sub=this.activerouter.paramMap.subscribe(params => { 
          this.segment = params.get('segment');  
          this.loadData();        
      });
  	    
  }
 toggle() {
    this.accordion.toggle();
  }
  loadData() {  
   this.config.targeturl = this.config.apiUrl+'v1/master/data/list';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
      this.config.postdata['schema'] = this.segment;
      this.config.postdata['p'] = this.config.itemsPerPage;
      this.config.postdata['token'] = this.config.doDecrypt(localStorage.getItem('token'));
      this.config.postdata['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));         
      this.config.postdata['userid'] = this.config.doDecrypt(localStorage.getItem('userId')),   
    
    this.referencelink = [];
  	this.dataArray = [];
  	  this.http.post(this.config.targeturl,this.config.postdata)
    .subscribe(
      (response) => {
  this.config.checkStatus(response['Status'],response['version']);
	var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
    
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.config.itemdata=response['Data']['data'];
    		this.fields=Object.keys(response['fields']).map(key => ({field: key, value: response['fields'][key]}));
        this.filters=Object.keys(response['filters']).map(key => ({field: key, value: response['filters'][key]}));
        
    		this.loadMore=this.successResponseArray[0]['Data']['next_page_url'];
    		this.config.generatePaging(this.successResponseArray[0]['Data'],this.config.apiUrl+'v1/master/data/list'); 
        this.pkey = response['pkey'];
    		this.fkeys = response['fkeys'];
        this.fkeyvalues = response['fkeyvalue'];
        this.referencelink = response['referencelink'];       
        this.referencelink.forEach(ref => {
          var itemlink = {title: ref.title ,icon: 'checkmark'};
          this.actionitems.push(itemlink);
        });
      this.elmt = [];
      this.fields.forEach(element => {
      element.value.validationmessage='';
      if (element.value.values) {
        let val = element.value.values;
        let objelemt = (Object.keys(val).map(key => ({optlabel: val[key], optvalue: key}))); 
        this.elmt[element.field] = [];
        var i = 0;
         objelemt.forEach((elmvalue) => {
          this.elmt[element.field][i] = [];
          this.elmt[element.field][i]['label'] = elmvalue.optlabel;
          this.elmt[element.field][i]['value'] = elmvalue.optvalue;
          i++;
         });        
      }
      if (this.fkeyvalues[element.field]) {
        let val = this.fkeyvalues[element.field];
        let objelemt = (Object.keys(val).map(key => ({optlabel: val[key], optvalue: key}))); 
        this.elmt[element.field] = [];
        var i = 0;
         objelemt.forEach((elmvalue) => {
          this.elmt[element.field][i] = [];
          this.elmt[element.field][i]['label'] = elmvalue.optlabel;
          this.elmt[element.field][i]['value'] = elmvalue.optvalue;
          i++;
         });
      }
    }); 

    
      }
      else {
        console.log(responseDetails[0]['Feedback']);
        this.config.showErrorToaster('Loading failed.');
      }
      
      },
      (error)=>{
        console.log(error);
        this.config.showErrorToaster('Loading failed.');
      }
    );
  }

add() {
	this.viewaction = this.dialogService.open(MasteraddComponent,{context:{'segment': this.segment,
      'fields':this.fields,
      'fkeyvalues':this.fkeyvalues}})
      .onClose.subscribe(() => {
        this.config.goPageno(this.config.currentpageno,this.config.apiUrl+'v1/master/data/list'); 
        this.viewaction.unsubscribe();
      });
}
  changeaction (detail) {
      var data = {};
        data[this.pkey] =detail[this.pkey];
        data['schema'] = this.segment;
        data['token']=this.config.doDecrypt(localStorage.getItem('token'));
        data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
       this.action = this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title=='Delete') {
         this.config.confirm(this.segment,'v1/master/data/delete',data);         
      }
       else if (event.item.title=='View') {
          this.view(detail);
       }
       else if (event.item.title=='Change Status') {
         this.changestatus(detail);
       }     
      else if (event.item.title=='Edit') {
         this.edit(detail);
      }
      else {
          this.referencelink.forEach(ref => {
            if (ref.title==event.item.title) {              
               this.router.navigate(['/pages/'+ref.url+'/'+detail[this.pkey]]);
            }
        });         
      }
        this.action.unsubscribe();
       }); 
    }
    changestatus (detail) {    	
        var data = {};
        data[this.pkey] =detail[this.pkey];
        data['schema'] = this.segment;
        data['token']=this.config.doDecrypt(localStorage.getItem('token'));
        data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
         data['status'] = this.config.OTYES;
      let title ='Are you sure you want to enable the '+this.segment+'?'
        if (detail.status==this.config.OTYES) {
          data['status'] = this.config.OTNO;
          title ='Are you sure you want to disable the '+this.segment+'?'
        }
        this.config.confirmstatus(this.segment,'v1/master/data/status',data,title,data['status']);         
      
    }
    view (detail) {
      this.viewaction = this.dialogService.open(MasterviewComponent,{context:{'segment': this.segment,
      'fields':this.fields,
      'fkeys':this.fkeys,
  	  'data':detail}})
      .onClose.subscribe(() => {
        this.viewaction.unsubscribe();
      });
    }
    edit (detail) {
      this.viewaction = this.dialogService.open(MastereditComponent,{context:{'segment': this.segment,
      'fields':this.fields,
      'fkeys':this.fkeys,
  	  'editdata':detail,
  	  'primary':detail[this.pkey],
  	  'primaryfield': this.pkey,
       'fkeyvalues':this.fkeyvalues,
  	}}).onClose.subscribe(() => {
      this.config.goPageno(this.config.currentpageno,this.config.apiUrl+'v1/master/data/list'); 
        this.viewaction.unsubscribe();
      });
    }

	filterItemsOfType(){
	    return this.fields.filter(x => x.value.showList==2);
	}
  ngOnDestroy() {
     this.sub.unsubscribe();
   }
   doSearch(form) {
  var  dataFields={};
  dataFields['schema'] = this.segment;
  dataFields['token']=this.config.doDecrypt(localStorage.getItem('token'));
  dataFields['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
  // validation
  if (form.value['reset']) {
    this.filters.forEach(element => {
      //dataFields[element.field] = form.value[element.field];
      this.config.postdata[element.value.column]  = '';
     });
  }
  else {
    this.filters.forEach(element => {
      //dataFields[element.field] = form.value[element.field];
      this.config.postdata[element.value.column]  = form.value[element.value.column];
     });
  }
  this.loadData();
 }

}
