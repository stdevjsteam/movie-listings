// Packages
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Models
import { IGenre } from '../models/genres.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public genresSubject$ = new Subject<IGenre[]>();

  public callNextOnSubject(genres: IGenre[]): void {
    this.genresSubject$.next(genres);
  }

  public callCompleteOnSubject(): void {
    this.genresSubject$.complete();
  }

}
