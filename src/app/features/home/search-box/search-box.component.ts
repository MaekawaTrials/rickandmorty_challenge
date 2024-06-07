// search-box.component.ts
import { Component, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() search = new EventEmitter<string>();
  searchTerm$ = new Subject<string>();
  searchTerm: string = '';

  ngOnInit() {
    const savedTerm = localStorage.getItem('lastSearchTerm');
    if (savedTerm) {
      this.searchTerm = savedTerm;
      this.search.emit(this.searchTerm);
      this.searchTerm$.next(this.searchTerm);
    }
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const term = inputElement.value;
    localStorage.setItem('lastSearchTerm', term);
    this.search.emit(term);
    this.searchTerm$.next(term);
    setTimeout(() => {
      this.searchInput.nativeElement.select();
    }, 2000);
  }

  focusInput(): void {
    this.searchInput.nativeElement.focus();
  }
}
