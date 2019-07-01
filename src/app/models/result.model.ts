// Models
import { IMinMaxModel } from './min-max-dates.model';

export interface IResultModel<T> {
  readonly dates: IMinMaxModel;
  readonly page: number;
  readonly results: T[];
  readonly total_pages: number;
  readonly total_results: number;
}
