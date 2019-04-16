import { Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable';
import { endpoints } from './endpoints';


@Injectable({
  providedIn: 'root'
})
export class DatapageService {

  constructor(private http: HttpClient) { }


  dataPageUrl = endpoints.BASEURL + endpoints.DATA;

  pxResults: Object;

  getDataPage(id, dpParams) {

    let dataHeaders = new HttpHeaders();
    const encodedUser = localStorage.getItem('encodedUser');
    // let results;

    dataHeaders = dataHeaders.append('Authorization', 'Basic ' + encodedUser);
    dataHeaders = dataHeaders.append('Content-Type', 'application/json');
    // dataHeaders = dataHeaders.append('Origin', 'http://end2endcrmcommercialbankingnew.pegatsdemo.com:8080/');

    // dataHeaders = dataHeaders.append('Access-Control-Allow-Origin', 'http://localhost:4200');

    // results = this.http.get(this.dataPageUrl + "/" + id, { observe: 'response', params: dpParams, headers: dataHeaders});

    //  results.json().then((data) => { console.log(data) });
    // console.log('QQQ',JSON.stringify(results));
    this.pxResults = this.http.get(this.dataPageUrl + '/' + id,
      { observe: 'response', params: dpParams, headers: dataHeaders });
    console.log('QQQ', JSON.stringify(this.pxResults));

    // this.pxResults = this.http
    //   .get(this.dataPageUrl + '/' + id, { observe: 'response', params: dpParams, headers: dataHeaders })
    //  .do(console.log(' in RESULTS-->' + data))
    //  .map(data => _.values(data));



    return this.http.get(this.dataPageUrl + '/' + id,
      { observe: 'response', params: dpParams, headers: dataHeaders })
      // .subscribe((res) => {
      //   let resSTR = JSON.stringify(res);
      //   let resJSON = JSON.parse(resSTR);
      //   console.log('DATAPAGE SERVICE-->',resJSON._body);
      // })
      ;

    // return this.pxResults;
  }

  getResults(response) {
    console.log('QQQ', response);
    return response.pxResults;
  }
}
