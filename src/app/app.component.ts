import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { WordService } from './word.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private wordService: WordService){
  }

  sub?: Subscription

  results: {word:string, definition:string}[] = []

  search(query: string) {
    this.sub = this.wordService.getWords(query).subscribe((w)=>{
      this.results = w
      this.sub!.unsubscribe()
    })
  }

}
