// Packages
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Models
import { IFilter } from 'src/app/models/filter.model';
import { IGenre } from 'src/app/models/genres.model';

// Services
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {

  // Min rate
  public minRate = 3;

  // Current genre
  public currentGenre: number = null;

  public genresList: IGenre[] = [];

  // Subject for unsubscribe subscriptions
  private $unsubscribe = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly filterService: FilterService
  ) { }

  ngOnInit(): void {
    // Get filter config from router query params
    this.getConfigFromRoute();

    this.getGenres();
  }

  ngOnDestroy(): void {
    // Unsubscribe subscriptions
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  public onFilter(): void {
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParams: {
        genre: this.currentGenre,
        minRate: this.minRate
      }
    });
  }

  private getConfigFromRoute(): void {
    this.activatedRoute.queryParams
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      (filterConfig: IFilter): void => {
        if (filterConfig.genre) {
          this.currentGenre = filterConfig.genre;
        }
        if (filterConfig.minRate) {
          this.minRate = filterConfig.minRate;
        }
      }
    );
  }

  private getGenres(): void {
    this.filterService.$genresSubject
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      (result: IGenre[]): void => {
        this.genresList = result;
      }
    );
  }

}
