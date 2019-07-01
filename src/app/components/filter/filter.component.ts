// Packages
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html'
})
export class FilterComponent implements OnInit {

  public minRate = 3;

  constructor() { }

  ngOnInit() {
  }

  public onRateFilter($event: any): void {
    console.log($event.target.value);
  }

}
