import { test, expect } from 'vitest';
import {render, screen} from '@testing-library/react';
import AccessCodeCard from './AccessCodeCard';

test('renders AccessCodeCard component', () => {
    render(<AccessCodeCard />);
    const element = screen.getByText(/Upload Your Photos to.../i);
    expect(element).toBeInTheDocument();
});
