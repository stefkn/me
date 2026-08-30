export type SiteConfig = {
    title: string;
    subtitle?: string;
    description: string;
    pageType: string;
    image?: {src: string; alt: string};
    postsPerPage?: number;
    projectsPerPage?: number;
    domain: string;
};

const domain = 'https://stefkn.github.io/me/';

const siteConfig: SiteConfig = {
    title: domain,
    subtitle: 'software, hardware, wetware',
    description: 'stefan nowak, software engineer based in London, UK',
    pageType: 'website',
    image: {
        src: '/favicon.png',
        alt: `${domain} logo`
    },
    domain,
};

export default siteConfig;
