export const API_URL = 'http://localhost:8000/api';

export const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {return false;}

    try {
        const response = await fetch(`${API_URL}/auth/verify/`, {
            headers: {
                'Authorization': `Token ${token}`
            }
        });
        return response.ok;
    } catch (err) {
        console.error('Token verification error:', err);
        return false;
    }
};

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

export const getAuthToken = () => {
    return localStorage.getItem('token');
};
