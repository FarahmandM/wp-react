import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@hooks/useAuth';
import { wrapper } from '../testUtils';
import { WpRestClient } from '@api/WpRestClient';

jest.mock('@api/WpRestClient', () => {
    const mockPost = jest.fn();
    const MockClass: any = jest.fn().mockImplementation(() => ({
        client: { post: mockPost },
        post: mockPost,
    }));
    MockClass.post = mockPost;
    return { WpRestClient: MockClass };
});

afterEach(() => {
    jest.clearAllMocks();
});

test('login sets user data', async () => {
    const mockedPost = (WpRestClient as any).post;
    mockedPost.mockResolvedValue({
        token: 'test-token',
        user_display_name: 'Test User',
        user_nicename: 'test',
        user_email: 'test@example.com',
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
        await result.current.login({
            username: 'test',
            password: 'password'
        });
    });

    expect(result.current.user).toEqual({
        id: 0,
        name: 'Test User',
        username: 'test',
        email: 'test@example.com',
        token: 'test-token',
    });
});