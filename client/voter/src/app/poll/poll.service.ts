import  { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PollModel } from './models/poll.model';
import { Observable } from '../../../node_modules/rxjs';

const BASE_URL = 'http://localhost:1337/poll';

const GET_ALL = '/getALL';

@Injectable({
    providedIn: 'root'
})
export class PollService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PollModel[]> {
        return this.http.get<PollModel[]>(BASE_URL + GET_ALL);
    }
}