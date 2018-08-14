import  { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PollModel } from './models/poll.model';
import { Observable } from '../../../node_modules/rxjs';
import { CreatePollModel } from './models/create-poll.model';

const BASE_URL : string = 'http://localhost:1337/poll';

const GET_ALL : string = '/getALL';
const VOTE : string = '/vote';
const GET_CATEGORIES : string = 'http://localhost:1337/category/getAll';
const CREATE_POLL = '/create';
const DELETE_POLL = '/delete/'; //should provide id
const EDIT_POLL = '/edit/';

@Injectable({
    providedIn: 'root'
})
export class PollService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<PollModel[]> {
        return this.http.get<PollModel[]>(BASE_URL + GET_ALL);
    }

    getById(id: string): Observable<PollModel> {
        return this.http.get<PollModel>(BASE_URL + '/' + id);
    }

    vote(selectedOption, pollid) {
        return this.http.post(BASE_URL + VOTE, { optionName: selectedOption, id: pollid})
    }

    getCategories(): Observable<string[]> {
        return this.http.get<string[]>(GET_CATEGORIES);
    }

    createPoll(userInput: CreatePollModel) {
        let options = userInput.options.split(',').map(x => ({ name: x, points: 0}));
        return this.http.post(BASE_URL + CREATE_POLL, {
            options: options,
            title: userInput.title,
            category: userInput.category
        });
    }

    delete(id) {
        return this.http.delete(BASE_URL + DELETE_POLL + id);
    }

    edit(id, userInput: CreatePollModel) {
        let options = userInput.options.split(',').map(x => ({ name: x, points: 0}));

        return this.http.post(BASE_URL + EDIT_POLL + id, {
            title: userInput.title,
            options: options,
            category: userInput.category
        });
    }
}