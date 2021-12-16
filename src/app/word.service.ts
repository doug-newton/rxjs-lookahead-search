import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Entry } from './entry.model';

@Injectable({
  providedIn: 'root'
})
export class WordService {

  constructor(private http: HttpClient) { }
  noResult: Entry[] = []

  getWords(word: string): Observable<Entry[]> {
    return this.http.get<Entry[]>(`http://localhost:8080/api/searchByWord/${word}`).pipe(
      catchError(error=>{
        return of(this.noResult)
      })
    )
  }
}
