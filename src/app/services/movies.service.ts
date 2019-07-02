// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

// Services
import { BaseService } from './base.service';
import { FilterService } from './filter.service';

// Models
import { IMovie } from '../models/movie.model';
import { IResultModel } from '../models/result.model';
import { IGenreResult } from '../models/genres.model';
import { IFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BaseService<IMovie> {

  // Map for store genres with their id's and names
  public genresMap = new Map<number, string>();

  // store movies
  public moviesStore: IMovie[] = [];

  constructor(
    protected readonly http: HttpClient,
    private readonly filterService: FilterService
  ) {
    super(http);
  }

  /**
   * @description Gets movies from TMDb
   * @param {number} page
   * @param {string} lang
   * @returns {Observable<IMovie[]>}
   * @memberof MoviesService
   */
  public getMovies(page: number, lang: string): Observable<IMovie[]> {
    return this.getAll('movie/now_playing', {
      page: `${page}`,
      language: lang
    }).pipe(map((result: IResultModel<IMovie>) => {
      return this.moviesStore = this.genresMap.size ? this.setMoviesGenres(result.results) : result.results;
    }));
  }

  /**
   * @description Gets genres from TMDb
   * @param {string} lang
   * @returns {Observable<IGenreResult>}
   * @memberof MoviesService
   */
  public getGenres(lang: string): Observable<IGenreResult> {
    return this.getAll<IGenreResult>('genre/movie/list', {
      language: lang
    }).pipe(tap((result: IGenreResult): void => {
      this.filterService.callNextOnSubject(result.genres);
      this.filterService.callCompleteOnSubject();
      for (const genre of result.genres) {
        this.genresMap.set(genre.id, genre.name);
      }
      if (this.moviesStore.length) {
        this.setMoviesGenres(this.moviesStore);
      }
    }));
  }

  /**
   * @description Join 'getGenres' and 'getMovies' Observables
   * @param {number} page
   * @param {string} lang
   * @returns {Observable<[IGenreResult, IMovie[]]>}
   * @memberof MoviesService
   */
  public getMoviesAndGenres(page: number, lang: string): Observable<[IGenreResult, IMovie[]]> {
    return forkJoin(this.getGenres(lang), this.getMovies(page, lang)).pipe(catchError(error => of(error)));
  }

  /**
   * @description Filter Movies and order by popularity
   * @param {IFilter} filterConfig
   * @returns {IMovie[]}
   * @memberof MoviesService
   */
  public filterAndSortMovies(filterConfig: IFilter): IMovie[] {
    return this.moviesStore.filter((movie: IMovie): boolean => {
      return (filterConfig.minRate ? movie.vote_average >= filterConfig.minRate : true) &&
      (filterConfig.genre ? movie.genre_ids.includes(+filterConfig.genre) : true);
    }).sort((a: IMovie, b: IMovie) => b.popularity - a.popularity);
  }

  /**
   * @description Sets movie's genres
   * @private
   * @param {IMovie[]} movies
   * @returns {IMovie[]}
   * @memberof MoviesService
   */
  private setMoviesGenres(movies: IMovie[]): IMovie[] {
    return movies.map((movie: IMovie): IMovie => {
      movie.genres = [];
      movie.genre_ids.forEach(id => {
        movie.genres.push(this.genresMap.get(id));
      });
      return movie;
    });
  }
}
