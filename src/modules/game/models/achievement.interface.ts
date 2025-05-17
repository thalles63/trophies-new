export interface Achievement {
    id: string;
    platformId: string;
    name: string;
    description: string;
    type: string;
    image: string;
    isAchieved: boolean;
    dateAchieved: Date;
    percentageAchieved: number;
}
