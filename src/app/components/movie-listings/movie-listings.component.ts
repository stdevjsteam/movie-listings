// Packages
import { Component, OnInit } from '@angular/core';

// Models
import { IMovie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-listings',
  templateUrl: './movie-listings.component.html',
  styleUrls: ['./movie-listings.component.scss']
})
export class MovieListingsComponent implements OnInit {

  public movies: IMovie[] = [];

  constructor() { }

  ngOnInit(): void {
    this.movies.push({id: 1}, {id: 2}, {id: 3});
  }

}
