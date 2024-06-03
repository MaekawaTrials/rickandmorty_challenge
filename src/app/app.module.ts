import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { SharedModule } from './shared/shared.module';
import { StateModule } from './state/state.module';

import { StoreModule } from '@ngrx/store';
import { reducers } from './state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    FavoritesModule,
    SharedModule,
    StateModule,
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
