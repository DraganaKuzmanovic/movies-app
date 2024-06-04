import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscribable, catchError, debounceTime, distinctUntilChanged, of, shareReplay, switchMap, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieListItem } from '../../../interfaces/movies/movies';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from '../movies-list-item/movies-list-item.component';
import { Router } from '@angular/router';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { UiService } from '../../../services/ui.service';


@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MoviesListItemComponent, MovieItemComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesListComponent implements OnInit {
  private movieService = inject(MoviesService);
  private router = inject(Router);
  public ui = inject(UiService);


  movies$: Subscribable<MovieListItem[]>;


  constructor() {
    this.movies$ = this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntilDestroyed(),
       switchMap((searchTerm:string) => this.movieService.getMovies(searchTerm)),
       catchError(error => {
        console.error('Error occurred:', error);
        return of([]); 
      }));
  }

  searchControl: FormControl = new FormControl (null);

  ngOnInit(): void {
  }

  displayDetails(id: number): void {
    this.router.navigate(['movies', id]);
  }
}