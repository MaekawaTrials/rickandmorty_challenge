import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './features/home/home-page/home-page.component';
import { FavoritesPageComponent } from './features/favorites/favorites-page/favorites-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'favorites', component: FavoritesPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
