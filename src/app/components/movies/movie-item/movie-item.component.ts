import { ChangeDetectionStrategy, Component, OnInit, WritableSignal, inject, signal } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Subscribable, catchError, of } from 'rxjs';
import { Movie } from '../../../interfaces/movies/movies';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UiService } from '../../../services/ui.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { SnackbarComponent } from '../../snackbar/snackbar.component';

@Component({
  selector: 'app-movie-item',
  standalone: true,
  imports: [CommonModule, SnackbarComponent],
  templateUrl: './movie-item.component.html',
  styleUrl: './movie-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class MovieItemComponent implements OnInit {
  private movieService = inject(MoviesService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  public ui = inject(UiService)
  
  errorMsg: WritableSignal<string | null> = signal<string | null>(null);
  movie$?: Subscribable<Movie | null>;

  constructor() {
    if (this.route.snapshot.paramMap.get('id')) {
      this.movie$ = this.movieService.getMovieDetails(this.route.snapshot.paramMap.get('id')).pipe( 
        takeUntilDestroyed(),
        catchError(error => {
          this.errorMsg.set(error);
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
