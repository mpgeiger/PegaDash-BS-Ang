import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GetUserAttributesService {
componentName = '_messages GetUserAttributesService ';
  private subject = new Subject<any>();

  sendMessage(oUserAttributes: Object) {
    console.log(this.componentName + ' just got-->' + JSON.stringify(oUserAttributes));
      this.subject.next({ userAttributes: oUserAttributes});
  }

  clearMessage() {
      this.subject.next();
  }

  getMessage(): Observable<any> {
      return this.subject.asObservable();
  }
}

