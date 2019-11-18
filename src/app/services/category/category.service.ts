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

  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<CategoryInfo[]> {
    return this.http.get<CategoryInfo[]>(this.getCategoriesUrl, httpOptions);
  }
  createCategory(category: CategoryInfo): Observable<String> {
    return this.http.post<String>(
      "http://localhost:8080/createCategory",
      category,
      httpOptions
    );
  }

  editCategory(category: CategoryInfo): Observable<String> {
    return this.http.post<String>(
      "http://localhost:8080/editCategory",
      category,
      httpOptions
    );
  }
}
