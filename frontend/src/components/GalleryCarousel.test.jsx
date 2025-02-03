import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import axios from 'axios';
import GalleryCarousel from './GalleryCarousel';

// mock axios
vi.mock('axios');

describe('GalleryCarousel', () => {
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
    render(<GalleryCarousel eventId={1} />);
    expect(screen.getByText('Gallery')).toBeInTheDocument();
  });

  it('displays "No photos found" when no photos are returned', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    
    render(<GalleryCarousel eventId={1} />);
    
    await waitFor(() => {
      expect(screen.getByText('No photos found')).toBeInTheDocument();
    });
  });

  it('displays photos when they are fetched successfully', async () => {
    axios.get.mockResolvedValueOnce({ data: mockPhotos });
    
    render(<GalleryCarousel eventId={1} />);
    
    await waitFor(() => {
      mockPhotos.forEach(photo => {
        expect(screen.getByRole('img', { name: photo.original_file_name })).toBeInTheDocument();
      });
    });
  });

  it('makes API call with correct event ID', async () => {
    const eventId = 123;
    axios.get.mockResolvedValueOnce({ data: [] });
    
    render(<GalleryCarousel eventId={eventId} />);
    
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith(
        `http://localhost:8000/api/photos/?event=${eventId}`
      );
    });
  });

  it('handles API error gracefully', async () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    axios.get.mockRejectedValueOnce(new Error('API Error'));
    
    render(<GalleryCarousel eventId={1} />);
    
    await waitFor(() => {
      expect(consoleError).toHaveBeenCalled();
      expect(screen.getByText('No photos found')).toBeInTheDocument();
    });
    
    consoleError.mockRestore();
  });
}); 