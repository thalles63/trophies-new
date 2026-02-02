export interface Achievement {
    id: string;
    platformId: string;
    name: string;
    description: string;
    description_ptbr: string;
    type: string;
    image: string;
    isAchieved: boolean;
    dateAchieved: string;
    dateAchievedConverted?: string;
    percentageAchieved: number;
    index: string;
    action?: number;
}
