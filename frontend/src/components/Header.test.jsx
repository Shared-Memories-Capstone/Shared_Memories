import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Header from './Header';

// Mock navigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows login link when user is not logged in', () => {
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  it('shows logout and username when user is logged in', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    render(<BrowserRouter><Header /></BrowserRouter>);
    expect(screen.getByText(/welcome, testuser/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('handles logout correctly', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    render(<BrowserRouter><Header /></BrowserRouter>);
    fireEvent.click(screen.getByText(/logout/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
}); 