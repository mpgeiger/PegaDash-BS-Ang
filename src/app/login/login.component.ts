
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

import { routerTransition } from '../router.animations';
import { UserService } from '../_services/user.service';
import { GetLoginStatusService } from '../_messages/getloginstatus.service';
import { DatapageService } from '../_services/datapage.service';
import { interval } from 'rxjs/internal/observable/interval';
import { AccountListService } from '@ss/app/layout/pega/_services/index';

// import { MatSnackBar } from '@angular/material';

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

  constructor(
    private uservice: UserService,
    private glsservice: GetLoginStatusService,
    private dservice: DatapageService,
    private as: AccountListService,
    // private snackBar: MatSnackBar,
    public router: Router
  ) {}

  name = new FormControl('');
  pxTextInputControl = new FormControl('', null);
//  regiForm = new FormGroup();

  ngOnInit() {
    // userName = "tech.cableco";
    // userPassword = "pega";

  }

  doLogin() {
    // delay, so on change for password value can get in
    this.loggingInLoading = true;
    const timer = interval(500).subscribe(() => {
      this.attemptLogin();
      timer.unsubscribe();
    });
  }

  attemptLogin() {

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

              this.as.setUserDisplayName(operator.pyUserName);

              localStorage.setItem('displayUserName', operator.pyUserName);
              localStorage.setItem('lastAccess', operator.pyLastSignon);
              localStorage.setItem('userFullName', operator.pyUserName);
              localStorage.setItem('userAccessGroup', operator.pyAccessGroup);
              localStorage.setItem('userWorkGroup', operator.pyWorkGroup);
              localStorage.setItem('userWorkBaskets', JSON.stringify(operator.pyWorkBasketList));
              localStorage.setItem('userEmailAddress', operator.pyAddresses.Email.pyEmailAddress);
              console.log( this.componentName + ' LS --> userName -->' + localStorage.getItem('userName'));
              console.log( this.componentName + ' LS --> displayUserName -->' + localStorage.getItem('displayUserName'));
              console.log( this.componentName + ' LS -- lastAccess-->' + localStorage.getItem('lastAccess'));

              // this.glsservice.sendMessage('LoggedIn');
              // console.log('Logged In-->', operator.pyUserName);
              // this.router.navigate(['summary-page']);
            },
            err => {
              const sError = 'Errors getting data page: ' + err.message;
              console.log(' Login INSIDE error-->\n' + sError);
              // let snackBarRef = this.snackBar.open(sError, 'Ok');
            }
            );


            operatorParams.set('EmailID', localStorage.getItem('userEmailAddress'));
            this.dservice.getDataPage('D_CustomerSummary', operatorParams).subscribe(
              response => {
                console.log(' begin D_CustomerSummary');
                // const customerSummaryResult: any = response.body;
                const customerSummary: any = this.getResults(response.body);
                localStorage.setItem('CifNbr', customerSummary.CifNbr);

                this.glsservice.sendMessage('LoggedIn');
                console.log('end D_CustomerSummary');
              // console.log('Logged In-->', operator.pyUserName);
            },
            err => {
              const sError = 'Errors getting data page: ' + err.message;
              console.log(' Login INSIDE error-->\n' + sError);
              // let snackBarRef = this.snackBar.open(sError, 'Ok');
            }
            );


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
