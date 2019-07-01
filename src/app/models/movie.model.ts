export interface IMovie {
    readonly id: 301528;
    readonly adult: boolean;
    readonly backdrop_path: '/m67smI1IIMmYzCl9axvKNULVKLr.jpg'
    readonly genre_ids: [12, 16, 35, 10751];
    readonly original_language: 'en' // make enum
    readonly original_title: string;
    readonly overview: string;
    readonly popularity: number;
    readonly poster_path: string;
    readonly release_date: string;
    readonly title: string;
    readonly video: boolean;
    readonly vote_average: number;
    readonly vote_count: number;
    genres?: string[];
}
