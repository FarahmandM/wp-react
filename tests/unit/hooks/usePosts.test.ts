import { renderHook, waitFor } from '@testing-library/react';
import { usePosts } from '@hooks/usePosts';
import { wrapper } from '../../testUtils';
import { WpRestClient } from '@api/WpRestClient';

// Mock the WpRestClient class
jest.mock('@api/WpRestClient', () => {
    return {
        WpRestClient: jest.fn().mockImplementation(() => ({
            client: { get: jest.fn() },
            get: jest.fn(),
        })),
    };
});

const mockedGet = jest.fn();

beforeEach(() => {
    (WpRestClient as jest.Mock).mockImplementation(() => ({
        client: { get: mockedGet },
        get: mockedGet,
    }));
});

afterEach(() => {
    jest.clearAllMocks();
});

test('fetches posts successfully', async () => {
    mockedGet.mockResolvedValue({
        data: [{ id: 1, title: { rendered: 'Test Post' } }],
        headers: { 'x-wp-totalpages': '1', 'x-wp-total': '1' }
    });

    const { result } = renderHook(() => usePosts(), { wrapper });

    await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
    });

    // usePosts returns a custom object with 'posts', not 'data'
    expect(result.current.posts).toEqual([
        { id: 1, title: { rendered: 'Test Post' } }
    ]);
});