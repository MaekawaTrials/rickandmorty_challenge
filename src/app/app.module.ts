import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './features/home/home.module';
import { FavoritesModule } from './features/favorites/favorites.module';
import { SharedModule } from './shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './state';
import { HttpClientModule } from '@angular/common/http';
import { SearchEffects } from './state/search.effects';
import { MatIconModule } from '@angular/material/icon';
import { SearchCacheService } from './state/search-cache.service';
import { FavoritesEffects } from './state/favorites.effects';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HomeModule,
    FavoritesModule,
    SharedModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([SearchEffects, FavoritesEffects]),
    HttpClientModule,
    MatIconModule
  ],
  providers: [SearchCacheService],
  bootstrap: [AppComponent]
})
export class AppModule {}
