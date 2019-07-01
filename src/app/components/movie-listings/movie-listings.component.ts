// Packages
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { IMovie } from 'src/app/models/movie.model';
import { IResultModel } from 'src/app/models/result.model';

// Services
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-listings',
  templateUrl: './movie-listings.component.html',
  styleUrls: ['./movie-listings.component.scss']
})
export class MovieListingsComponent implements OnInit, OnDestroy {

  private $unsubscribe = new Subject<void>();
  public movies: IMovie[] = [];
  private language = 'en-US';
  public page = 1;

  constructor(
    private readonly moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.getMovies(this.page, this.language);
  }

  ngOnDestroy(): void {
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  private getMovies(page: number, language: string): void {
    this.moviesService.getMoviesAndGenres(page, language)
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      ([movies, genres]): void => {
        for (const movie of movies.results) {
          movie.genres = [];
          movie.genre_ids.forEach(id => {
            movie.genres.push(this.moviesService.genresMap.get(id));
          });
        }
        this.movies = movies.results;
      }
    );
  }

}
