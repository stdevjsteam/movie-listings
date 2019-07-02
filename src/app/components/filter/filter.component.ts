// Packages
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

// Models
import { IFilter } from 'src/app/models/filter.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit, OnDestroy {

  public minRate = 3;
  public genre: number = null;
  private subscription: Subscription;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getConfigFromRoute();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public onFilter(): void {
    this.router.navigate([''], {
      relativeTo: this.activatedRoute,
      queryParams: {
        genre: this.genre,
        minRate: this.minRate
      }
    });
  }

  private getConfigFromRoute(): void {
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (filterConfig: IFilter): void => {
        if (filterConfig.genre) {
          this.genre = filterConfig.genre;
        }
        if (filterConfig.minRate) {
          this.minRate = filterConfig.minRate;
        }
      }
    );
  }

}
