/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

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
  getAppSettingsUrl = "https://trinityweb-dev.azurewebsites.net/getAppSettings";
  editAppSettingsUrl = "https://trinityweb-dev.azurewebsites.net/editAppSettings";

  constructor(private http: HttpClient) {}

  getAppSettings(): Observable<AppSettingsInfo[]> {
    return this.http.post<AppSettingsInfo[]>(this.getAppSettingsUrl, httpOptions);
  }

  editAppSetting(setting: AppSettingsInfo): Observable<AppSettingsInfo> {
    return this.http.post<AppSettingsInfo>(this.editAppSettingsUrl, setting, httpOptions);
  }
}
