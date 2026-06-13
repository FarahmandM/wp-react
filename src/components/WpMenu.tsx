import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { WpRestClient } from '@api/WpRestClient';
import { useWpConfig } from '@components/providers/WpConfigProvider';
//import { WpMenuProps } from '@models/components/WpMenu';
import type { WpMenuProps, Menu } from '@components/WpMenu.types';



export const WpMenu = ({ location, className }: WpMenuProps) => {
    const { restUrl } = useWpConfig();
    const client = useMemo(() => new WpRestClient({ baseURL: restUrl }), [restUrl]);

    const { data: menu, error, isLoading } = useQuery<Menu>({
        queryKey: ['wp-menu', location],
        queryFn: async () => {
            //const response = await WpRestClient.get(`/menus/v1/locations/${location}`);
            //const response = await client.get(`/menus/v1/locations/${location}`) as { data: Menu };
            const response = await client.get<Menu>(`/menus/v1/locations/${location}`);
            
            return response;
        },
        enabled: !!restUrl
    });
    
    if (isLoading) return <div>Loading menu...</div>;
    
    if (error) return <div>Menu loading error</div>;

    return (
        <nav className={className}>
            {menu?.items?.map((item: any) => (
                <a key={item.ID} href={item.url}>{item.title}</a>
            ))}
        </nav>
    );
};