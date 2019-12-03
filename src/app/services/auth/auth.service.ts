/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { JwtResponse } from "./jwt-response";
import { AuthLoginInfo } from "./login-info";
import { SignUpInfo } from "./signup-info";
import { JwtHelperService } from "@auth0/angular-jwt";

import { TokenStorageService } from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private loginUrl = "https://trinityweb-dev.azurewebsites.net/api/auth/signin";
  private signupUrl = "https://trinityweb-dev.azurewebsites.net/api/auth/signup";

  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private tokenStorage: TokenStorageService
  ) {}

  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  signUp(info: SignUpInfo): Observable<string> {
    console.log(info);
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }
}
