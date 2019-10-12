import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { userInfo } from "./user-info";
import { UserNameInfo } from "./username-info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class UserService {
  private getUserUrl = "http://localhost:8080/getuser";

  constructor(private http: HttpClient) {}

  getUser(username: UserNameInfo): Observable<userInfo> {
    console.log(username);
    return this.http.post<userInfo>(this.getUserUrl, username, httpOptions);
  }
  getUsers() {
    console.log("getting users test");
    return this.http.get<userInfo[]>("http://localhost:8080/getallusers");
  }
}
