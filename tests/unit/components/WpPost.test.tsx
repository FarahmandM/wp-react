import { render, screen } from '@testing-library/react';
import { WpPost } from '@components/WpPost';
import { wrapper } from '../../testUtils';

const mockPost = {
    id: 1,
    title: { rendered: 'Test Post' },
    content: { rendered: '<p>Test content</p>' }
} as any;

test('renders post title and content', () => {
    render(<WpPost post={mockPost} />, { wrapper });

    expect(screen.getByText('Test Post')).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
});