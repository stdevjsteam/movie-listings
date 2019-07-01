// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

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

  // Map for store genres with their id's and names
  public genresMap = new Map<number, string>();

  public moviesStore: IMovie[] = [];

  constructor(protected http: HttpClient) {
    super(http);
  }

  private getMovies(page: number, lang: string): Observable<IMovie[]> {
    return this.getAll('movie/now_playing', {
      page: `${page}`,
      language: lang
    }).pipe(map((result: IResultModel<IMovie>) => {
      if (this.genresMap.size) {
        for (const movie of result.results) {
          movie.genres = [];
          movie.genre_ids.forEach(id => {
            movie.genres.push(this.genresMap.get(id));
          });
        }
        this.moviesStore = result.results;
      }
      return this.moviesStore;
    }));
  }

  private getGenres(lang: string): Observable<IGenreResult> {
    return this.getAll<IGenreResult>('genre/movie/list', {
      language: lang
    }).pipe(tap((result: IGenreResult): void => {
      for (const genre of result.genres) {
        this.genresMap.set(genre.id, genre.name);
      }
    }));
  }

  public getMoviesAndGenres(page: number, lang: string): Observable<[IGenreResult, IMovie[]]> {
    return forkJoin(this.getGenres(lang), this.getMovies(page, lang)).pipe(catchError(error => of(error)));
  }
}
