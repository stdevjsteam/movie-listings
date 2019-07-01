// Packages
import { Component, OnInit, Input } from '@angular/core';

// Models
import { IMovie } from 'src/app/models/movie.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {

  private imageSize = 'w500';

  // Movie data
  @Input() data: IMovie;

  ngOnInit() {
    this.data.poster_image = `${environment.imageBaseUrl}${this.imageSize}/${this.data.poster_path}`;
  }

}
