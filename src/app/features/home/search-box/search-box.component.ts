import { Component, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() search = new EventEmitter<string>();
  searchTerm: string = '';

  ngOnInit() {
    const savedTerm = localStorage.getItem('lastSearchTerm');
    if (savedTerm) {
      this.searchTerm = savedTerm;
      this.search.emit(this.searchTerm);
    }
  }

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const term = inputElement.value;
    localStorage.setItem('lastSearchTerm', term);
    this.search.emit(term);
    setTimeout(() => {
      this.searchInput.nativeElement.select();
    }, 2000);
  }
}

