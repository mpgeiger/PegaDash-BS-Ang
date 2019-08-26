import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetUserAttributesArrayService {
componentName = '_messages GetUserAttributes Array Service ';
  private subject = new Subject<any>();

  sendMessage(aUserAttributes: Array<any>) {
    console.log(this.componentName + ' just sendMessage-->' + JSON.stringify(aUserAttributes));
      this.subject.next({ userAttributes: aUserAttributes});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
    // console.log(this.componentName + ' just getMessage-->' + JSON.stringify(this.subject));
      return this.subject.asObservable();
  }
}

@Injectable({
  providedIn: 'root'
})
export class GetUserAttributesObjectService {
  componentName = '_messages GetUserAttributes Object Service ';
    private subject = new Subject<any>();

    sendMessage(oUserAttributes: any) {
      console.log(this.componentName + ' just sendMessage-->' + JSON.stringify(oUserAttributes));
      this.subject.next(oUserAttributes);
    }

    clearMessage() {
      this.subject.next();
    }

    getMessage(): Observable<any> {

      // console.log(this.componentName + ' just getMessage-->' + JSON.stringify(this.subject));
        return this.subject.asObservable();
    }
  }
