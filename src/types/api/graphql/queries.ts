export interface WpGraphQLPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    slug: string;
}

export interface WpGraphQLQueryPosts {
    posts: {
        nodes: WpGraphQLPost[];
    };
}
