// ./types/hooks.d.ts
import { WpPost, WpUser, WpCategory, WpMedia } from '.';

export interface UseAuthResult {
    user: WpUser | null;
    login: (credentials: { username: string; password: string }) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<string | null>;
    error?: string;
    isAuthenticated: boolean;
}

export interface UsePostsResult {
    posts: WpPost[];
    totalPages?: number;
    totalItems?: number;
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export interface UseCategoriesResult {
    categories: WpCategory[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}

export interface UseMediaResult {
    media: WpMedia[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => void;
}