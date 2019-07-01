// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { BaseService } from './base.service';

// Enviroment
import { environment } from 'src/environments/environment';

// Models
import { IMovie } from '../models/movie.model';
import { IResultModel } from '../models/result.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BaseService<IMovie> {
  private readonly apiKey = environment.apiKey;

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getMovies(page: number, lang: string): Observable<IResultModel<IMovie>> {
    return this.http.get<IResultModel<IMovie>>(`${this.apiUrl}movie/now_playing`, {
      params: {
        page: `${page}`,
        api_key: this.apiKey,
        language: lang
      }
    });
  }
}
