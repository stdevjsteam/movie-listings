// Packages
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Enviroment
import { environment } from 'src/environments/environment';
import { IResultModel } from '../models/result.model';

export abstract class BaseService<T> {
  // TMDb API url
  protected apiUrl = environment.apiUrl;

  protected constructor(protected http: HttpClient) { }

  protected getAll<Type>(endpoint: string, params: { [param: string]: string | string[] }): Observable<IResultModel<T> | Type> {
    return this.http.get<IResultModel<T> | Type>(`${this.apiUrl}${endpoint}`, {
      params
    });
  }
}
