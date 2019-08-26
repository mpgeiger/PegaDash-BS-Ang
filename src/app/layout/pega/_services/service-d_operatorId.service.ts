import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BehaviorSubject, Observable } from 'rxjs';
// import { Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { checkBinding } from '@angular/core/src/view/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { UserService } from '@ss/app/_services/user.service';
import { GetLoginStatusService } from '@ss/app/_messages/getloginstatus.service';
import { DatapageService } from '@ss/app/_services/datapage.service';


// export interface UserInfo {
//   loginName: string;
//   displayName: string;
//   laseAccess: string;
// }


@Injectable({
  providedIn: 'root'
})


export class DOperatorIDService {
  serviceName = 'pega/_services/supp-login-service.service';

  // allData: Data[] = new Array<Data>();
  // allData$: BehaviorSubject<Data[]>;
  allData: any = {};
  allData$: BehaviorSubject<{}>;

  constructor(
    private uservice: UserService,
    private dservice: DatapageService,

    // private ps: PegaSessionService,
    // private pv: PegaVariablesPropertiesComponent,
    // private snackBar: MatSnackBar,
    // public router: Router
  ) {
    this.initializeDataService();
  }
  initializeDataService() {
    if (!this.allData$) {
      this.allData$ = <BehaviorSubject<{}>> new BehaviorSubject(new Object());
      const operatorParams = new HttpParams();

      this.dservice.getDataPage('D_OperatorID', operatorParams)
        //  .map(res => res.json())
        // .catch(this.handleError)
        .subscribe(
          allData => {
            this.allData = allData.body;
            console.log(this.serviceName + 'INITIALIZE  this.dservice.getDataPage\n\n--' + JSON.stringify(this.allData));
            // this.allData = allData.body;
            // allData = {'slskdf': '123', 'lskfdsdjf': '567567576'};
            // this.allData$.next(Object.assign(this.allData));
            this.allData$.next(this.allData);
          },
          error => console.log('Error subscribing to DataService: ' + error)
        );





      // this.http.get(properties.DATA_API)
      //   .map(this.extractData)
      //   .catch(this.handleError)
      //   .subscribe(
      //     allData => {
      //       this.allData = allData;
      //       this.allData$.next(allData);
      //     },
      //     error => console.log("Error subscribing to DataService: " + error)
      //   );
    }
  }

  subscribeToDataService(): Observable<{}> {
    console.log(this.serviceName + ' subscribeToDataService this.dservice.getDataPage\n\n--' + JSON.stringify(this.allData));


    return this.allData$.asObservable();
  }



}
