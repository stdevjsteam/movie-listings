// Packages
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { BaseService } from './base.service';

// Enviroment
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MoviesService extends BaseService {
  private readonly apiKey = environment.apiKey;

  constructor(protected http: HttpClient) {
    super(http);
  }

  public getMovies(page: number, lang: string): Observable<any> {
    return this.http.get(`${this.apiUrl}movie/now_playing`, {
      params: {
        page: `${page}`,
        api_key: this.apiKey,
        language: lang
      }
    });
  }
}
