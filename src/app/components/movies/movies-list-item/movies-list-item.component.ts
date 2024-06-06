import { Component, Input } from '@angular/core';
import { MovieListItem } from '../../../interfaces/movies/movies';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies-list-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movies-list-item.component.html',
  styleUrl: './movies-list-item.component.scss'
})
export class MoviesListItemComponent {
  
  @Input()
  item?: MovieListItem;
}
