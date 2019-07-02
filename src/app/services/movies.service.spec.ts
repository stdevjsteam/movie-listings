import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MoviesService } from './movies.service';
import { IGenreResult } from '../models/genres.model';
import { environment } from 'src/environments/environment';
import { IResultModel } from '../models/result.model';
import { IMovie } from '../models/movie.model';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpTestingController: HttpTestingController;
  const apiUrl = environment.apiUrl;
  const apiKey = environment.apiKey;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(MoviesService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get genres', () => {
    const mockGenres: IGenreResult = {
      genres: [
        {
          id: 1,
          name: 'Action'
        },
        {
          id: 2,
          name: 'Animation'
        }
      ]
    };

    service.getGenres('en-US').subscribe(
      (result: IGenreResult): void => {
        expect(result).toEqual({
          genres: [
            {
              id: 1,
              name: 'Action'
            },
            {
              id: 2,
              name: 'Animation'
            }
          ]
        });
      }
    );
    const req = httpTestingController.expectOne(`${apiUrl}genre/movie/list?api_key=${apiKey}&language=en-US`);
    req.flush(mockGenres);
  });

  it('should get movies', () => {
    const mockMovies: IResultModel<IMovie> = {
      dates: {
        maximum: '2019-06-30',
        minimum: '2019-05-13'
      },
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/m67smI1IIMmYzCl9axvKNULVKLr.jpg',
          genre_ids: [12, 16, 35, 10751],
          id: 301528,
          original_language: 'en',
          original_title: 'Toy Story 4',
          overview: 'Overview',
          popularity: 313.97,
          poster_path: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
          release_date: '2019-06-19',
          title: 'Toy Story 4',
          video: false,
          vote_average: 7.7,
          vote_count: 751
        }
      ],
      total_pages: 50,
      total_results: 987
    };

    service.getMovies(1, 'en-US').subscribe(
      (result: IMovie[]): void => {
        expect(result).toEqual([
          {
            adult: false,
            backdrop_path: '/m67smI1IIMmYzCl9axvKNULVKLr.jpg',
            genre_ids: [12, 16, 35, 10751],
            id: 301528,
            original_language: 'en',
            original_title: 'Toy Story 4',
            overview: 'Overview',
            popularity: 313.97,
            poster_path: '/w9kR8qbmQ01HwnvK4alvnQ2ca0L.jpg',
            release_date: '2019-06-19',
            title: 'Toy Story 4',
            video: false,
            vote_average: 7.7,
            vote_count: 751
          }
        ]);
      }
    );

    const req = httpTestingController.expectOne(`${apiUrl}movie/now_playing?api_key=${apiKey}&page=1&language=en-US`);
    req.flush(mockMovies);
  });

  it('should get movies and genres', () => {
    service.getMoviesAndGenres(1, 'en-US').subscribe();

    const calls = httpTestingController.match((request: any) => {
      return request.url.match(apiUrl);
    });

    expect(calls.length).toEqual(2);
    expect(calls[0].request.url).toEqual(`${apiUrl}genre/movie/list`);
    expect(calls[1].request.url).toEqual(`${apiUrl}movie/now_playing`);
  });
});
