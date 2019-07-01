// Packages
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// Models
import { IFilter } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public $filterSubject = new BehaviorSubject<IFilter>({
    genre: null,
    minRate: 3
  });
}
