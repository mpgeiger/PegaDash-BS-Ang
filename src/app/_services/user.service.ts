import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { endpoints } from './endpoints';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  authUrl = endpoints.BASEURL + endpoints.AUTH;


  constructor(private http: HttpClient) {


  }


  login(userName: string, password: string) {
    const encodedUser = btoa(userName + ':' + password);

    const authParams = new HttpParams();
    let authHeaders = new HttpHeaders();
    authHeaders = authHeaders.append('Authorization', 'Basic ' + encodedUser);
    // authHeaders = authHeaders.append('Access-Control-Allow-Origin',  'http://82fsserviceexcellence.pegatsdemo.com:4200');
    // authHeaders = authHeaders.append('Access-Control-Allow-Headers', '*');
    // authHeaders = authHeaders.append('Origin', '*');
    // authHeaders = authHeaders.append('Origin', 'http://bny.pegatsdemo.com:8080/');

    localStorage.setItem('userName', userName);
    localStorage.setItem('encodedUser', encodedUser);


    return this.http.get(this.authUrl + '/',
      { observe: 'response', params: authParams, headers: authHeaders});


  }



}
