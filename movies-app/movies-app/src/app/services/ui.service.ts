import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private _loading: WritableSignal<number> = signal<number>(0);

  constructor() { }

  public enableLoader(): void {
    requestAnimationFrame(() => {
      this._loading.set(this._loading() + 1);
    });
  }

  public disableLoader(): void {
    requestAnimationFrame(() => {
      this._loading.set(this._loading() - 1);
    });
  }

  public get loading(): boolean {
    return this._loading() > 0;
  }

  public get count() {
    return this._loading();
  }
}
