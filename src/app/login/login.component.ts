
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

import { routerTransition } from '../router.animations';
import { UserService } from '../_services/user.service';
import { GetLoginStatusService } from '../_messages/getloginstatus.service';
import { DatapageService } from '../_services/datapage.service';
import { interval } from 'rxjs/internal/observable/interval';
import { PegaSessionService } from '@ss/app/layout/pega/_services/index';
import { PegaVariablesPropertiesComponent } from '@ss/app/shared-pega/pega-variables-properties.component';
// import { UserAttributeTypeType } from '@ss/app/layout/pega/_services/index';
// import { MatSnackBar } from '@angular/material';
// export interface UserAttributes {
//   name: number | string;
//   value: number | string;
// }
interface UserAttributeType {
  name: string;
  value: number | string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './nxn-loginpage.scss',
    './login.component.scss'
              ],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  componentName = 'login.component';
  pegaService = 'D_OperatorID';
  loginData: any = {};
  loggingInLoading = false;

  luUserAttributes: UserAttributeType[] = [];



  constructor(
    private uservice: UserService,
    private glsservice: GetLoginStatusService,
    private dservice: DatapageService,
    private ps: PegaSessionService,
    private pv: PegaVariablesPropertiesComponent,
    // private snackBar: MatSnackBar,
    public router: Router
  ) {}

  name = new FormControl('');
  pxTextInputControl = new FormControl('', null);
//  regiForm = new FormGroup();

  ngOnInit() {
    // userName = "tech.cableco";
    // userPpssword = "pega";

  }

  doLogin() {
    // delay, so on change for ppssword value can get in
    this.loggingInLoading = true;
    const timer = interval(500).subscribe(() => {
      this.attemptLogin();
      timer.unsubscribe();
    });
  }

  attemptLogin() {
    const needAttrs = ['displayUserName', 'lastAccess', 'userEmailAddres', 'userFullName', 'userEmailAddres', 'userFullName', 'userAccessGroup', 'userWorkGroup', 'userWorkBaskets', 'userEmailAddress'];

    this.luUserAttributes = [];

    this.uservice.login(this.loginData.userName, this.loginData.password).subscribe(
      response => {
        if (response.status === 200) {
          // tslint:disable-next-line:prefer-const
          let operatorParams = new HttpParams();
          console.log(' begin attemptLogin');
          this.dservice.getDataPage('D_OperatorID', operatorParams).subscribe(
            response => {
              // console.log(' begin D_OperatorID');
              const operator: any = response.body;
              // localStorage.setItem('username', this.loginData.userName);
              // console.log(' in nbs-offer-component username-->' + this.loginData.userName);

              this.ps.setUserDisplayName(operator.pyUserName);

              this.luUserAttributes.push(this.pv.createUserAttributeObject('displayUserName', operator.pyUserName));
              this.luUserAttributes.push(this.pv.createUserAttributeObject('lastAccess', operator.pyLastSignon ));
              this.luUserAttributes.push(this.pv.createUserAttributeObject('userEmailAddress', operator.pyAddresses.Email.pyEmailAddress ));
              this.luUserAttributes.push(this.pv.createUserAttributeObject('userFullName', operator.pyUserName ));
              this.luUserAttributes.push(this.pv.createUserAttributeObject('userAccessGroup', operator.pyAccessGroup ));
              this.luUserAttributes.push(this.pv.createUserAttributeObject('userWorkGroup', operator.pyWorkGroup ));

              console.log(this.componentName + '  __luUserAttributes' + JSON.stringify(this.luUserAttributes));
              this.ps.setUserAttributesByArray(this.luUserAttributes);

              // this.ps.addUserAttribute('userWorkGroup', 'MY TEST CHANGE UPDATE');
              // this.ps.setUserAttributes(this.luUserAttributes);

            },
            err => {
              const sError = 'Errors getting data page: ' + err.message;
              console.log(' Login INSIDE error-->\n' + sError);
              // let snackBarRef = this.snackBar.open(sError, 'Ok');
            }
            );


            // operatorParams.set('EmailID', localStorage.getItem('userEmailAddress'));
            // this.dservice.getDataPage('D_CustomerSummary', operatorParams).subscribe(
            //   response => {
            //     console.log(' begin D_CustomerSummary');
            //     // const customerSummaryResult: any = response.body;
            //     const customerSummary: any = this.getResults(response.body);
            //     localStorage.setItem('CifNbr', customerSummary.CifNbr);

            //     this.glsservice.sendMessage('LoggedIn');
            //     console.log('end D_CustomerSummary');
            //   // console.log('Logged In-->', operator.pyUserName);
            // },
            // err => {
            //   const sError = 'Errors getting data page: ' + err.message;
            //   console.log(' Login INSIDE error-->\n' + sError);
            //   // let snackBarRef = this.snackBar.open(sError, 'Ok');
            // }
            // );


            this.router.navigate(['summary-page']);

        }
      },
      err => {
        // const snackBarRef = this.snackBar.open(err.message, 'Ok');
        // this.glsservice.sendMessage('LoggedOut');
        localStorage.clear();
      }
      );
      console.log(' end attemptLogin');
      localStorage.setItem('isLoggedin', 'true');

  }

  fieldChanged(e) {
    this.loginData[e.target.id] = e.target.value;
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }

  getResults(data) {
    // localStorage.setItem('numUnifiedTaskList', data.pxResults.length);
    return data.pxResults;
  }

  public loginLoadingStop()  {
    this.loggingInLoading = false;
  }


}
