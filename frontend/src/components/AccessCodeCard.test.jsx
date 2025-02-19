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

const CODE_PLACEHOLDER = 'Enter your 6-digit code';

describe('AccessCodeCard', () => {
  it('renders the access code form', () => {
    render(<BrowserRouter><AccessCodeCard /></BrowserRouter>);
    expect(screen.getByText(/Unlock the Memories/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(CODE_PLACEHOLDER)).toBeInTheDocument();
  });

  it('handles successful code submission', async () => {
    axios.get.mockResolvedValueOnce({
      data: { status: 'success', event: { event_id: 123 } }
    });

    render(<BrowserRouter><AccessCodeCard /></BrowserRouter>);

    const input = screen.getByPlaceholderText(CODE_PLACEHOLDER);
    fireEvent.change(input, { target: { value: 'ABC123' } });
    fireEvent.click(screen.getByText('Join Event'));

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/event-page?event=123');
    });
  });

  it('displays error message on invalid code', async () => {

    render(<BrowserRouter><AccessCodeCard /></BrowserRouter>);

    const input = screen.getByPlaceholderText(CODE_PLACEHOLDER);
    fireEvent.change(input, { target: { value: '111111' } });
    fireEvent.click(screen.getByText('Join Event'));

    await waitFor(() => {
      expect(screen.getByText('Invalid access code. Please try again.')).toBeInTheDocument();
    });
  });
});
