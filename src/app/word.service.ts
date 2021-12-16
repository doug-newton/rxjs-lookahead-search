import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }

  getWords(word: string): Observable<[{word:string, definition:string}]> {
    return this.http.get<[{word:string, definition:string}]>(`http://localhost:8080/api/searchByWord/${word}`);
  }
}
