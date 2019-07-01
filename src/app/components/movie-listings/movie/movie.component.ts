// Packages
import { Component, OnInit, Input } from '@angular/core';

// Models
import { IMovie } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {

  @Input() data: IMovie;

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
