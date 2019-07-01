// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

// Services
import { BaseService } from './base.service';

// Enviroment
import { environment } from 'src/environments/environment';

// Models
import { IMovie } from '../models/movie.model';
import { IResultModel } from '../models/result.model';
import { IGenreResult } from '../models/genres.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BaseService<IMovie> {
  // TMDb api key
  private readonly apiKey = environment.apiKey;

  // Map for store genres with their id's and names
  public genresMap = new Map<number, string>();

  constructor(protected http: HttpClient) {
    super(http);
  }

  private getMovies(page: number, lang: string): Observable<IResultModel<IMovie>> {
    return this.getAll('movie/now_playing', {
      page: `${page}`,
      api_key: this.apiKey,
      language: lang
    });
  }

  private getGenres(lang: string): Observable<IGenreResult> {
    return this.getAll<IGenreResult>('genre/movie/list', {
      api_key: this.apiKey,
      language: lang
    }).pipe(tap((genres: IGenreResult): void => {
      for (const genre of genres.genres) {
        this.genresMap.set(genre.id, genre.name);
      }
    }));
  }

  public getMoviesAndGenres(page: number, lang: string): Observable<[IResultModel<IMovie>, IGenreResult]> {
    return forkJoin(this.getMovies(page, lang), this.getGenres(lang)).pipe(catchError(error => of(error)));
  }
}
