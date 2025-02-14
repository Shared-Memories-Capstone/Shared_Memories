import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import EventPage from './EventPage';

vi.mock('axios');
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams({ event: '1' })]
  };
});

describe('EventPage', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  const mockEvent = {
    event_title: 'Test Event',
    event_date: '2024-03-20',
    event_description: 'Test Description'
  };

  const mockPhotos = [
    {
      photo_id: 1,
      image_url: 'http://test.com/1.jpg',
      original_file_name: 'test1.jpg'
    }
  ];

  it('shows loading state initially', async () => {
    // Mock API calls to return pending promises
    axios.get.mockImplementation(() => new Promise(() => {}));
    
    render(<BrowserRouter><EventPage /></BrowserRouter>);
    await waitFor(() => {
      expect(screen.getByText(/loading event/i)).toBeInTheDocument();
    });
  });

  it('displays event details and photos when loaded', async () => {
    axios.get.mockImplementation((url) => {
      if (url.includes('events/1')) {
        return Promise.resolve({ data: mockEvent });
      }
      if (url.includes('photos')) {
        return Promise.resolve({ data: mockPhotos });
      }
      return Promise.reject(new Error('Not found'));
    });

    render(<BrowserRouter><EventPage /></BrowserRouter>);

    await waitFor(() => {
      expect(screen.getByText(`Welcome to ${mockEvent.event_title}`)).toBeInTheDocument();
      expect(screen.getByText(mockEvent.event_description)).toBeInTheDocument();
      expect(screen.getByAltText(mockPhotos[0].original_file_name)).toBeInTheDocument();
    });
  });

  it('handles error state', async () => {
    axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));
    
    render(<BrowserRouter><EventPage /></BrowserRouter>);
    
    await waitFor(() => {
      expect(screen.getByText(/unable to load event content/i)).toBeInTheDocument();
    });
  });
});
