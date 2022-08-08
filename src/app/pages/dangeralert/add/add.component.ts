import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfigService } from '../../../config.service';
import { HttpClient } from '@angular/common/http';
import { NbDialogService } from '@nebular/theme';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common'
import { ConfirmComponent } from '../../../pages/tickets/confirm/confirm.component';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  public action: any;
  public ngDist: any = '';
  public ngGp: any = '';
  public ngAssembly: any = '';
  public ngScheme: any = '';
  public ngSchemeName: any = '';
  public ngWard: any = '';
  public ngTotalSc: any = '';
  public ngTotalSt: any = '';
  public ngTotalGeneral: any = '';
  public ngsourceType: any = '';
  public ngWaterqualityIssue: any = '';
  public ngpumpHouse: any = '';
  public ngpumpSet: any = '';
  public ngKsebCon: any = '';
  public ngPanelBoardStatus: any = '';
  public ngWaterAvailability: any = '';
  public ngPumpingMain: any = '';
  public ngDistributionSystem: any = '';
  public ngtypeOfStorageCapacity: any = '';
  public ngStorageTank: any = '';
  public ngDisInfectionUnit: any = '';
  public ngWaterMeter: any = '';
  public ngAverageMonthlyIncome: any = '';
  public ngAverageMonthlyIncomeExpenceBg: any = '';
  public ngSurplusFound: any = '';
  public ngBgRegIsActive: any = '';
  public ngAnnualBgIsconducted: any = '';
  public ngBgContacttwo: any = '';
  public ngBgContactOne: any = '';
  public ngrejvinationNeeded: any = '';
  public ngrejvinationNeededReson: any = '';
  public ngSizeOfScheme: any = '';


  public selectedFileSourceType = null;
  public selectedFileSourcepumpHouse = null;
  public selectedFileSourceStorageCapacity = null;
  public date = new Date();
  public ngcommisionDate: any = '';
  public ngSchemeExpenditure: any = '';
  public ngSchemeFunctionality: any = '';
  public draftArray = {};
  public uniqueId: any = '';



  public thicketAttrId: string;
  public loadMore: string;
  public showLoadMore: boolean = true;
  public showList: boolean = true;
  public showView: boolean = false;
  public ticketArray: any[] = [];
  public bookDetails: any[] = [];
  public showPrgress: boolean = false;
  public successResponseArray: any[] = [];
  public errorResponseArray: any[] = [];
  public showSearch: boolean = false;
  public temptArray: any[] = [];
  public grandTotal: number = 0;
  public qrDAta: string = '';
  public ticketNumber: string = '';
  public ticketTempArray: Array<any>[] = [];
  public searchTerm: string = '';
  public bookeddate: any;
  public mode: string = '';
  public counter: string = '';
  public modes: any[] = [];
  public viewaction: any;
  public counters: any[] = [];
  appTitle: string = '';
  terms: any = [];
  public classDetails: any = [];
  public selectedWardArray = [];
  public formattedDate: any = '';
  public draftId: any = '';


  public sourceLat : any = '';
  public sourceLng : any = '';
  public pumpLat : any = '';
  public pumpLng : any = '';
  public capLat : any = '';
  public capLng : any = '';

  constructor(
    public config: ConfigService,
    public http: HttpClient, private dialogService: NbDialogService,
    public datepipe: DatePipe,
    private router: Router
  ) {
    //localStorage.removeItem('offlineDraft');
    //this.loadData();
    this.formattedDate = this.datepipe.transform(this.date, 'dd-MM-yyyy');
    this.clearValidation();
    this.populateData();
    this.draftId = localStorage.getItem("draftId");
    this.config.extractdistrict();
  }

  ngOnInit(): void {

  }
  wardSelected(selectedValue: any) {
    var dest = selectedValue;
    this.selectedWardArray[selectedValue] = selectedValue;
  }

  onFileSelected(event) {
    this.selectedFileSourceType = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileSourceType);
    reader.onload = () => {
      this.selectedFileSourceType = reader.result;
    };
  }

  onUpload() {
    console.log(this.selectedFileSourceType); // You can use FormData upload to backend server
  }



  onFileSelectedPump(event) {
    this.selectedFileSourcepumpHouse = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileSourcepumpHouse);
    reader.onload = () => {
      this.selectedFileSourcepumpHouse = reader.result;
    };
  }

  onUploadPump() {
    console.log(this.selectedFileSourcepumpHouse); // You can use FormData upload to backend server
  }





  onFileSelectedCapacity(event) {
    this.selectedFileSourceStorageCapacity = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFileSourceStorageCapacity);
    reader.onload = () => {
      this.selectedFileSourceStorageCapacity = reader.result;
    };
  }

  onUploadCapacity() {
    console.log(this.selectedFileSourceStorageCapacity); // You can use FormData upload to backend server
  }



  clearValidation() {
    this.errorResponseArray['selectedFileSourceType'] = '';
    this.errorResponseArray['selectedFileSourcepumpHouse'] = '';
    this.errorResponseArray['selectedFileSourceStorageCapacity'] = '';
    this.errorResponseArray['ngDist'] = '';
    this.errorResponseArray['ngGp'] = '';
    this.errorResponseArray['ngAssembly'] = '';
    this.errorResponseArray['ngScheme'] = '';
    this.errorResponseArray['ngSchemeName'] = '';
    this.errorResponseArray['ngWard'] = '';
    this.errorResponseArray['ngTotalSc'] = '';
    this.errorResponseArray['ngTotalSt'] = '';
    this.errorResponseArray['ngTotalGeneral'] = '';
    this.errorResponseArray['ngsourceType'] = '';
    this.errorResponseArray['ngWaterqualityIssue'] = '';
    this.errorResponseArray['ngpumpHouse'] = '';
    this.errorResponseArray['ngpumpSet'] = '';
    this.errorResponseArray['ngKsebCon'] = '';
    this.errorResponseArray['ngPanelBoardStatus'] = '';
    this.errorResponseArray['ngWaterAvailability'] = '';
    this.errorResponseArray['ngPumpingMain'] = '';
    this.errorResponseArray['ngDistributionSystem'] = '';
    this.errorResponseArray['ngtypeOfStorageCapacity'] = '';
    this.errorResponseArray['ngStorageTank'] = '';
    this.errorResponseArray['ngDisInfectionUnit'] = '';
    this.errorResponseArray['ngWaterMeter'] = '';
    this.errorResponseArray['ngAverageMonthlyIncome'] = '';
    this.errorResponseArray['ngAverageMonthlyIncomeExpenceBg'] = '';
    this.errorResponseArray['ngSurplusFound'] = '';
    this.errorResponseArray['ngBgRegIsActive'] = '';
    this.errorResponseArray['ngAnnualBgIsconducted'] = '';
    this.errorResponseArray['ngBgContacttwo'] = '';
    this.errorResponseArray['ngBgContactOne'] = '';
    this.errorResponseArray['ngrejvinationNeeded'] = '';
    this.errorResponseArray['ngrejvinationNeededReson'] = '';
    this.errorResponseArray['ngSizeOfScheme'] = '';
    this.errorResponseArray['selectedFileSourceType'] = '';
    this.errorResponseArray['selectedFileSourcepumpHouse'] = '';
    this.errorResponseArray['selectedFileSourceStorageCapacity'] = '';
    this.errorResponseArray['ngcommisionDate'] = '';
    this.errorResponseArray['ngSchemeExpenditure'] = '';
    this.errorResponseArray['ngSchemeFunctionality'] = '';
  }


  clearForm() { 
    this.draftArray = {};
    this.ngDist = '';
    this.ngGp = '';
    this.ngAssembly = '';
    this.ngScheme = '';
    this.ngSchemeName = '';
    this.ngWard = '';
    this.ngTotalSc = '';
    this.ngTotalSt = '';
    this.ngTotalGeneral = '';
    this.ngsourceType = '';
    this.ngWaterqualityIssue = '';
    this.ngpumpHouse = '';
    this.ngpumpSet = '';
    this.ngKsebCon = '';
    this.ngPanelBoardStatus = '';
    this.ngWaterAvailability = '';
    this.ngPumpingMain = '';
    this.ngDistributionSystem = '';
    this.ngtypeOfStorageCapacity = '';
    this.ngStorageTank = '';
    this.ngDisInfectionUnit = '';
    this.ngWaterMeter = '';
    this.ngAverageMonthlyIncome = '';
    this.ngAverageMonthlyIncomeExpenceBg = '';
    this.ngSurplusFound = '';
    this.ngBgRegIsActive = '';
    this.ngAnnualBgIsconducted = '';
    this.ngBgContacttwo = '';
    this.ngBgContactOne = '';
    this.ngrejvinationNeeded = '';
    this.ngrejvinationNeededReson = '';
    this.ngSizeOfScheme = '';
    this.selectedFileSourceType = '';
    this.selectedFileSourcepumpHouse = '';
    this.selectedFileSourceStorageCapacity = '';
    this.ngcommisionDate = '';
    this.ngSchemeExpenditure = '';
    this.ngSchemeFunctionality = '';

  }



  SaveDraft() {
    let title = "Are you want to continue to save Draft ?";
    this.action = this.dialogService.open(ConfirmComponent, { context: { title } })
      .onClose.subscribe((status) => {
        if (status == this.config.OTYES) {

          let tempArray = {};
          tempArray['ngDist'] = this.ngDist;
          tempArray['ngGp'] = this.ngGp;
          tempArray['ngAssembly'] = this.ngAssembly;
          tempArray['ngScheme'] = this.ngScheme;
          tempArray['ngSchemeName'] = this.ngSchemeName;
          tempArray['ngWard'] = this.ngWard;
          tempArray['ngTotalSc'] = this.ngTotalSc;
          tempArray['ngTotalSt'] = this.ngTotalSt;
          tempArray['ngTotalGeneral'] = this.ngTotalGeneral;
          tempArray['ngsourceType'] = this.ngsourceType;
          tempArray['ngWaterqualityIssue'] = this.ngWaterqualityIssue;
          tempArray['ngpumpHouse'] = this.ngpumpHouse;
          tempArray['ngpumpSet'] = this.ngpumpSet;
          tempArray['ngKsebCon'] = this.ngKsebCon;
          tempArray['ngPanelBoardStatus'] = this.ngPanelBoardStatus;
          tempArray['ngWaterAvailability'] = this.ngWaterAvailability;
          tempArray['ngPumpingMain'] = this.ngPumpingMain;
          tempArray['ngDistributionSystem'] = this.ngDistributionSystem;
          tempArray['ngtypeOfStorageCapacity'] = this.ngtypeOfStorageCapacity;
          tempArray['ngStorageTank'] = this.ngStorageTank;
          tempArray['ngDisInfectionUnit'] = this.ngDisInfectionUnit;
          tempArray['ngWaterMeter'] = this.ngWaterMeter;
          tempArray['ngAverageMonthlyIncome'] = this.ngAverageMonthlyIncome;
          tempArray['ngAverageMonthlyIncomeExpenceBg'] = this.ngAverageMonthlyIncomeExpenceBg;
          tempArray['ngSurplusFound'] = this.ngSurplusFound;
          tempArray['ngBgRegIsActive'] = this.ngBgRegIsActive;
          tempArray['ngAnnualBgIsconducted'] = this.ngAnnualBgIsconducted;
          tempArray['ngBgContacttwo'] = this.ngBgContacttwo;
          tempArray['ngBgContactOne'] = this.ngBgContactOne;
          tempArray['ngrejvinationNeeded'] = this.ngrejvinationNeeded;
          tempArray['ngrejvinationNeededReson'] = this.ngrejvinationNeededReson;
          tempArray['ngSizeOfScheme'] = this.ngSizeOfScheme;
          tempArray['selectedFileSourceType'] = this.selectedFileSourceType;
          tempArray['selectedFileSourcepumpHouse'] = this.selectedFileSourcepumpHouse;
          tempArray['selectedFileSourceStorageCapacity'] = this.selectedFileSourceStorageCapacity;
          tempArray['ngcommisionDate'] = this.ngcommisionDate;
          tempArray['ngSchemeExpenditure'] = this.ngSchemeExpenditure;
          tempArray['ngSchemeFunctionality'] = this.ngSchemeFunctionality;
          tempArray['ngSchemeFunctionality'] = this.ngSchemeFunctionality;
          tempArray['selectedFileSourceType '] = this.selectedFileSourceType;
          tempArray['selectedFileSourcepumpHouse'] = this.selectedFileSourcepumpHouse;
          tempArray['selectedFileSourceStorageCapacity'] = this.selectedFileSourceStorageCapacity;
          tempArray['date'] = this.formattedDate;
          tempArray['uniqueId'] = this.uniqueId;
          tempArray['selectedWard'] = this.selectedWardArray;
          tempArray['userid'] = localStorage.getItem('userId');
          tempArray['office'] = localStorage.getItem('officeId');

          tempArray ['sourceLat'] = this.sourceLat;
          tempArray ['sourceLng'] = this.sourceLng;
          tempArray ['pumpLat'] = this.pumpLat;
          tempArray ['pumpLng'] = this.pumpLng;
          tempArray ['capLat'] = this.capLat;
          tempArray ['capLng'] = this.capLng;

          let draftStr = localStorage.getItem('offlineDraft');
          let length: number = 0;
          this.draftArray = {};
          if (draftStr != '' && draftStr != null && draftStr != undefined) {
            this.draftArray = JSON.parse(localStorage.getItem('offlineDraft'));
            length = Object.keys(this.draftArray).length
            this.draftArray[this.draftId] = tempArray;
            localStorage.setItem('offlineDraft', JSON.stringify(this.draftArray))
          } else {
            this.draftArray[this.draftId] = tempArray;
            localStorage.setItem('offlineDraft', JSON.stringify(this.draftArray))
          }
          console.log(this.draftArray);
          this.clearForm();
          this.config.doSync();
          this.router.navigateByUrl('/pages/listdraft');
          this.config.showSuccessToaster("Survey saved as Draft..");

        }
      });


  }

  doSubmit() {
    let title = "Are you want to continue to Submit ?";
    this.action = this.dialogService.open(ConfirmComponent, { context: { title } })
      .onClose.subscribe((status) => {
        if (status == this.config.OTYES) {
          this.clearValidation();
          let noError = 2

          //Validate input fields
          if (this.validateInput(this.ngDist) == false) {
            this.errorResponseArray['ngDist'] = 'Please select a District';
            noError = 1;
          }
          if (this.validateInput(this.ngGp) == false) {
            this.errorResponseArray['ngGp'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngAssembly) == false) {
            this.errorResponseArray['ngAssembly'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngScheme) == false) {
            this.errorResponseArray['ngScheme'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngSchemeName) == false) {
            this.errorResponseArray['ngSchemeName'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngWard) == false) {
            this.errorResponseArray['ngWard'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngTotalSc) == false) {
            this.errorResponseArray['ngTotalSc'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngTotalSt) == false) {
            this.errorResponseArray['ngTotalSt'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngTotalGeneral) == false) {
            this.errorResponseArray['ngTotalGeneral'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngsourceType) == false) {
            this.errorResponseArray['ngsourceType'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngWaterqualityIssue) == false) {
            this.errorResponseArray['ngWaterqualityIssue'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngpumpHouse) == false) {
            this.errorResponseArray['ngpumpHouse'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngpumpSet) == false) {
            this.errorResponseArray['ngpumpSet'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngKsebCon) == false) {
            this.errorResponseArray['ngKsebCon'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngPanelBoardStatus) == false) {
            this.errorResponseArray['ngPanelBoardStatus'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngWaterAvailability) == false) {
            this.errorResponseArray['ngWaterAvailability'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngPumpingMain) == false) {
            this.errorResponseArray['ngPumpingMain'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngDistributionSystem) == false) {
            this.errorResponseArray['ngDistributionSystem'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngtypeOfStorageCapacity) == false) {
            this.errorResponseArray['ngtypeOfStorageCapacity'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngStorageTank) == false) {
            this.errorResponseArray['ngStorageTank'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngDisInfectionUnit) == false) {
            this.errorResponseArray['ngDisInfectionUnit'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngWaterMeter) == false) {
            this.errorResponseArray['ngWaterMeter'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngAverageMonthlyIncome) == false) {
            this.errorResponseArray['ngAverageMonthlyIncome'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngAverageMonthlyIncomeExpenceBg) == false) {
            this.errorResponseArray['ngAverageMonthlyIncomeExpenceBg'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngSurplusFound) == false) {
            this.errorResponseArray['ngSurplusFound'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngBgRegIsActive) == false) {
            this.errorResponseArray['ngBgRegIsActive'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngAnnualBgIsconducted) == false) {
            this.errorResponseArray['ngAnnualBgIsconducted'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngBgContacttwo) == false) {
            this.errorResponseArray['ngBgContacttwo'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngBgContactOne) == false) {
            this.errorResponseArray['ngBgContactOne'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngrejvinationNeeded) == false) {
            this.errorResponseArray['ngrejvinationNeeded'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngrejvinationNeededReson) == false && this.ngrejvinationNeeded == 1) {
            this.errorResponseArray['ngrejvinationNeededReson'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngSizeOfScheme) == false) {
            this.errorResponseArray['ngSizeOfScheme'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.selectedFileSourceType) == false) {
            this.errorResponseArray['selectedFileSourceType'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.selectedFileSourcepumpHouse) == false) {
            this.errorResponseArray['selectedFileSourcepumpHouse'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.selectedFileSourceStorageCapacity) == false) {
            this.errorResponseArray['selectedFileSourceStorageCapacity'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngcommisionDate) == false) {
            this.errorResponseArray['ngcommisionDate'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngSchemeExpenditure) == false) {
            this.errorResponseArray['ngSchemeExpenditure'] = "This field is required..!"
            noError = 1;
          }
          if (this.validateInput(this.ngSchemeFunctionality) == false) {
            this.errorResponseArray['ngSchemeFunctionality'] = "This field is required..!"
            noError = 1;
          }

          if (noError == 1) {
            console.log(this.errorResponseArray);
            
          } else {  
            let tempArray = {};
            tempArray['ngDist'] = this.ngDist;
            tempArray['ngGp'] = this.ngGp;
            tempArray['ngAssembly'] = this.ngAssembly;
            tempArray['ngScheme'] = this.ngScheme;
            tempArray['ngSchemeName'] = this.ngSchemeName;
            tempArray['ngWard'] = this.ngWard;
            tempArray['ngTotalSc'] = this.ngTotalSc;
            tempArray['ngTotalSt'] = this.ngTotalSt;
            tempArray['ngTotalGeneral'] = this.ngTotalGeneral;
            tempArray['ngsourceType'] = this.ngsourceType;
            tempArray['ngWaterqualityIssue'] = this.ngWaterqualityIssue;
            tempArray['ngpumpHouse'] = this.ngpumpHouse;
            tempArray['ngpumpSet'] = this.ngpumpSet;
            tempArray['ngKsebCon'] = this.ngKsebCon;
            tempArray['ngPanelBoardStatus'] = this.ngPanelBoardStatus;
            tempArray['ngWaterAvailability'] = this.ngWaterAvailability;
            tempArray['ngPumpingMain'] = this.ngPumpingMain;
            tempArray['ngDistributionSystem'] = this.ngDistributionSystem;
            tempArray['ngtypeOfStorageCapacity'] = this.ngtypeOfStorageCapacity;
            tempArray['ngStorageTank'] = this.ngStorageTank;
            tempArray['ngDisInfectionUnit'] = this.ngDisInfectionUnit;
            tempArray['ngWaterMeter'] = this.ngWaterMeter;
            tempArray['ngAverageMonthlyIncome'] = this.ngAverageMonthlyIncome;
            tempArray['ngAverageMonthlyIncomeExpenceBg'] = this.ngAverageMonthlyIncomeExpenceBg;
            tempArray['ngSurplusFound'] = this.ngSurplusFound;
            tempArray['ngBgRegIsActive'] = this.ngBgRegIsActive;
            tempArray['ngAnnualBgIsconducted'] = this.ngAnnualBgIsconducted;
            tempArray['ngBgContacttwo'] = this.ngBgContacttwo;
            tempArray['ngBgContactOne'] = this.ngBgContactOne;
            tempArray['ngrejvinationNeeded'] = this.ngrejvinationNeeded;
            tempArray['ngrejvinationNeededReson'] = this.ngrejvinationNeededReson;
            tempArray['ngSizeOfScheme'] = this.ngSizeOfScheme;
            tempArray['selectedFileSourceType'] = this.selectedFileSourceType;
            tempArray['selectedFileSourcepumpHouse'] = this.selectedFileSourcepumpHouse;
            tempArray['selectedFileSourceStorageCapacity'] = this.selectedFileSourceStorageCapacity;
            tempArray['ngcommisionDate'] = this.ngcommisionDate;
            tempArray['ngSchemeExpenditure'] = this.ngSchemeExpenditure;
            tempArray['ngSchemeFunctionality'] = this.ngSchemeFunctionality;
            tempArray['ngSchemeFunctionality'] = this.ngSchemeFunctionality;
            tempArray['selectedFileSourceType '] = this.selectedFileSourceType;
            tempArray['selectedFileSourcepumpHouse'] = this.selectedFileSourcepumpHouse;
            tempArray['selectedFileSourceStorageCapacity'] = this.selectedFileSourceStorageCapacity;
            tempArray['date'] = this.formattedDate;
            tempArray['uniqueId'] = this.uniqueId;
            tempArray['selectedWard'] = this.selectedWardArray;
            tempArray['userid'] = localStorage.getItem('userId');
            tempArray['office'] = localStorage.getItem('officeId');

            tempArray ['sourceLat'] = this.sourceLat;
            tempArray ['sourceLng'] = this.sourceLng;
            tempArray ['pumpLat'] = this.pumpLat;
            tempArray ['pumpLng'] = this.pumpLng;
            tempArray ['capLat'] = this.capLat;
            tempArray ['capLng'] = this.capLng;

            let draftStr = localStorage.getItem('offlineSubmited');
            let length: number = 0;
            this.draftArray = {};
            if (draftStr != '' && draftStr != null && draftStr != undefined) {
              this.draftArray = JSON.parse(localStorage.getItem('offlineSubmited'));
              length = Object.keys(this.draftArray).length
              this.draftArray[length] = tempArray;
              localStorage.setItem('offlineSubmited', JSON.stringify(this.draftArray))
            } else {
              this.draftArray[length] = tempArray;
              localStorage.setItem('offlineSubmited', JSON.stringify(this.draftArray))
            }
            this.deleteSurveyFromDraft()
            this.config.doSync();
            console.log(this.draftArray);
            this.clearForm();
            this.config.showSuccessToaster("Survey Added Successfully..");
            this.router.navigateByUrl('/pages/listdraft');

          }



        }
      });


  }


  validateInput(input) {
    if (input == null || input == undefined || input == '') {
      return false;
    } else {
      return true;
    }

  }
  removeFromWardArray(item) {
    this.ngWard = 1500;
    this.selectedWardArray[item] = null;
  }

  populateData() {
    let storedData = JSON.parse(localStorage.getItem('editDraftItem'));

    if ( storedData['ngDist'] != '' &&  storedData['ngDist'] != undefined &&  storedData['ngDist'] != null  ){ 
        this.config.districtselected (  storedData['ngDist'] );
    }
    this.ngDist = storedData['ngDist']; 
    this.ngGp = storedData['ngGp'];
    this.ngAssembly = storedData['ngAssembly'];
    this.ngScheme = storedData['ngScheme'];
    this.ngSchemeName = storedData['ngSchemeName'];
    this.ngWard = storedData['ngWard'];
    this.ngTotalSc = storedData['ngTotalSc'];
    this.ngTotalSt = storedData['ngTotalSt'];
    this.ngTotalGeneral = storedData['ngTotalGeneral'];
    this.ngsourceType = storedData['ngsourceType'];
    this.ngWaterqualityIssue = storedData['ngWaterqualityIssue'];
    this.ngpumpHouse = storedData['ngpumpHouse'];
    this.ngpumpSet = storedData['ngpumpSet'];
    this.ngKsebCon = storedData['ngKsebCon'];
    this.ngPanelBoardStatus = storedData['ngPanelBoardStatus'];
    this.ngWaterAvailability = storedData['ngWaterAvailability'];
    this.ngPumpingMain = storedData['ngPumpingMain'];
    this.ngDistributionSystem = storedData['ngDistributionSystem'];
    this.ngtypeOfStorageCapacity = storedData['ngtypeOfStorageCapacity'];
    this.ngStorageTank = storedData['ngStorageTank'];
    this.ngDisInfectionUnit = storedData['ngDisInfectionUnit'];
    this.ngWaterMeter = storedData['ngWaterMeter'];
    this.ngAverageMonthlyIncome = storedData['ngAverageMonthlyIncome'];
    this.ngAverageMonthlyIncomeExpenceBg = storedData['ngAverageMonthlyIncomeExpenceBg'];
    this.ngSurplusFound = storedData['ngSurplusFound'];
    this.ngBgRegIsActive = storedData['ngBgRegIsActive'];
    this.ngAnnualBgIsconducted = storedData['ngAnnualBgIsconducted'];
    this.ngBgContacttwo = storedData['ngBgContacttwo'];
    this.ngBgContactOne = storedData['ngBgContactOne'];
    this.ngrejvinationNeeded = storedData['ngrejvinationNeeded'];
    this.ngrejvinationNeededReson = storedData['ngrejvinationNeededReson'];
    this.ngSizeOfScheme = storedData['ngSizeOfScheme'];
    this.selectedFileSourceType = storedData['selectedFileSourceType'];
    this.selectedFileSourcepumpHouse = storedData['selectedFileSourcepumpHouse'];
    this.selectedFileSourceStorageCapacity = storedData['selectedFileSourceStorageCapacity'];
    this.ngcommisionDate = storedData['ngcommisionDate'];
    this.ngSchemeExpenditure = storedData['ngSchemeExpenditure'];
    this.ngSchemeFunctionality = storedData['ngSchemeFunctionality'];
    this.ngSchemeFunctionality = storedData['ngSchemeFunctionality'];
    this.selectedWardArray = storedData['selectedWard'];
    this.uniqueId = storedData['uniqueId'];
    this.selectedFileSourceType = storedData['selectedFileSourceType'];
    this.selectedFileSourcepumpHouse = storedData['selectedFileSourcepumpHouse'];
    this.selectedFileSourceStorageCapacity = storedData['selectedFileSourceStorageCapacity'];
  }

  deleteSurveyFromDraft() {
    let draftStr = localStorage.getItem('offlineDraft');
    let length: number = 0;
    this.draftArray = {};
    let tempArray = {};
    if (draftStr != '' && draftStr != null && draftStr != undefined) {
      this.draftArray = JSON.parse(localStorage.getItem('offlineDraft'));
      let count: number = 0;
      for (let key in this.draftArray) {
        if (key != this.draftId) {
          tempArray[count] = this.draftArray;
          count++;
        }
      }
    }
    localStorage.setItem('offlineDraft', JSON.stringify(tempArray));
  }


  doclearForm(){
    let title = "Are you want to Clear form ?";
    this.action = this.dialogService.open(ConfirmComponent, { context: { title } })
      .onClose.subscribe((status) => {
        if (status == this.config.OTYES) {
            this.clearValidation();
            this.clearForm();
            this.config.showSuccessToaster("Form cleared successfully");
        }
      });
  }

  distelected(selectedValue: any) {
     console.log(selectedValue);
    var dest = selectedValue;
    this.config.districtselected( dest );
  }


  getplaceholder(itemArray , selected){
    if ( selected == null || selected == undefined || selected =='' ){
      return ''
    }else{
      for (let key in itemArray) {
        if (itemArray [key]['key'] == selected) {
          return itemArray [key]['value'];
        }
      }
    }

  }



  

  getCurrentLocationSource() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
         this.sourceLat = position.coords.latitude;
        this.sourceLng = position.coords.longitude;
      },error=>{
        this.config.showErrorToaster("GPS Location Error occured..");
      });
    }
    else {
      this.config.showErrorToaster("Geolocation is not supported by this browser.");
    }
  }


  getCurrentLocationPump(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
         this.pumpLat = position.coords.latitude;
        this.pumpLng = position.coords.longitude;
      },error=>{
        this.config.showErrorToaster("GPS Location Error occured..");
      });
    }
    else {
      this.config.showErrorToaster("Geolocation is not supported by this browser.");
    }

  }



  getCurrentLocationCapacity(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
         this.capLat = position.coords.latitude;
        this.capLng = position.coords.longitude;
      },error=>{
        this.config.showErrorToaster("GPS Location Error occured..");
      });
    }
    else {
      this.config.showErrorToaster("Geolocation is not supported by this browser.");
    }

  }
}



