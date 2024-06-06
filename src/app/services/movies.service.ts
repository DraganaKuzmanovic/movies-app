import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Movie, MovieListItem, Root } from '../interfaces/movies/movies';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private http = inject(HttpClient);
  private BASE_URL = 'https://api.tvmaze.com/';
  
  constructor() { }

  getMovies(query: string): Observable<MovieListItem[]>{
    return this.http
      .get<Root[]>(`${this.BASE_URL}search/shows?q=${query}`)
      .pipe(
        map(response => response.map(item => item.show))
      );
  }

  getMovieDetails(id: string | null): Observable<Movie> {
    return this.http.get<Movie>(`${this.BASE_URL}shows/${id}`);
  }
}