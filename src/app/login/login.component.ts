import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { HttpParams } from '@angular/common/http';

import { routerTransition } from '../router.animations';
import { UserService } from '../_services/user.service';
import { GetLoginStatusService } from '../_messages/getloginstatus.service';
import { DatapageService } from '../_services/datapage.service';
import { interval } from 'rxjs/internal/observable/interval';

// import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./nxn-loginpage.scss',
  './login.component.scss'
              ],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginData: any = {};

  constructor(
    private uservice: UserService,
    private glsservice: GetLoginStatusService,
    private dservice: DatapageService,
    // private snackBar: MatSnackBar,
    public router: Router
  ) {}

  pxTextInputControl = new FormControl('', null);
  ngOnInit() {
    // userName = "tech.cableco";
    // userPassword = "pega";

  }

  doLogin() {
    // delay, so on change for password value can get in

    const timer = interval(100).subscribe(() => {
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

          this.dservice.getDataPage('D_OperatorID', operatorParams).subscribe(
            response => {
              const operator: any = response.body;
              localStorage.setItem('userFullName', operator.pyUserName);
              localStorage.setItem('userAccessGroup', operator.pyAccessGroup);
              localStorage.setItem('userWorkGroup', operator.pyWorkGroup);
              localStorage.setItem('userWorkBaskets', JSON.stringify(operator.pyWorkBasketList));

              this.glsservice.sendMessage('LoggedIn');
              console.log('Logged In-->', operator.pyUserName);
              this.router.navigate(['summary-page']);


            },
            err => {
              const sError = 'Errors getting data page: ' + err.message;
              console.log(' Login INSIDE error-->\n' + sError);
              // let snackBarRef = this.snackBar.open(sError, 'Ok');
            }
          );
        }
      },
      err => {
       // const snackBarRef = this.snackBar.open(err.message, 'Ok');
       // this.glsservice.sendMessage('LoggedOut');
        localStorage.clear();
      }
    );
    localStorage.setItem('isLoggedin', 'true');
  }

  fieldChanged(e) {
    this.loginData[e.target.id] = e.target.value;
  }

  onLoggedin() {
    localStorage.setItem('isLoggedin', 'true');
  }
}
