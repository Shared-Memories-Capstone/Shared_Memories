const API_URL = 'http://localhost:8000/api';

export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/auth/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    
    if (!response.ok) {
        throw new Error('Login failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
        id: data.user_id,
        username: data.username,
    }));
    return data;
};

export const register = async (userData) => {
    const response = await fetch(`${API_URL}/auth/register/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
        throw new Error('Registration failed');
    }
    
    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({
        id: data.user_id,
        username: data.username,
    }));
    return data;
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}; 