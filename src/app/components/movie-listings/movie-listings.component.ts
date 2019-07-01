// Packages
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { IMovie } from 'src/app/models/movie.model';

// Services
import { MoviesService } from 'src/app/services/movies.service';
import { FilterService } from 'src/app/services/filter.service';
import { IFilter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-movie-listings',
  templateUrl: './movie-listings.component.html'
})
export class MovieListingsComponent implements OnInit, OnDestroy {

  // Subject for unsubscribe subscriptions
  private $unsubscribe = new Subject<void>();

  // Movies list
  public movies: IMovie[] = [];

  // Language
  private language = 'en-US';

  // Current page
  public page = 1;

  constructor(
    private readonly moviesService: MoviesService,
    private readonly filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.getMovies(this.page, this.language);

    this.filterService.$filterSubject
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      (filterConfig: IFilter) => {
        this.movies = this.filterMovies(filterConfig);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe subscriptions
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  /**
   * @description Gets Movies and sets genres
   * @private
   * @param {number} page
   * @param {string} language
   * @memberof MovieListingsComponent
   */
  private getMovies(page: number, language: string): void {
    this.moviesService.getMoviesAndGenres(page, language)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      ([genres, movies]): void => {
        this.movies = movies;
      }
    );
  }

  private filterMovies(filterConfig: IFilter): IMovie[] {
    return this.moviesService.moviesStore.filter((movie: IMovie) => {
      return movie.vote_average >= filterConfig.minRate && 
      (filterConfig.genre ? movie.genre_ids.includes(filterConfig.genre) : true);
    });
  }

}
