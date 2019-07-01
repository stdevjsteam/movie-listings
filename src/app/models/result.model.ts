// Models
import { IMinMaxModel } from './min-max-dates.model';

export interface IResultModel<T> {
    readonly dates: IMinMaxModel;
    readonly page: number;
    readonly results: ReadonlyArray<T>;
    readonly total_pages: number;
    readonly total_results: number;
}
