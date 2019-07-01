export interface IMovie {
  readonly id: number;
  readonly adult: boolean;
  readonly backdrop_path: string;
  readonly genre_ids: number[];
  readonly original_language: string; // make enum
  readonly original_title: string;
  readonly overview: string;
  readonly popularity: number;
  readonly poster_path: string;
  poster_image?: string;
  readonly release_date: string;
  readonly title: string;
  readonly video: boolean;
  readonly vote_average: number;
  readonly vote_count: number;
  genres?: string[];
}
