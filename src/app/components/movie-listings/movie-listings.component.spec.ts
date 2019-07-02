import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { MovieListingsComponent } from './movie-listings.component';

describe('MovieListingsComponent', () => {
  let component: MovieListingsComponent;
  let fixture: ComponentFixture<MovieListingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterModule.forRoot([])
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ genre: 12, minRate: 5})
          }
        }
      ],
      declarations: [ MovieListingsComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display \'Nothing was found\' placeholder', () => {
    component.movies = [{
      adult: false,
      backdrop_path: '/m67smI1IIMmYzCl9axvKNULVKLr.jpg',
      genre_ids: [12, 16, 35],
      genres: ['Comedy', 'Horror'],
      id: 301528,
      original_language: 'en',
      original_title: 'Toy Story 4',
      overview: 'Description',
      popularity: 359.221,
      poster_path: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
      release_date: '2019-06-19',
      title: 'Toy Story 4',
      video: false,
      vote_average: 7.7,
      vote_count: 695
    }];
    fixture.detectChanges();
    component.movies = [];
    fixture.detectChanges();
    const placeholder: HTMLParagraphElement = fixture.nativeElement.querySelector('.placeholder-text');
    expect(placeholder.textContent).toContain('Nothing was found');
  });
});
