import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-classorder',
  templateUrl: './classorder.component.html',
  styleUrls: ['./classorder.component.scss']
})
export class ClassorderComponent implements OnInit {
  options :any[]= [];
  classes : any[] = [];

  constructor(public config:ConfigService,public http: HttpClient) { 
    this.config.checkAccesswith404('pages/classorder'); 
  }

  ngOnInit(): void {
    this.options = [];
    this.classes = [];
    this.loadData();
  }
    drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );      
    }
    this.save();
  }
  loadData () {
    this.config.targeturl = this.config.apiUrl+'v1/user/getclassorder';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    this.config.postdata = {
        userId:userId,
        p:this.config.itemsPerPage,
        token: this.config.doDecrypt(localStorage.getItem('token')),
        roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
    };
   
    
     this.http.post(this.config.targeturl,this.config.postdata)
        .subscribe(
          (response) => {this.config.checkStatus(response['Status'],response['version']);  
           var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {    
    let data = responseDetails[0]['Data'];
    let i = 0;
    data.forEach(element => {
        this.options[i++] = element['class_number']+'-'+element['class_name']+' ('+element['attr_name']+')';
        this.classes[element['class_number']+'-'+element['class_name']+' ('+element['attr_name']+')'] = element['class_id'];
    });
    localStorage.setItem('counterorder',JSON.stringify(data));
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
  save() {
    this.config.targeturl = this.config.apiUrl+'v1/user/classorder';
    let userId=this.config.doDecrypt(localStorage.getItem('userId'));
    let classord = [];
    let i = 0;
    this.options.forEach(element => {
        classord[i++] = this.classes[element];
    });
    this.config.postdata = {
        userId:userId,
        p:this.config.itemsPerPage,
        token: this.config.doDecrypt(localStorage.getItem('token')),
        roleid:this.config.doDecrypt(localStorage.getItem('roleId')),
        options : JSON.stringify(classord),
    };
   
    
     this.http.post(this.config.targeturl,this.config.postdata)
        .subscribe(
          (response) => {this.config.checkStatus(response['Status'],response['version']);  
           var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
    let data = responseDetails[0]['Data'];
    localStorage.setItem('counterorder',JSON.stringify(data));
     }
        else {
            console.log(responseDetails[0]['Feedback']);
      this.config.showErrorToaster('Updation failed.');
        }
  },
      (error)=>{
        console.log(error);
            this.config.showErrorToaster('Updation failed.');
      }
    );
  }

}
