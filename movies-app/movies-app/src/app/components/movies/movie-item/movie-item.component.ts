import { Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Observable, Subscribable, catchError, of, shareReplay, tap } from 'rxjs';
import { Movie } from '../../../interfaces/movies/movies';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiService } from '../../../services/ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss'
})
export class MovieItemComponent implements OnInit {
  private movieService = inject(MoviesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public ui = inject(UiService)
  movie$?: Subscribable<Movie | null>;
  constructor() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.movie$ = this.movieService.getMovieDetails(this.route.snapshot.paramMap.get('id')).pipe( 
        takeUntilDestroyed(),
        catchError(error => {
          console.error('Error occurred:', error);
          return of(null); 
        }));
    }
  }

  ngOnInit(): void {
  }
  getBack(): void {
    this.router.navigate(['movies']);
  }

}
