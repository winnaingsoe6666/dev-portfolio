import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('theme-day');
  currentTheme$ = this.currentThemeSubject.asObservable();

  setTheme(theme: string) {
    this.currentThemeSubject.next(theme);
  }
  
  get currentTheme() {
    return this.currentThemeSubject.value;
  }
}
