import { MegaMenuComponent } from './../../pega/mega-menu/mega-menu.component';
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CaseService, } from '../../../_services/case.service';
import { OpenNewCaseService } from '../../../_messages/opennewcase.service';
import stubbedResults from '@ss/json/CaseTypes.json';
import { LoginComponent } from '../../../login/login.component';

// import { ModalRCIPegaComponent } from '@ss/app/layout/pega/modal-container/modal-container.component';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
// import { MegaMenuComponent } from '../../pega/mega-menu/mega-menu.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogDialog } from '../mega-menu-modal/mega-menu-modal.component';
import { PegaSessionService } from '@ss/app/layout/pega/_services/index';

@Component({
    providers: [LoginComponent],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
    // , encapsulation: ViewEncapsulation.None

})
export class HeaderComponent implements OnInit, AfterViewInit {
  componentName = 'header.component';
  pegaService = 'NA';

  // subscription: Subscription;
  subscriptionDisplayName: Subscription;
  messages: any[] = [];
  userInfo = {};

  // @Input() displayUserName: string;

    public pushRightClass: string;
    cases: any = [];

    caseTypes$: Array<any>;
    displayableCaseTypes$: Array<any>;
    // master = 'Master';
    master = 'Master';

    constructor(
      private translate: TranslateService
      , public router: Router
      , private cservice: CaseService
      , private oncservice: OpenNewCaseService
      , private loginservice: LoginComponent
      , public dialog: MatDialog
      , private as: PegaSessionService

      // , private megaMenu: ModalRCIPegaComponent


      // , private dialog: MatDialog
      ) {


        // this.router.events.subscribe(val => {
        //     if (
        //         val instanceof NavigationEnd &&
        //         window.innerWidth <= 4992 &&
        //         this.isToggled()
        //     ) {
        //         // this.toggleSidebar();
        //     }
        // });
        this.subscriptionDisplayName = this.as.getUserDisplayName().subscribe( message => {
          if (message) {
            this.messages.push(message);

            this.userInfo = message;

           // console.log(this.componentName + ' getUserDisplayName _displayName -->' + JSON.stringify(this.userInfo));
          } else {
            // clear messages when empty message received
            this.messages = [];
          }
        });
        // this.loginservice.loginLoadingStop();


    }

    openDialog(): void {

      const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;

    dialogConfig.width = '70%';
    dialogConfig.minWidth = '900px';
    dialogConfig.minHeight = '700px';
    dialogConfig.height = '700px';
    dialogConfig.maxWidth = '1000px';
    dialogConfig.panelClass = 'megaMenu-modal-box';

    dialogConfig.data = { component: MegaMenuComponent };

      const dialogRef = this.dialog.open(DialogDialog, dialogConfig);
      // const dialogRef = this.dialog.open(DialogDialog, {
      //   width: '250px',
      //   data: { component: MegaMenuComponent }
      // });
    }


    ngOnInit() {
        this.pushRightClass = 'push-right';
        // this.userName = localStorage.getItem('s');
        // this.getCaseTypes();
        // if (this.checkIfStubbed()) {
        //   console.log('STUBBED CaseTypes');
        //   this.getStubbedCaseTypes();
        // } else {
        //   console.log('LIVE CaseTypes');
        //   this.getCaseTypes();
        // }

    }
    ngAfterViewInit(): void {

    }

checkIfStubbed() {
    const useStubStr = localStorage.getItem('useStubbedData');

    let useStub = false;
    useStub = (useStubStr === 'true');
    return useStub;
  }
  getStubbedCaseTypes() {
    const stubbed: any = stubbedResults;
    this.cases = Object.keys(this.getCaseTypeResults(stubbed)).map(it => this.getCaseTypeResults(stubbed)[it]);
    // this.cases = JSON.parse(response.body);
   // this.sortedData = this.cases.slice();
   this.cases = this.cases.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));


    // this.dataSource.filterPredicate = this.createFilter();
    localStorage.setItem('CaseTypes', this.cases.length.toString());
  //  this.showLoading = false;
  }

  public openModalDialogForService(ev, action): void {
    // this.mc.openCreateRciCaseDialog();
    // console.log(this.componentName + 'RCI Clicked Create event-->' + action + '___caught-->' + JSON.stringify(ev) );
    // if (action === 'Request Cheque Image') {


      // this.rciMashup.openRciMashupCaseDialog();


      // }
    // if (action === 'Wire Recall') {
    //   this.rciMashup.openWireRecalMashupCaseDialog();
    // }
  }

    getCaseTypes() {
      this.cservice.getCaseTypes().subscribe(
        response => {
          this.cases = Object.keys(this.getCaseTypeResults(response.body)).map(it => this.getCaseTypeResults(response.body)[it]);
          this.cases = this.cases.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
          localStorage.setItem('CaseTypes', this.cases.length.toString());
      },
      err => {
        const sError = 'Errors getting data page: ' + err.message;
        console.log(' Login INSIDE error-->\n' + sError);
        // let snackBarRef = this.snackBar.open(sError, 'Ok');
      }
    );
    }
    createCaseType(caseType: any) {
      if (caseType.startingProcesses[0].requiresFieldsToCreate === 'false') {
        // skip new
        this.cservice.createCase(caseType.ID, {}).subscribe(
          response => {
            // create a "row" that matches the worklist row, this way we can re-use
            // the open assignment service
            const row: any = {};
            const myCase: any = response.body;


            row['pxRefObjectKey'] = myCase.ID;
            row['pxRefObjectInsName'] = myCase.ID.split(' ')[1];
            row['pzInsKey'] = myCase.nextAssignmentID;

            // this.oaservice.sendMessage(row.pxRefObjectInsName, row);
            // this.rwlservice.sendMessage('Work');


          },
          err => {
            alert('Errors from create case:' + err.errors);
          }

        );
      } else {
        // new
        this.oncservice.sendMessage(caseType.ID);

      }


    }
    openDemoConfig() {
      // this.router.navigateByUrl("https://www.google.com");
      // window.location.href="http://bny.pegatsdemo.com:8800/config";
      // window.open('http://admin:pegasys@bny.pegatsdemo.com:8800/config', '_blank');
      // window.open('http://bny.pegatsdemo.com:8800/config', '_blank');
      window.open('http://82fsserviceexcellence.pegatsdemo.com:8800/config', '_blank');
  }


    getCaseTypeResults(data) {
      // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
      return data.caseTypes;
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    rltAndLtr() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle('rtl');
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
    }

    changeLang(language: string) {
        this.translate.use(language);
    }

    //  MPG Event to prevent closing the MENU

  //   stopPropagation(event) {
  //     event.stopPropagation();
  // }


 }
 @Component({
  selector: 'dynamic-comp',
  template: '<div>Dynamic component</div>'
})
export class DynamicComponent {

}
// export class HeroParentComponent {
//   master = 'Master';
// }
