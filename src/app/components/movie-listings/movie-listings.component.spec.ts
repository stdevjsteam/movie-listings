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
});
