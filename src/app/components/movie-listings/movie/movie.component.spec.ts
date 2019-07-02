import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';
import { IMovie } from 'src/app/models/movie.model';
import { environment } from 'src/environments/environment';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let data: IMovie;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;

    data = {
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
    };

    component.data = data;

    component['imageSize'] = 'w500';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image', () => {
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');
    expect(img.src).toEqual(component.data.poster_image);
  });

  it('should display movie rating', () => {
    const span: HTMLSpanElement = fixture.nativeElement.querySelector('.rating span');
    expect(span.textContent).toEqual(`${data.vote_average}`);
  });

  it('should display movie title', () => {
    const titleElement: HTMLAnchorElement = fixture.nativeElement.querySelector('.title');
    expect(titleElement.textContent).toEqual(data.title);
  });

  it('get image file path', () => {
    expect(component['getImagePath'].call(component, component.data.poster_path))
    .toEqual(`${environment.imageBaseUrl}${component['imageSize']}/${component.data.poster_path}`);
  });

  it('Display movie genres', () => {
    const genreParagraph: HTMLParagraphElement = fixture.nativeElement.querySelector('.genre');
    expect(genreParagraph.textContent).toEqual(data.genres.join(', '));
  });
});
