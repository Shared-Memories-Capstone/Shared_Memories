import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import CreateEventForm from '../CreateEventForm';
import { API_URL } from '../../services/auth';
import { vi, describe, it, expect } from 'vitest';

// Mock the router hooks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

// Mock the auth service
vi.mock('../../services/auth', () => ({
  API_URL: 'http://test-api',
  getAuthToken: () => 'fake-token'
}));

// Mock the generateEventCode service
vi.mock('../../services/generateEventCode', () => ({
  generateEventCode: () => 'TEST123'
}));

describe('CreateEventForm', () => {
  beforeEach(() => {
    // Mock localStorage
    const mockUser = { id: 1, username: 'testuser' };
    Storage.prototype.getItem = vi.fn(() => JSON.stringify(mockUser));

    // Reset fetch mock
    window.fetch = vi.fn();
  });

  const renderWithRouter = (component) => {
    return render(
      <BrowserRouter>
        {component}
      </BrowserRouter>
    );
  };

  it('renders the form elements correctly', () => {
    renderWithRouter(<CreateEventForm />);

    expect(screen.getByText('Create New Event')).toBeInTheDocument();
    expect(screen.getByLabelText('Event Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Event Date')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create Event' })).toBeInTheDocument();
  });

  it('handles input changes', async () => {
    renderWithRouter(<CreateEventForm />);

    const titleInput = screen.getByLabelText('Event Title');
    const descriptionInput = screen.getByLabelText('Description');
    const dateInput = screen.getByLabelText('Event Date');

    fireEvent.change(titleInput, { target: { value: 'Test Event' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });

    expect(titleInput).toHaveValue('Test Event');
    expect(descriptionInput).toHaveValue('Test Description');
    expect(dateInput).toHaveValue('2024-12-31');
  });

  it('submits the form successfully', async () => {
    renderWithRouter(<CreateEventForm />);

    const titleInput = screen.getByLabelText('Event Title');
    const descriptionInput = screen.getByLabelText('Description');
    const dateInput = screen.getByLabelText('Event Date');

    fireEvent.change(titleInput, { target: { value: 'Test Event' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Event' }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        `${API_URL}/events/`,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token fake-token'
          }
        })
      );
    });
  });

  it('handles submission error', async () => {

    renderWithRouter(<CreateEventForm />);

    const titleInput = screen.getByLabelText('Event Title');
    const descriptionInput = screen.getByLabelText('Description');
    const dateInput = screen.getByLabelText('Event Date');

    fireEvent.change(titleInput, { target: { value: 'Test Event' } });
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
    fireEvent.change(dateInput, { target: { value: '2024-12-31' } });

    fireEvent.click(screen.getByRole('button', { name: 'Create Event' }));

    expect(await screen.findByText('Failed to create event. Please try again.')).toBeInTheDocument();
  });
});
