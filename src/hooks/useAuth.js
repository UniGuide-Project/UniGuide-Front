import { useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'https://uniguide.myjad.uz/api/v1';

export function useAuth() {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('uniguide_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      console.error('Error parsing stored user:', e);
      return null;
    }
  });

  const [accessToken, setAccessToken] = useState(() => {
    return localStorage.getItem('uniguide_token') || null;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [authSuccess, setAuthSuccess] = useState(null);

  // Clear messages helper
  const clearMessages = () => {
    setAuthError(null);
    setAuthSuccess(null);
  };

  // Login implementation
  const login = async (email, password) => {
    setIsLoading(true);
    clearMessages();

    try {
      const response = await fetch(`${API_BASE}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle specific server validation errors if any
        let errorMsg = data.message || data.error || 'Authentication failed';
        if (data.errors && typeof data.errors === 'object') {
          errorMsg = Object.values(data.errors).flat().join(' ');
        } else if (typeof data === 'object' && !data.message && !data.error) {
          // If server returned field-specific errors as root object keys
          errorMsg = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join(' | ');
        }
        throw new Error(errorMsg);
      }

      // Success
      const userData = data.user;
      const tokenData = data.tokens?.access;
      const refreshToken = data.tokens?.refresh;

      setUser(userData);
      setAccessToken(tokenData);

      localStorage.setItem('uniguide_user', JSON.stringify(userData));
      localStorage.setItem('uniguide_token', tokenData);
      if (refreshToken) {
        localStorage.setItem('uniguide_refresh', refreshToken);
      }

      setAuthSuccess(data.message || 'Tizimga muvaffaqiyatli kirdingiz!');
      return { success: true, user: userData };
    } catch (error) {
      console.error('Login error:', error);
      setAuthError(error.message || 'Tizimga kirishda xatolik yuz berdi.');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register implementation
  const register = async ({ email, firstName, lastName, phoneNumber, password, passwordConfirm }) => {
    setIsLoading(true);
    clearMessages();

    // Client-side password validation
    if (password !== passwordConfirm) {
      const errorMsg = 'Parollar mos kelmadi!';
      setAuthError(errorMsg);
      setIsLoading(false);
      return { success: false, error: errorMsg };
    }

    try {
      const payload = {
        email,
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        password,
        password2: passwordConfirm
      };

      const response = await fetch(`${API_BASE}/auth/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        let errorMsg = data.message || data.error || 'Registration failed';
        if (data.errors && typeof data.errors === 'object') {
          errorMsg = Object.values(data.errors).flat().join(' ');
        } else if (typeof data === 'object' && !data.message && !data.error) {
          errorMsg = Object.entries(data)
            .map(([key, val]) => `${key}: ${Array.isArray(val) ? val.join(', ') : val}`)
            .join(' | ');
        }
        throw new Error(errorMsg);
      }

      // Success - log them in automatically using the response
      const userData = data.user || { email, first_name: firstName, last_name: lastName };
      const tokenData = data.tokens?.access;
      const refreshToken = data.tokens?.refresh;

      if (tokenData) {
        setUser(userData);
        setAccessToken(tokenData);
        localStorage.setItem('uniguide_user', JSON.stringify(userData));
        localStorage.setItem('uniguide_token', tokenData);
        if (refreshToken) {
          localStorage.setItem('uniguide_refresh', refreshToken);
        }
      }

      setAuthSuccess(data.message || 'Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
      return { success: true, user: userData };
    } catch (error) {
      console.error('Registration error:', error);
      setAuthError(error.message || 'Ro\'yxatdan o\'tishda xatolik yuz berdi.');
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout implementation
  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('uniguide_user');
    localStorage.removeItem('uniguide_token');
    localStorage.removeItem('uniguide_refresh');
    clearMessages();
  };

  return {
    user,
    accessToken,
    isLoading,
    authError,
    authSuccess,
    login,
    register,
    logout,
    clearMessages
  };
}
