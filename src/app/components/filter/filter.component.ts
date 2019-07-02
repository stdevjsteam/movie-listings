// Packages
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    private readonly filterService: FilterService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  public onFilter(): void {
    this.filterService.$filterSubject.next({
      genre: this.genre,
      minRate: this.minRate
    });
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParams: {
        genre: this.genre,
        minRate: this.minRate
      }
    });
  }

}
