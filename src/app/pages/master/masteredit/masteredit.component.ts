import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../../config.service';

@Component({
  selector: 'ngx-masteredit',
  templateUrl: './masteredit.component.html',
  styleUrls: ['./masteredit.component.scss']
})
export class MastereditComponent implements OnInit {
	public noError:boolean=true;
	public fields :any[]=[];
  public selfields :any[]=[];
	public segment :string='';
	public dataArray:any=[];
	public fkeys:any=[];
   public fkeyvalues :any[]=[];
   public elmt :any[]=[];
   public editdata :any[]=[];
   public primary : number;
   primaryfield : string;
  constructor(protected ref: NbDialogRef<MastereditComponent>,public config:ConfigService,public http: HttpClient) { 
   }

  
  ngOnInit(): void {
  		this.elmt = [];
      this.selfields = [];
  		this.fields.forEach(element => {
	 		element.value.validationmessage='';
	 		if (element.value.values) {
	 			let val = element.value.values;
				let objelemt = (Object.keys(val).map(key => ({optlabel: val[key], optvalue: key}))); 
	 			this.elmt[element.field] = [];
        this.selfields[element.field] = ""+this.editdata[element.field]+"";
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
        this.selfields[element.field] = ""+this.editdata[element.field]+"";
        objelemt.forEach((elmvalue) => {
	 			 	this.elmt[element.field][i] = [];
	 			 	this.elmt[element.field][i]['label'] = elmvalue.optlabel;
	 			 	this.elmt[element.field][i]['value'] = elmvalue.optvalue;
	 			 	i++;
	 			 });
	 		}
	 	});
    console.log(this.selfields)	;
  }
  dismiss() {
    this.ref.close();
  }
  doEdit(form){
 	var  dataFields={};
 	dataFields['schema'] = this.segment;
 	dataFields[this.primaryfield] = this.primary;
  dataFields['token']=this.config.doDecrypt(localStorage.getItem('token'));
  dataFields['roleid'] = this.config.doDecrypt(localStorage.getItem('roleId'));
 	// validation
 	this.noError = true; 	
  let inputChar = '';
 	this.fields.forEach(element => {
    if (element.value.values || this.fkeyvalues[element.field]) {
        inputChar = this.selfields[element.field];
      }
      else
        inputChar = form.value[element.field];
    dataFields[element.field] = inputChar;
  if (element.value.rule!='' && element.value.rule!==undefined) {
 		element.value.validationmessage='';
 		var validators = element.value.rule.split('|');
 		validators.forEach(validator => {      
	 		if(inputChar  ==  '' && validator=='required' ){
		      element.value.validationmessage=element.value.label+' Required';
		      this.noError=false;   
		    }
		    else if(validator=='integer'){
		    	const pattern = /[0-9]/; // without ., for integer only
			    
			    if (!pattern.test(inputChar)) {
		      		element.value.validationmessage=element.value.label+' Allows only Number';
		      		this.noError=false;   
		  		}
		    }		    
	    }); 
      }		
	});
	if(this.noError == true){
		
       this.http.post(this.config.apiUrl+'v1/master/data/edit',dataFields
               )
        .subscribe(
          (response) => {   this.config.checkStatus(response['Status'],response['version']);
            var responseDetails=[];
  responseDetails.push(response);
  if (responseDetails[0]['Status']==this.config.OTYES) {
            this.config.showSuccessToaster(this.segment+' has been successfully updated');
            this.ref.close();
            this.config.delay(100);
		    }
        else
        {
          console.log(responseDetails[0]['Feedback']);
          this.config.showErrorToaster('Updation failed.');
        }
          },
          (error)=>{
            console.log(error);
            this.config.showErrorToaster('Sorry! '+this.segment+' updation has been failed. Please try again.');
          }
        );
     }
      else{
        this.config.showErrorToaster(this.config.validationError);
      }
 }

 changeData (selectedValue: any,field) {
    this.selfields[field] = selectedValue;
  }

}
