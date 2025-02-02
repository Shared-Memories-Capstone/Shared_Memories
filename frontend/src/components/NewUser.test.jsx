import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom'; 
import NewUser from './NewUser';
import { register } from '../services/auth';
import { vi } from 'vitest'; 


vi.mock('../services/auth', () => ({
  register: vi.fn(),
}));


const mockNavigate = vi.fn();


vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom'); 
  return {
    ...actual,
    useNavigate: () => mockNavigate, 
  };
});

describe('NewUser Component', () => {
  test('renders form fields correctly', () => {
    render(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('allows user to type in input fields', () => {
    render(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    );

    const emailInput = screen.getByLabelText(/email address/i);
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput.value).toBe('test@example.com');

    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    expect(usernameInput.value).toBe('testuser');

    const firstNameInput = screen.getByLabelText(/first name/i);
    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    expect(firstNameInput.value).toBe('John');

    const lastNameInput = screen.getByLabelText(/last name/i);
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    expect(lastNameInput.value).toBe('Doe');

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput.value).toBe('password123');
  });

  test('calls register function and navigates on successful submission', async () => {
    register.mockResolvedValueOnce(); 

    render(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(register).toHaveBeenCalledWith({
      email: 'test@example.com',
      username: 'testuser',
      firstName: 'John',
      lastName: 'Doe',
      password: 'password123'
    }));

    expect(mockNavigate).toHaveBeenCalledWith('/'); 
  });

  test('displays error message when registration fails', async () => {
    register.mockRejectedValueOnce(new Error('Registration failed'));

    render(
      <MemoryRouter>
        <NewUser />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => expect(screen.getByText(/registration failed/i)).toBeInTheDocument());
  });
});
