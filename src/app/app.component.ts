import { Component, } from '@angular/core';
import { debounceTime, Observable, Subject, switchMap } from 'rxjs';
import { WordService } from './word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private wordService: WordService){
  }

  query$: Subject<string> = new Subject<string>()

  results$: Observable<[{word:string,definition:string}]> = this.query$.pipe(
    debounceTime(200),
    switchMap(query => {
      return this.wordService.getWords(query)
    })
  )

}
