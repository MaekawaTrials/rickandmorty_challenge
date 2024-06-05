import { Component, ViewChild, ElementRef, Output, EventEmitter, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchBoxComponent {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const term = inputElement.value;
    this.search.emit(term);
    setTimeout(() => {
      this.searchInput.nativeElement.blur();
    }, 2000);
  }
}
