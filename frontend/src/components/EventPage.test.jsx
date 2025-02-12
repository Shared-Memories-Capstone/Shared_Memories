import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import EventPage from './EventPage';
import { MemoryRouter } from 'react-router-dom';

// mock axios
vi.mock('axios');

// Mock useSearchParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useSearchParams: () => [
      new URLSearchParams({ event: '1' }),
      vi.fn()
    ]
  };
});

describe('EventPage', () => {
  const mockPhotos = [
    {
      photo_id: 1,
      original_file_name: 'test1.jpg',
      image_url: 'http://localhost:8000/media/photos/test1.jpg',
      upload_timestamp: '2024-03-20T10:00:00Z'
    },
    {
      photo_id: 2,
      original_file_name: 'test2.jpg',
      image_url: 'http://localhost:8000/media/photos/test2.jpg',
      upload_timestamp: '2024-03-20T11:00:00Z'
    }
  ];

  it('displays loading state initially', () => {
    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );
    expect(screen.getByText('Event Gallery')).toBeInTheDocument();
  });

  it('displays "No photos found" when no photos are returned', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('No images found for this event.')).toBeInTheDocument();
    });
  });

  it('displays photos when they are fetched successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPhotos });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      mockPhotos.forEach(photo => {
        expect(screen.getAllByRole('img')).toHaveLength(mockPhotos.length);
      });
    });
  });

  it('makes API call with correct event ID', async () => {
    const eventId = 1;
    axios.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8000/api/photos/?event=${eventId}`
      );
    });
  });

  it('handles API error gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('API Error'));

    render(
      <MemoryRouter>
        <EventPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
      expect(screen.getByText('Error: API Error')).toBeInTheDocument();
    });

    consoleError.mockRestore();
  });
});
