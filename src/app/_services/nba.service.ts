import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { ReferenceHelper } from '../_helpers/reference-helper';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';



@Injectable({
  providedIn: 'root'
})
export class NbaService {

  refHelper: ReferenceHelper = new ReferenceHelper();

  NbaCaptureResponse = {
    'CustomerID': 'PEGASAFS-WORK-CONTACT CON-488',
    'ContainerName': 'BNYServices',
    'RankedResults': [{
      'Name': 'FXACHPayment',
      'Issue': 'Sales',
      'Group': 'Treasury',
      'InteractionID': '5262371569457456502',
      'Outcome': 'Accepted',
      'Behaviour': 'Positive',
      'Direction': 'Inbound',
      'Channel': 'Web'
    }]
  };

  constructor(private http: HttpClient) { }


  nbaUrl = endpoints.SERVERURL + endpoints.NBA;
  // nbaTypeUrl = endpoints.BASEURL + endpoints.CASETYPES;

  pxResults: Object;

  // get a nba of given id
  getNba(id) {

    const nbaParams = new HttpParams();
    let nbaHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');

    nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
    nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');
    nbaHeaders = nbaHeaders.append('Access-Control-Expose-Headers', 'etag');

    return this.http.get(this.nbaUrl + '/' + id,
      { observe: 'response', params: nbaParams, headers: nbaHeaders });
  }

  // get a list of possible nba types to create
  // getNbaTypes() {
  //   const nbaParams = new HttpParams();
  //   let nbaHeaders = new HttpHeaders();
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');

  //   return this.http.get(this.nbaTypeUrl,
  //     { observe: 'response', params: nbaParams, headers: nbaHeaders});
  // }

  // get a nba that is "new"
  // getNbaCreationPage(id) {
  //   const nbaParams = new HttpParams();
  //   let nbaHeaders = new HttpHeaders();
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');

  //   return this.http.get(this.nbaTypeUrl + '/' + id,
  //     { observe: 'response', params: nbaParams, headers: nbaHeaders});


  // }

  // create a nba (with new or skip new)
  // createNba(id, content) {
  getCurrentNba(customerID, containerName) {
    const nbaParams = new HttpParams();

    const nbaBody: any = {};
    nbaBody.CustomerID = customerID;
    nbaBody.ContainerName = containerName;
    // nbaBody.content = content;
    const encodedUser = localStorage.getItem('encodedUser');

    let nbaHeaders = new HttpHeaders();
    nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
    nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');

    const getNbaUrl = this.nbaUrl + endpoints.NBACONTAINER;
    return this.http.post(getNbaUrl, nbaBody,
      { observe: 'response', params: nbaParams, headers: nbaHeaders });
  }

  // captureNBAResponse(outcome, behavior, interactionId) {
  captureNBAResponse(captureResponse) {
    const nbaParams = new HttpParams();
    // const nbaBody: any = this.NbaCaptureResponse;
    const nbaBody: any = captureResponse;

    // nbaBody.RankedResults[0].Outcome = outcome;
    // nbaBody.RankedResults[0].Behaviour = behavior;
    // nbaBody.RankedResults[0].InteractionID = interactionId;
    // nbaBody.ContainerName = containerName;
    // nbaBody.content = content;
    const encodedUser = localStorage.getItem('encodedUser');

    let nbaHeaders = new HttpHeaders();
    nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
    nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');
    const captureNbaUrl = this.nbaUrl + endpoints.NBACAPTURERESPONSE;

    return this.http.post(captureNbaUrl, nbaBody,
      { observe: 'response', params: nbaParams, headers: nbaHeaders });
  }
  // update a nba, save to server
  // updateNba(nbaID, eTag, actionName, body) {
  //   let nbaParams = new HttpParams();
  //   if (actionName && actionName !== '') {
  //     nbaParams = nbaParams.append('actionID', actionName);
  //   }
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   let nbaHeaders = new HttpHeaders();
  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');
  //   nbaHeaders = nbaHeaders.append('If-Match', '"' + eTag + '"');

  //   const oContent = this.refHelper.getPostContent(body);

  //   const encodedId = encodeURI(nbaID);

  //   return this.http.put(this.nbaUrl + '/' + encodedId,
  //    { 'content' : oContent },
  //    { observe: 'response', params: nbaParams, headers: nbaHeaders});
  // }

  // refresh a nba, post data, but no save
  // refreshNba(myNba, body) {
  //   const nbaParams = new HttpParams();
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   let nbaHeaders = new HttpHeaders();
  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');
  //   nbaHeaders = nbaHeaders.append('If-Match', myNba.etag);


  //   const oContent = this.refHelper.getPostContent(body);

  //   const encodedId = encodeURI(myNba.ID);

  //   return this.http.put(this.nbaUrl + '/' + encodedId + endpoints.REFRESH,
  //    { 'content' : oContent },
  //    { observe: 'response', params: nbaParams, headers: nbaHeaders});
  // }

  // get a nba with a given page (new, review, confirm)
  // getPage(nbaID, pageID) {

  //   const nbaParams = new HttpParams();
  //   let nbaHeaders = new HttpHeaders();
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');

  //   return this.http.get(this.nbaUrl + '/' + nbaID + endpoints.PAGES + '/' + pageID,
  //     { observe: 'response', params: nbaParams, headers: nbaHeaders});
  // }

  // // get a nba and a view layout
  // getView(nbaID, viewID) {

  //   const nbaParams = new HttpParams();
  //   let nbaHeaders = new HttpHeaders();
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');

  //   return this.http.get(this.nbaUrl + '/' + nbaID + endpoints.VIEWS + '/' + viewID,
  //     { observe: 'response', params: nbaParams, headers: nbaHeaders});
  // }


  // nbas() {
  //   const nbaParams = new HttpParams();
  //   let nbaHeaders = new HttpHeaders();
  //   const encodedUser = localStorage.getItem('encodedUser');

  //   nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   nbaHeaders = nbaHeaders.append('Content-Type', 'application/json');
  //   // nbaHeaders = nbaHeaders.append('Authorization', 'Basic ' + encodedUser);
  //   // nbaHeaders = nbaHeaders.append('Access-Control-Allow-Origin', '10.2.200.85');
  //   // nbaHeaders = nbaHeaders.append('Access-Control-Allow-Headers', '*');
  //   // nbaHeaders = nbaHeaders.append('Origin', '*');
  //   return this.http.get(this.nbaUrl,
  //     { observe: 'response', params: nbaParams, headers: nbaHeaders});
  // }


}
