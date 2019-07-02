// Packages
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { IMovie } from 'src/app/models/movie.model';
import { IFilter } from 'src/app/models/filter.model';

// Services
import { MoviesService } from 'src/app/services/movies.service';

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
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getMovies(this.page, this.language);
    this.getFilterConfigFromQueryParams();
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
        this.movies = this.moviesService.filterMovies(this.activatedRoute.snapshot.queryParams as IFilter);
      }
    );
  }

  private getFilterConfigFromQueryParams(): void {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      (filterConfig: IFilter): void => {
        this.movies = this.moviesService.filterMovies(filterConfig);
      }
    );
  }

}
