import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';
import { Router,ActivatedRoute } from '@angular/router';
import { PagesComponent } from '../../pages.component';
import { NbMenuService, NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-usracl',
  templateUrl: './usracl.component.html',
  styleUrls: ['./usracl.component.scss']
})
export class UsraclComponent implements OnInit {
     public roleName : string ='';
  public customActionSheetOptions   :any[]=[];
  public  categoriesArray           :any[]=[];
  public  searchArray               :any[]=[];
  public  permissionArray           :any[]=[];
  public searchCategories        : any;
  public waitingForServer       : boolean=true;    
  public successResponseArray   : any[]=[];
  public errorResponseArray     : any[]=[];
  public assignPermission       : any[]=[];
  public showPrgress  :boolean=false;
  public showSearch : boolean=false;
  public loadMore : string;
  public showArray:boolean=false;
  public doStatus :boolean=false;
  public roleid : any ;
  public searchCategory : string='';
  public searchTerm : any;
  reference : any;
  sub;
  public usrId:any;
  public username:string='';

  constructor( private router: Router,
    public config:ConfigService,
    public http: HttpClient,
    private activerouter: ActivatedRoute,
    public nbMenuService: NbMenuService) {
    this.config.checkAccesswith404('acl-user');   
        this.sub=this.activerouter.paramMap.subscribe(params => { 
          this.usrId = this.config.doDecrypt(decodeURIComponent(params.get('id')));
          this.roleid = this.config.doDecrypt(decodeURIComponent(params.get('role')));
          this.username = this.config.doDecrypt(decodeURIComponent(params.get('name')));
          this.doPermissionlist();
          this.doCategories();     
        }); 
    }

  ngOnInit(): void {
    this.searchTerm = '';
            
  }
  back() {
    this.router.navigate(['/pages/admin']);
  }
  doCategories(){
    this.waitingForServer=false;     
    this.http.post(this.config.apiUrl+'v1/acl/getcategories', {
  })
  .subscribe(
    (response) => {
      this.successResponseArray=[];
      this.successResponseArray.push(response);
      this.categoriesArray=this.successResponseArray[0]['Data'];      
    },
    (error)=>{}
  );    

  }

  aclSearch(item){

    this.waitingForServer=false;     
    this.http.post(this.config.apiUrl+'v1/user/permissionList', {
    mainroleid:this.roleid,
    usrid : this.usrId,
    token:  this.config.doDecrypt(localStorage.getItem('token')),
    roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
  })
  .subscribe(
    (response) => {this.config.checkStatus(response['Status'],response['version']);
      this.successResponseArray=[];
      this.successResponseArray.push(response);
      this.searchArray=this.successResponseArray[0]['Data'];
    },
    (error)=>{}
    );
  }



  doPermissionlist(){
    var data = {};
    data['mainroleid'] = this.roleid;
    data['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
    if (this.searchTerm) {
      data['searchdata'] = this.searchTerm;
    }
    data['usrid'] = this.usrId;
    data['category'] = this.searchCategory;
    data['token'] = this.config.doDecrypt(localStorage.getItem('token'));
    this.waitingForServer=false;     
    this.http.post(this.config.apiUrl+'v1/user/permissionList', data)
    .subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        this.permissionArray=this.successResponseArray[0]['Data'];
        //this.roleName = this.successResponseArray[0]['Roledata'][0]['name'];
  
      },
      (error)=>{}
    );    
  }


changeStatus(event,attrdata){
  if (event!=attrdata.orgstatus) {
    let status = this.config.OTNO;
    if (event) { //for assign permission
      status = this.config.OTYES;
    }
    this.http.post(this.config.apiUrl+'v1/acl/user/assignpermission', {
     usrid:this.usrId,  
     permissionid : attrdata.permissionId,
     status : status,  
     acluserid : this.config.doDecrypt(localStorage.getItem('userId')),
     token:this.config.doDecrypt(localStorage.getItem('token')),    
     roleid:this.config.doDecrypt(localStorage.getItem('roleId')),  
    })
    .subscribe(
      (response) => {this.config.checkStatus(response['Status'],response['version']);
        this.successResponseArray=[];
        this.successResponseArray.push(response);
        if (this.successResponseArray[0]['Status'] == this.config.OTYES) {
          this.config.showSuccessToaster('Permission has beeen succefully changed');
          
          if (this.usrId==parseInt(this.config.doDecrypt(localStorage.getItem('userId'))))
          {
                let myCompOneObj = new PagesComponent(this.nbMenuService,this.config,this.http);
                myCompOneObj.loadMenu();
          }
          this.doPermissionlist();
        }
        else {
          this.config.showErrorToaster('Sorry. try again.');
        }
  
      },
      (error)=>{this.config.showErrorToaster('Error. Please try again.');}
    );    
  }
   
  }
  changeCategory (value) {
    this.searchCategory = value;
    this.doPermissionlist();
  }

}
