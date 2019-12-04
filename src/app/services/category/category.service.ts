/* 
 *  Copyright (C) 2019 Prime Inc - All Rights Reserved
 *  Unauthorized use of this file and its contents, via any medium is strictly prohibited.
 *  Authored by the Missouri State University Computer Science Department
 *  Fall 2019 CSC 450 - Group 2
 */

import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { CategoryInfo } from "./category.info";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  getCategoriesUrl = "https://trinityweb-dev.azurewebsites.net/getAllCategories";
  createCategoriesUrl = "https://trinityweb-dev.azurewebsites.net/createCategory";
  editCategoriesUrl = "https://trinityweb-dev.azurewebsites.net/editCategory";

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryInfo[]> {
    return this.http.get<CategoryInfo[]>(this.getCategoriesUrl, httpOptions);
  }

  createCategory(category: CategoryInfo): Observable<String> {
    return this.http.post<String>(
      this.createCategoriesUrl,
      category,
      httpOptions
    );
  }

  editCategory(category: CategoryInfo): Observable<String> {
    return this.http.post<String>(
      this.editCategoriesUrl,
      category,
      httpOptions
    );
  }

  resetQuarterTotals(): Observable<any> {
    return this.http.get(
      "https://trinityweb-dev.azurewebsites.net/clearUsersQuarter",
      httpOptions
    );
  }

  resetWeeklyTotals(): Observable<any> {
    return this.http.get("https://trinityweb-dev.azurewebsites.net/clearUsersWeekly", httpOptions);
  }
}
