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

    // Get genres
    this.getGenres();
  }

  ngOnDestroy(): void {
    // Unsubscribe subscriptions
    this.$unsubscribe.next();
    this.$unsubscribe.complete();
  }

  /**
   * @description Pushes router query params on filter
   * @memberof FilterComponent
   */
  public onFilter(): void {
    // Push filter config to router in order to save it for refresh etc.
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParams: {
        genre: this.currentGenre,
        minRate: this.minRate
      }
    });
  }

  /**
   * @description Gets filter config from router
   * @private
   * @memberof FilterComponent
   */
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

  /**
   * Gets genres from filter service
   * @private
   * @memberof FilterComponent
   */
  private getGenres(): void {
    this.filterService.genresSubject$
    .pipe(takeUntil(this.$unsubscribe))
    .subscribe(
      (result: IGenre[]): void => {
        this.genresList = result;
      }
    );
  }

}
