import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { ReferenceHelper } from '../_helpers/reference-helper';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  refHelper: ReferenceHelper = new ReferenceHelper();

  constructor(private http: HttpClient) { }


  caseUrl = endpoints.BASEURL + endpoints.CASES;
  caseTypeUrl = endpoints.BASEURL + endpoints.CASETYPES;

  pxResults: Object;

  // get a case of given id
  getCase(id) {

    const caseParams = new HttpParams();
    let caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');
    caseHeaders = caseHeaders.append('Access-Control-Expose-Headers', 'etag');

    return this.http.get(this.caseUrl + '/' + id,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // get a list of possible case types to create
  getCaseTypes() {
    const caseParams = new HttpParams();
    let caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');

    return this.http.get(this.caseTypeUrl,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // get a case that is "new"
  getCaseCreationPage(id) {
    const caseParams = new HttpParams();
    let caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');

    return this.http.get(this.caseTypeUrl + '/' + id,
      { observe: 'response', params: caseParams, headers: caseHeaders});


  }

  createCasePW(id,content) {

    const encodedUser = 'cGF1bC53YWduZXJAYm55LmNvbTppbnN0YWxsMTIzNDUh';
    const caseParams = new HttpParams();

    const caseBody: any = {};
    caseBody.caseTypeID = id;
    caseBody.processID = 'pyStartCase',
    caseBody.content = content;

    let caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');

    return this.http.post(this.caseUrl, caseBody,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // create a case (with new or skip new)
  createCase(id, content) {
    const pwEncodedUser = 'cGF1bC53YWduZXJAYm55LmNvbTppbnN0YWxsMTIzNDUh'
    const caseParams = new HttpParams();

    const caseBody: any = {};
    caseBody.caseTypeID = id;
    caseBody.processID = 'pyStartCase',
    caseBody.content = content;
    const encodedUser = localStorage.getItem('encodedUser');

    let caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');

    return this.http.post(this.caseUrl, caseBody,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // update a case, save to server
  updateCase(caseID, eTag, actionName, body) {
    let caseParams = new HttpParams();
    if (actionName && actionName !== '') {
      caseParams = caseParams.append('actionID', actionName);
    }
    const encodedUser = localStorage.getItem('encodedUser');

    let caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');
    caseHeaders = caseHeaders.append('If-Match', '"' + eTag + '"');

    const oContent = this.refHelper.getPostContent(body);

    const encodedId = encodeURI(caseID);

    return this.http.put(this.caseUrl + '/' + encodedId,
     { 'content' : oContent },
     { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // refresh a case, post data, but no save
  refreshCase(myCase, body) {
    const caseParams = new HttpParams();
    const encodedUser = localStorage.getItem('encodedUser');

    let caseHeaders = new HttpHeaders();
    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');
    caseHeaders = caseHeaders.append('If-Match', myCase.etag);


    const oContent = this.refHelper.getPostContent(body);

    const encodedId = encodeURI(myCase.ID);

    return this.http.put(this.caseUrl + '/' + encodedId + endpoints.REFRESH,
     { 'content' : oContent },
     { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // get a case with a given page (new, review, confirm)
  getPage(caseID, pageID) {

    const caseParams = new HttpParams();
    let caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');

    return this.http.get(this.caseUrl + '/' + caseID + endpoints.PAGES + '/' + pageID,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }

  // get a case and a view layout
  getView(caseID, viewID) {
    console.log('viewID-->' + viewID);

    const caseParams = new HttpParams();
    let caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');

    return this.http.get(this.caseUrl + '/' + caseID + endpoints.VIEWS + '/' + viewID,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }


  cases() {
    const caseParams = new HttpParams();
    let caseHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    caseHeaders = caseHeaders.append('Content-Type', 'application/json');
    // caseHeaders = caseHeaders.append('Authorization', 'Basic ' + encodedUser);
    // caseHeaders = caseHeaders.append('Access-Control-Allow-Origin', '10.2.200.85');
    // caseHeaders = caseHeaders.append('Access-Control-Allow-Headers', '*');
    // caseHeaders = caseHeaders.append('Origin', '*');
    return this.http.get(this.caseUrl,
      { observe: 'response', params: caseParams, headers: caseHeaders});
  }


}
