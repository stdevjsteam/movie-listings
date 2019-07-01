// Packages
import { Component, OnInit } from '@angular/core';

// Services
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  public minRate = 3;
  public genre: number = null;

  constructor(
    private readonly filterService: FilterService
  ) { }

  ngOnInit() {
  }

  public onFilter(): void {
    this.filterService.$filterSubject.next({
      genre: this.genre,
      minRate: this.minRate
    });
  }

}
