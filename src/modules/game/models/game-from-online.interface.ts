export interface GameFromOnline {
    name: string;
    image: string;
    platforms: string[];
    region: string;
    times: {
        mainStory: number;
        mainExtras: number;
        completionist: number;
    };
    url: string;
    id: string;
    platformId: string;
    description: string;
    screenshots: string[];
    banner: string;
    releaseDate: string;
    genres: string[];
    themes: string[];
    developer: string;
    publisher: string;
}
