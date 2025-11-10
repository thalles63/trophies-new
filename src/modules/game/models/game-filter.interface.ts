export interface GameFilter {
    name: string;
    rating: number;
    platform: number;
    isPlatinumed: boolean;
    isCampaignComplete: boolean;
    status: number;
    genre: string;
    theme: string;
    releaseYear: number;
    page: number;
    sort: number;
    limit: number;
    total: number;
    pages: number;
    completionYear: number;
}
