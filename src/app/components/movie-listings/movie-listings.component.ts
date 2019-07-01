// Packages
import { Component, OnInit } from '@angular/core';

// Models
import { IMovie } from 'src/app/models/movie.model';

// Services
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie-listings',
  templateUrl: './movie-listings.component.html',
  styleUrls: ['./movie-listings.component.scss']
})
export class MovieListingsComponent implements OnInit {

  public movies: IMovie[] = [];

  constructor(
    private readonly moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.moviesService.getMovies(1, 'en-US').subscribe(
      result => {
        console.log(result);
      }
    );
  }

}
