import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface UserInfo {
  loginName: string;
  displayName: string;
  laseAccess: string;
}


@Injectable({
  providedIn: 'root'
})
export class AccountListService {
serviceName = 'account-list.service';
private subject = new Subject<any>();
private accountsSummary = new Subject<any>();
private userInfo = new Subject<UserInfo>();

private displayName = new Subject<any>();


sendMessage(message: string) {
  this.subject.next({ text: message });
  console.log('__' + this.serviceName + ' Sending--> ' + JSON.stringify(message));
}

clearMessages() {
  this.subject.next();
}

getMessage(): Observable<any> {
  console.log('__' + this.serviceName + ' Receiving-> ' + this.subject.asObservable());
  return this.subject.asObservable();
}



setAccountList(accList: object) {
    console.log('__' + this.serviceName + ' SET setAccountList --> ' + JSON.stringify(accList));
    this.accountsSummary.next(accList);
    // console.log('__' + this.serviceName + ' SET--> ' + accList + '--' + value);
    //  debugger;
    // this.data = option + '---' + value;
   }

   getAccountList(): Observable<any> {
      console.log('__' + this.serviceName + ' GET getAccountList--> ' + JSON.stringify(this.accountsSummary));

       return this.accountsSummary;
     }


     setUserDisplayName(name) {
       this.displayName.next({displayName: name});
       console.log('__ ' + this.serviceName + ' SET UserDisplayName--> ' + this.displayName);

      }

      getUserDisplayName(): Observable<any> {
        console.log('__ ' + this.serviceName + ' GET UserDisplayName--> ');

        return this.displayName.asObservable();
     }
  // constructor() { }
  //  data = {'foo': 'bar',
  // 'ding': 'dat'};

  // setAccountList(option, value) {
  //   console.log('__' + this.serviceName + ' SET--> ' + option + '--' + value);
  //   //  debugger;
  //   // this.data = option + '---' + value;
  //  }

  //  getAccountList() {
  //   console.log('__' + this.serviceName + ' GET--> ' + JSON.stringify(this.data));

  //    return this.data;
  //  }
}
