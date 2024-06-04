import { Routes } from '@angular/router';
import { MovieItemComponent } from './components/movies/movie-item/movie-item.component';
import { MoviesListComponent } from './components/movies/movies-list/movies-list.component';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () =>
      import('./components/movies/movies-list/movies-list.component').then(
        (c) => c.MoviesListComponent
      )
  },
  {
    path: 'movies/:id',
    loadComponent: () =>
      import('./components/movies/movie-item/movie-item.component').then(
        (c) => c.MovieItemComponent
      ),
  },
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: '**', component: MoviesListComponent },
];
