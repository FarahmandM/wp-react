import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WpConfigProvider } from '@components/providers/WpConfigProvider';
import { WpAuthProvider } from '@components/providers/WpAuthProvider';

interface WrapperProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false, 
        },
    },
});

export const wrapper = ({ children }: WrapperProps) => (
    <WpConfigProvider
        config={{
            restUrl: 'https://test.wp.site/wp-json',
            authUrl: 'https://test.wp.site/wp-json/jwt-auth/v1/token'
        }}
    >
        <QueryClientProvider client={queryClient}>
            <WpAuthProvider>
                {children}
            </WpAuthProvider>
        </QueryClientProvider>
    </WpConfigProvider>
);