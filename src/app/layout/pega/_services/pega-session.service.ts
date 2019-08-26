import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { checkBinding } from '@angular/core/src/view/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { GetUserAttributesArrayService, GetUserAttributesObjectService } from '@ss/app/layout/pega/_messages/getuserattributes.service';
import { PegaVariablesPropertiesComponent,  } from '@ss/pega-shared/pega-variables-properties.component';


 interface UserAttributeType {
  name:  string;
  value: number | string;
}

interface UserAttributesObject {
  displayUserName:    string;
  lastAccess:         Date;
  userEmailAddress:   string;
  userFullName:       string;
  userAccessGroup:    string;
  userWorkGroup:      string;
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

  _userAttributes_Array: UserAttributeType[] = [];
  _userAttributes_Object = {};
  // luUserAttributes: UserAttributeType[] = [];

  private subject = new Subject<any>();
  private accountsSummary = new Subject<any>();
  private userAttributes_Array = new Subject<any>();
  private userAttributes_Object = new Subject<any>();
  // private userInfo = new Subject<UserInfo>();
  private displayName = new Subject<any>();
  private rgbaColorPalette = new Subject<any>();

  constructor(
    private gUA_Array: GetUserAttributesArrayService,
    private gUA_Object: GetUserAttributesObjectService
  ) {}
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
     this._userAttributes_Array.find(item => item.name === updateName).value = updateValue;
     console.log(this.serviceName + '###  updateUserAttributeValue' + updateName + 'to value-->' + updateValue );

  }


  setUserAttributesByArray(array: UserAttributeType[]) {
    // this._userAttributes = [];
    // this._userAttributes = Object.assign([], array );
    array.forEach(element => {
      const name = element.name;
      const value = element.value;
      console.log('__' + this.serviceName + ' setUserAttributesByArray--' + name);
      if (this.uniqueAttr(name, value, this._userAttributes_Array)) {
        this._userAttributes_Array.push(element);
      }
      // this.gUA_Array.sendMessage(this._userAttributes_Array);
      // this.gUA_Object.sendMessage(this._userAttributes_Array);

    });

    // Set BOTH a Usedr Attribute ARRAY and Object -- just because it is eashier to use different formats depending on the component.
    this._userAttributes_Object = this.convertArray2Object(this._userAttributes_Array);

    console.log(this.serviceName + '  JUST CREATED the UA Object plain--> ' + this._userAttributes_Object);
    console.log(this.serviceName + '  JUST CREATED the UA Object--> ' + JSON.stringify(this._userAttributes_Object));
    console.log(this.serviceName + '  JUST CREATED the UA Array--> ' + JSON.stringify(this._userAttributes_Array));


    this.gUA_Array.sendMessage(this._userAttributes_Array);
    this.gUA_Object.sendMessage(this._userAttributes_Object);


    console.log('__' + this.serviceName + ' this._userAttributes_Array--'  + JSON.stringify(this._userAttributes_Array));
    this.userAttributes_Object.next(this.userAttributes_Object);
    this.userAttributes_Array.next(this._userAttributes_Array);
  }

  private convertArray2Object(arr: any[]): {} {
    const attrs: any = {};
    // const attrs = {} as IoUserAttributes;
    arr.forEach(element => {
      attrs[element.name] = element.value;
    });
    // console.log(this.serviceName + ' convertArray2Object -->' + JSON.stringify(attrs));
    return attrs;
    // this.userAttributesObject = attrs;
  }

  addUserAttribute(name: string, value: number | string ) {
    const attr = {'name': name, 'value' : value};
    if (this.uniqueAttr(name, value, this._userAttributes_Array)) {
      // console.log('__' + this.serviceName + ' addUserAttribute__>' + name + '____' + JSON.stringify(attr));
      this._userAttributes_Array.push(attr);
    }
    this.userAttributes_Array.next(this._userAttributes_Array);
    // console.log('__' + this.serviceName + ' addUserAttribute__Object --> ' + JSON.stringify(this.userAttributes));
  }

  getUserAttributesArray(): Observable<any> {
    // MPG wheen running in DEV mode in Angular the services get run twice which results in an "irritatining"
    //    result of duplicate elements in the array.    Here I am simply removing before returning the array
    const result = Array.from(this._userAttributes_Array.reduce((m, t) => m.set(t.name, t), new Map()).values());
    // return this.userAttributes.asObservable();
    // return this.userAttributes.asObservable();
    // return this.userAttributes_Array;
    return this.userAttributes_Array;
  }


  getUserAttributesObject(): Observable<any> {
    // MPG wheen running in DEV mode in Angular the services get run twice which results in an "irritatining"
    //    result of duplicate elements in the array.    Here I am simply removing before returning the array
    const result = Array.from(this._userAttributes_Array.reduce((m, t) => m.set(t.name, t), new Map()).values());
    this._userAttributes_Object = this.convertArray2Object(result);
    // return this.userAttributes.asObservable();
    // return this.userAttributes.asObservable();
   console.log('__' + this.serviceName + ' getUserAttributesObject --> ' + JSON.stringify(this._userAttributes_Object));

    return this.userAttributes_Object;
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
    // return this.displayName.asObservable();
    return this.displayName;
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
