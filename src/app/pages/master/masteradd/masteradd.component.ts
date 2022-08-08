import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-masteradd',
  templateUrl: './masteradd.component.html',
  styleUrls: ['./masteradd.component.scss']
})
export class MasteraddComponent implements OnInit {
	public noError:boolean=true;
	public fields :any[]=[];
	public segment :string='';
	public dataArray:any=[];
	public fkeys:any=[];
   public fkeyvalues :any[]=[];
   public elmt :any[]=[];
  constructor(protected ref: NbDialogRef<MasteraddComponent>,public config:ConfigService,public http: HttpClient) { 
   }

  ngOnInit(): void {
  		console.log(this.fields);
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
  dismiss() {
    this.ref.close();
  }
 doCreate(form){
 	var  dataFields={};
 	dataFields['schema'] = this.segment;
  dataFields['token']=this.config.doDecrypt(localStorage.getItem('token'));
  dataFields['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
 	// validation
 	this.noError = true; 	
 	this.fields.forEach(element => {
    dataFields[element.field] = form.value[element.field];
  if (element.value.rule!='' && element.value.rule!==undefined) {
 		element.value.validationmessage='';
 		var validators = element.value.rule.split('|');
 		validators.forEach(validator => {
	 		if(form.value[element.field]  ==  '' && validator=='required'){
		      element.value.validationmessage=element.value.label+' Required';
		      this.noError=false;   
		    }
		    else if(validator=='integer'){
		    	const pattern = /[0-9]/; // without ., for integer only
			    let inputChar = form.value[element.field];
			    if (!pattern.test(inputChar)) {
		      		element.value.validationmessage=element.value.label+' Allows only Number';
		      		this.noError=false;   
		  		}
		    }		    
	    }); 
      }		
	});
	if(this.noError == true){
       this.http.post(this.config.apiUrl+'v1/master/data/create',dataFields
               )
        .subscribe(
          (response) => {this.config.checkStatus(response['Status'],response['version']); 
           var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
            this.config.showSuccessToaster(this.segment+' has been successfully created');
            this.ref.close();
            this.config.delay(100);
          }
          else {
            console.log(responseDetails[0]['Feedback']);
            this.config.showErrorToaster('Insertion failed.');
          }
		    
          },
          (error)=>{
            console.log(error);
            this.config.showErrorToaster('Sorry! '+this.segment+' creation has been failed. Please try again.');
          }
        );
     }
      else{
        this.config.showErrorToaster(this.config.validationError);
      }
 }
}
