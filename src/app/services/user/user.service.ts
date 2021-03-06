/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInfo } from "./user.info";
import { UsernameInfo } from "./username.info";
import { UserInfoFull } from "./user.info.full";
import { CategoryInfo } from "../category/category.info";
import { ImportedUserInfo } from './imported.user.info';

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  private getUserUrl = "https://trinity-web-backend.azurewebsites.net/getUserInfo";
  private importUserUrl = "https://trinity-web-backend.azurewebsites.net/addNewImportedUser";

  constructor(private http: HttpClient) {}

  getUser(username: UsernameInfo): Observable<UserInfo> {
    console.log(username);
    return this.http.post<UserInfo>(this.getUserUrl, username, httpOptions);
  }

  getUsers() {
    return this.http.get<UserInfoFull[]>("https://trinity-web-backend.azurewebsites.net/getallusers");
  }

  getCompliantUsers() {
    return this.http.get<UserInfoFull[]>(
      "https://trinity-web-backend.azurewebsites.net/getcompliantusers"
    );
  }

  getNonCompliantUsers() {
    return this.http.get<UserInfoFull[]>(
      "https://trinity-web-backend.azurewebsites.net/getNonCompliantUsers"
    );
  }

  editUser(user: any): Observable<string> {
    return this.http.post<string>(
      "https://trinity-web-backend.azurewebsites.net/editUser",
      user,
      httpOptions
    );
  }

  getCategories() {
    return this.http.get<CategoryInfo[]>(
      "https://trinity-web-backend.azurewebsites.net/getAllCategories"
    );
  }

  importUser(importedUser: CategoryInfo): Observable<String> {
    return this.http.post<String>(
      this.importUserUrl,
      importedUser,
      httpOptions
    );
  }
}
