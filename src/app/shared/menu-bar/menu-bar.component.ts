import { Component} from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectFavoritesCount } from 'src/app/state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
  counter$: Observable<number>;
  
  constructor(private store: Store<AppState>, private router: Router) {
    this.counter$ = this.store.pipe(select(selectFavoritesCount));
    //this.counter$.subscribe(count => {
    //  console.log('Favorites Count in MenuBar:', count);
    //});
  }

  isActive(url: string): boolean { return this.router.url === url; }
}
