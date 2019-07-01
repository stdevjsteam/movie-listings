// Packages
import { Component, OnInit, Input } from '@angular/core';

// Models
import { IMovie } from 'src/app/models/movie.model';

// Enviroment
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html'
})
export class MovieComponent implements OnInit {

  // image size
  private imageSize = 'w500';

  // Movie data
  @Input() data: IMovie;

  ngOnInit(): void {
    // Set poster image full path
    this.data.poster_image = this.getImagePath(this.data.poster_path);
  }

  /**
   * @description Gets movie poster image full path by given path
   * @private
   * @param {string} poster_path
   * @returns {string}
   * @memberof MovieComponent
   */
  private getImagePath(poster_path: string): string {
    return `${environment.imageBaseUrl}${this.imageSize}/${poster_path}`;
  }

}
