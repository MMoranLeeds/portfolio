export interface IProjects {
    reference: string;
    title: string;
    introduction: string;
    images: Array<string>
    hasExternalLink: boolean;
    externalLink: string;
    isFeaturedProject: boolean;
    isHeaderProject: boolean;
}