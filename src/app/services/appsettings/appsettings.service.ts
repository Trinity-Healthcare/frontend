import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { AppSettingsInfo } from "./appsettings.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class AppSettingsService {
  getAppSettingsUrl = "http://localhost:8080/getAppSettings";
  editAppSettingsUrl = "http://localhost:8080/editAppSettings";

  constructor(private http: HttpClient) {}

  getAppSettings(): Observable<AppSettingsInfo[]> {
    return this.http.post<AppSettingsInfo[]>(this.getAppSettingsUrl, httpOptions);
  }

  editAppSetting(setting: AppSettingsInfo): Observable<AppSettingsInfo> {
    return this.http.post<AppSettingsInfo>(this.editAppSettingsUrl, setting, httpOptions);
  }
}
