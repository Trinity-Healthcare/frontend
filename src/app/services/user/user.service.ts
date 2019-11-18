import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserInfo } from "./user.info";
import { UsernameInfo } from "./username.info";
import { UserInfoFull } from "./user.info.full";
import { CategoryInfo } from "../category/category.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  private getUserUrl = "http://localhost:8080/getUserInfo";

  constructor(private http: HttpClient) {}

  getUser(username: UsernameInfo): Observable<UserInfo> {
    console.log(username);
    return this.http.post<UserInfo>(this.getUserUrl, username, httpOptions);
  }

  getUsers() {
    console.log("getting users test");
    return this.http.get<UserInfoFull[]>("http://localhost:8080/getallusers");
  }

  getCompliantUsers() {
    return this.http.get<UserInfoFull[]>(
      "http://localhost:8080/getcompliantusers"
    );
  }

  getNonCompliantUsers() {
    return this.http.get<UserInfoFull[]>(
      "http://localhost:8080/getNonCompliantUsers"
    );
  }

  editUser(user: any): Observable<string> {
    return this.http.post<string>(
      "http://localhost:8080/editUser",
      user,
      httpOptions
    );
  }

  getCategories() {
    return this.http.get<CategoryInfo[]>(
      "http://localhost:8080/getAllCategories"
    );
  }
}