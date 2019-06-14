import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { checkBinding } from '@angular/core/src/view/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface UserAttributeType {
  name:  string;
  value: number | string;
}

// export interface UserInfo {
//   loginName: string;
//   displayName: string;
//   laseAccess: string;
// }


@Injectable({
  providedIn: 'root'
})


export class PegaSessionService {
  serviceName = 'pega-session.service';

  _userAttributes: UserAttributeType[] = [];
  // luUserAttributes: UserAttributeType[] = [];

  private subject = new Subject<any>();
  private accountsSummary = new Subject<any>();
  private userAttributes = new Subject<any>();
  // private userInfo = new Subject<UserInfo>();
  private displayName = new Subject<any>();
  private rgbaColorPalette = new Subject<any>();

  uniqueAttr(name: string, value: string | number, arr): boolean {
      if ( arr.some(e => e.name === name)) {
        console.log('$$$ EXISTS_' + name + 'in array-->' + JSON.stringify(arr) );


        this.updateUserAttributeValue(name, value);

        return false;
      } else {
        console.log('$$$ UNIQUE_' + name + 'in array-->' + JSON.stringify(arr) );
      return true;
    }
  }

  updateUserAttributeValue (updateName: string, updateValue:  string | number) {
     this._userAttributes.find(item => item.name === updateName).value = updateValue;
     console.log(this.serviceName + '###  updateUserAttributeValue' + updateName + 'to value-->' + updateValue );

  }


  setUserAttributesByArray(array: UserAttributeType[]) {
    // this._userAttributes = [];
    // this._userAttributes = Object.assign([], array );
    array.forEach(element => {
      const name = element.name;
      const value = element.value;
      console.log('__' + this.serviceName + ' setUserAttributesByArray--' + name);
      if (this.uniqueAttr(name, value, this._userAttributes)) {
        this._userAttributes.push(element);
      }
    });

    console.log('__' + this.serviceName + ' this._userAttributes--'  + JSON.stringify(this._userAttributes));
    this.userAttributes.next(this._userAttributes);
  }

  addUserAttribute(name: string, value: number | string ) {
    const attr = {'name': name, 'value' : value};
    if (this.uniqueAttr(name, value, this._userAttributes)) {
      // console.log('__' + this.serviceName + ' addUserAttribute__>' + name + '____' + JSON.stringify(attr));
      this._userAttributes.push(attr);
    }
    this.userAttributes.next(this._userAttributes);
    // console.log('__' + this.serviceName + ' addUserAttribute__Object --> ' + JSON.stringify(this.userAttributes));
  }

  getUserAttributes(): Observable<any> {
    // MPG wheen running in DEV mode in Angular the services get run twice which results in an "irritatining"
    //    result of duplicate elements in the array.    Here I am simply removing before returning the array
    const result = Array.from(this._userAttributes.reduce((m, t) => m.set(t.name, t), new Map()).values());


    return this.userAttributes.asObservable();
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
    // console.log('__' + this.serviceName + ' Sending--> ' + JSON.stringify(message));
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    // console.log('__' + this.serviceName + ' Receiving-> ' + this.subject.asObservable());
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
    this.displayName.next({ displayName: name });
    // console.log('__ ' + this.serviceName + ' SET UserDisplayName--> ' + this.displayName);
  }

  getUserDisplayName(): Observable<any> {
    // console.log('__ ' + this.serviceName + ' GET UserDisplayName--> ');
    return this.displayName.asObservable();
  }


  setRgbColorPalette(oPaletteArray: Array<any>) {
    console.log(this.serviceName + ' ### setRgbColorPalette ->' + oPaletteArray);
    this.rgbaColorPalette.next({ colors: oPaletteArray });
  }

  getRgbColorPalette(): Observable<any> {
    console.log(this.serviceName + ' ### getRgbColorPalette ->' + JSON.stringify(this.rgbaColorPalette));
    return this.rgbaColorPalette.asObservable();
  }

}
