const API_URL = 'https://insightflow-users-service.onrender.com';

export interface CreateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  dateOfBirth: string;
  address: string;
  phoneNumber: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth?: string;
  address?: string;
  phoneNumber?: string;
  isActive?: boolean;
}

export interface LoginResponse {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface ApiError {
  message: string;
}

const getHeaders = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  return headers;
};

export const api = {
  async register(data: CreateUserRequest): Promise<User> {
    const response = await fetch(`${API_URL}/user`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Ha habido un error con el registro en el servidor');
    }

    return response.json();
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/user/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Ha habido un error con el inicio de sesión en el servidor');
    }

    return response.json();
  },

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Error de comunicación al obtener el usuario');
    }

    return response.json();
  },

  async updateUser(id: string, data: Partial<CreateUserRequest>): Promise<User> {
    const userId = localStorage.getItem('userId');
    const url = new URL(`${API_URL}/user/${id}`);
    url.searchParams.append('requestUserId', userId || '');

    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    console.log('Update response status:', response.body);
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Update failed');
    }

    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const response = await fetch(`${API_URL}/user/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || 'Delete failed');
    }
  },

  async getAllUsers(requestUserId: string): Promise<User[]> {
    const url = new URL(`${API_URL}/user`);
    url.searchParams.append('requestUserId', requestUserId);

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    return response.json();
  },
};
