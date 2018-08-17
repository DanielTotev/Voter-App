import  { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:1337/category';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    constructor(private http: HttpClient) { }

    create(categoryTitle: string) {
        return this.http.post(BASE_URL + '/create', {
            categoryTitle: categoryTitle
        });
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(BASE_URL + '/getAll');
    }
}