import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;
  let img: HTMLImageElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    img = fixture.nativeElement.querySelector('img');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display image detectChanges()', () => {
    fixture.detectChanges();
    expect(img.src).toEqual(component.data.poster_image);
  });
});
