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
  getCategoriesUrl = "http://localhost:8080/getAllCategories";
  createCategoriesUrl = "http://localhost:8080/createCategory";
  editCategoriesUrl = "http://localhost:8080/editCategory";

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
      "http://localhost:8080/clearUsersQuarter",
      httpOptions
    );
  }

  resetWeeklyTotals(): Observable<any> {
    return this.http.get("http://localhost:8080/clearUsersWeekly", httpOptions);
  }
}
