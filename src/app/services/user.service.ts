import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { userInfo } from "./user-info";
import { UserNameInfo } from "./username-info";
import { FullUser } from "./full-user";
import { Category } from "./category/category";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  private getUserUrl = "http://localhost:8080/getUserInfo";

  constructor(private http: HttpClient) {}

  getUser(username: UserNameInfo): Observable<userInfo> {
    console.log(username);
    return this.http.post<userInfo>(this.getUserUrl, username, httpOptions);
  }

  getUsers() {
    console.log("getting users test");
    return this.http.get<FullUser[]>("http://localhost:8080/getallusers");
  }

  getCompliantUsers() {
    return this.http.get<FullUser[]>("http://localhost:8080/getcompliantusers");
  }

  editUser(user: any): Observable<String> {
    return this.http.post<String>(
      "http://localhost:8080/editUser",
      user,
      httpOptions
    );
  }

  getCategories() {
    return this.http.get<Category[]>("http://localhost:8080/getAllCategories");
  }
}
