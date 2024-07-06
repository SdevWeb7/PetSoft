
export type JobItem = {
    id: number;
    badgeLetters: string;
    title: string;
    company: string;
    daysAgo: number;
    date: string;
    relevanceScore: number;
};

export type JobItemDetails = JobItem & {
    description: string;
    qualifications: string[];
    reviews: string[];
    duration: string;
    location: string;
    salary: string;
    coverImgURL: string;
    companyUrl: string;
};

export type SortBy = 'relevant' | 'recent';

export type DirectionType = 'previous' | 'next';