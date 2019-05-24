
import { Component, OnInit, ViewEncapsulation, AfterViewInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CaseService, } from '../../../_services/case.service';
import { OpenNewCaseService } from '../../../_messages/opennewcase.service';
import stubbedResults from '../../../../assets/json/CaseTypes.json';
import { LoginComponent } from '../../../login/login.component';
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';
// import { MegaMenuComponent } from '../../pega/mega-menu/mega-menu.component';

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
  @Input() displayUserName: string;

    public pushRightClass: string;
    cases: any = [];

    caseTypes$: Array<any>;
    displayableCaseTypes$: Array<any>;
    // master = 'Master';
    master = 'Master';
    // fileNameDialogRef: MatDialogRef<FileNameDialogComponent>;

    // userName = '';
    constructor(
      private translate: TranslateService
      , public router: Router
      , private cservice: CaseService
      , private oncservice: OpenNewCaseService
      , private loginservice: LoginComponent

      // , private dialog: MatDialog
      ) {


        this.router.events.subscribe(val => {
            if (
                val instanceof NavigationEnd &&
                window.innerWidth <= 992 &&
                this.isToggled()
            ) {
                this.toggleSidebar();
            }
        });
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
    ngAfterViewInit() {
      this.loginservice.loginLoadingStop();
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
// export class HeroParentComponent {
//   master = 'Master';
// }
