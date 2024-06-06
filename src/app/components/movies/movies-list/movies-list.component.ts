import { ChangeDetectionStrategy, Component, WritableSignal, inject, signal } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subscribable, catchError, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MovieListItem } from '../../../interfaces/movies/movies';
import { CommonModule } from '@angular/common';
import { MoviesListItemComponent } from '../movies-list-item/movies-list-item.component';
import { Router } from '@angular/router';
import { MovieItemComponent } from '../movie-item/movie-item.component';
import { UiService } from '../../../services/ui.service';
import { SnackbarComponent } from '../../snackbar/snackbar.component';


@Component({
  selector: 'app-movies-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,
    MoviesListItemComponent, MovieItemComponent, SnackbarComponent],
  templateUrl: './movies-list.component.html',
  styleUrl: './movies-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MoviesListComponent {
  private movieService = inject(MoviesService);
  private router = inject(Router);
  public ui = inject(UiService);

  errorMsg: WritableSignal<string | null> = signal<string | null>(null);
  movies$: Subscribable<MovieListItem[]>;

  searchControl: FormControl = new FormControl (null);
  
  constructor() {
    this.movies$ = this.searchControl.valueChanges
      .pipe(distinctUntilChanged(), debounceTime(400), takeUntilDestroyed(),
       switchMap((searchTerm:string) => this.movieService.getMovies(searchTerm)),
       catchError(error => {
        this.errorMsg.set(error);
        return of([]); 
      }));
  }


  displayDetails(id: number): void {
    this.router.navigate(['movies', id]);
  }
}