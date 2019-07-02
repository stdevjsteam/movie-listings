import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { IGenre } from '../models/genres.model';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit data to genresSubject$ Subject', (done: DoneFn) => {
    service.genresSubject$.subscribe((genres: IGenre[]) => {
      expect(genres).toEqual([{id: 1, name: 'Action'}]);
      done();
    });
    service.callNextOnSubject([{id: 1, name: 'Action'}]);
  });

  it('should complete genresSubject$ Subject', () => {
    const spy = spyOn(service.genresSubject$, 'complete');
    service.callCompleteOnSubject();
    expect(spy).toHaveBeenCalled();
  });
});
