import { renderHook, waitFor } from '@testing-library/react';
import { usePost } from '@hooks/usePost';
import { wrapper } from '../../testUtils';
import { WpRestClient } from '@api/WpRestClient';

jest.mock('@api/WpRestClient', () => {
    const mockGet = jest.fn();
    const MockClass: any = jest.fn().mockImplementation(() => ({
        client: { get: mockGet },
        get: mockGet,
    }));
    MockClass.get = mockGet;
    return { WpRestClient: MockClass };
});

afterEach(() => {
    jest.clearAllMocks();
});

test('handles post fetch error', async () => {
    const mockedGet = (WpRestClient as any).get;
    mockedGet.mockRejectedValue(new Error('Network Error'));

    const { result } = renderHook(() => usePost(1), { wrapper });

    await waitFor(() => {
        expect(result.current.isError).toBe(true);
        expect(result.current.error).toEqual(new Error('Network Error'));
    });
});