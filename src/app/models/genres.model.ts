export interface IGenre {
    readonly id: number;
    readonly name: string;
}

export interface IGenreResult {
    genres: IGenre[];
}
