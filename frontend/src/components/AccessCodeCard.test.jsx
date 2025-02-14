import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import AccessCodeCard from './AccessCodeCard';

vi.mock('axios');
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate
  };
});

describe('AccessCodeCard', () => {
  it('renders the access code form', () => {
    render(<BrowserRouter><AccessCodeCard /></BrowserRouter>);
    expect(screen.getByText('Unlock the Memories')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('ABCDEF')).toBeInTheDocument();
  });

  it('handles successful code submission', async () => {
    axios.get.mockResolvedValueOnce({
      data: { status: 'success', event: { event_id: 123 } }
    });

    render(<BrowserRouter><AccessCodeCard /></BrowserRouter>);
    
    const input = screen.getByPlaceholderText('ABCDEF');
    fireEvent.change(input, { target: { value: 'ABC123' } });
    fireEvent.click(screen.getByText('Enter'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/event-page?event=123');
    });
  });

  it('displays error message on invalid code', async () => {
    axios.get.mockRejectedValueOnce(new Error('Invalid code'));

    render(<BrowserRouter><AccessCodeCard /></BrowserRouter>);
    
    const input = screen.getByPlaceholderText('ABCDEF');
    fireEvent.change(input, { target: { value: 'INVALID' } });
    fireEvent.click(screen.getByText('Enter'));

    await waitFor(() => {
      expect(screen.getByText('Invalid access code. Please try again.')).toBeInTheDocument();
    });
  });
});
