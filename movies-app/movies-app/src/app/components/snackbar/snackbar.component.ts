import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  @Input() message: string = '';
  isVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  show() {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }
}
