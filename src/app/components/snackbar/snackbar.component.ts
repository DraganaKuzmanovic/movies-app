import { Component, Input, WritableSignal, signal } from '@angular/core';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  @Input() message?: string | null;
  displaySnack: WritableSignal<boolean> = signal<boolean>(false);


  constructor() {}

  ngOnInit(): void {
    this.show();
  }

  show() {
    this.displaySnack.set(true);
    setTimeout(() => {
      this.displaySnack.set(false);
    }, 3000);
  }
}
