// Packages
import { HttpClient } from '@angular/common/http';

// Enviroment
import { environment } from 'src/environments/environment';


export abstract class BaseService<T> {
    protected apiUrl = environment.apiUrl;

    protected constructor(protected http: HttpClient) {}
}
