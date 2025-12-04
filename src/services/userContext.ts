import { getHeaders } from "./helpers";
import type {
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  User,
  ApiError,
  UpdateUserRequest,
} from "./types";

// Specific URL for the Users Microservice
const USERS_API_URL = "https://insightflow-users-service.onrender.com";

export const userService = {
  async register(data: CreateUserRequest): Promise<User> {
    const response = await fetch(`${USERS_API_URL}/user`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(
        error.message || "Ha habido un error con el registro en el servidor"
      );
    }

    return response.json();
  },

  async login(data: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${USERS_API_URL}/user/login`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(
        error.message ||
          "Ha habido un error con el inicio de sesión en el servidor"
      );
    }

    return response.json();
  },

  async getUserById(id: string): Promise<User> {
    const response = await fetch(`${USERS_API_URL}/user/${id}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Error de comunicación al obtener el usuario");
    }

    return response.json();
  },

  async updateUser(
    id: string,
    data: Partial<UpdateUserRequest>
  ): Promise<User> {
    const userId = localStorage.getItem("userId");
    const url = new URL(`${USERS_API_URL}/user/${id}`);

    // Naive Auth Parameter
    url.searchParams.append("requestUserId", userId || "");

    const response = await fetch(url.toString(), {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Robust error handling for different backend error formats
      const errorText = await response.text();
      let errorMessage = "Error en la actualización del usuario";
      try {
        const errorJson = JSON.parse(errorText);
        if (errorJson.errors) {
          // Extract validation errors from ASP.NET ModelState
          errorMessage = Object.values(errorJson.errors).flat().join(", ");
        } else {
          errorMessage = errorJson.message || errorMessage;
        }
      } catch (e) {
        console.error("Error parsing error response:", e);
      }

      throw new Error(errorMessage);
    }

    return response.json();
  },

  async deleteUser(id: string): Promise<void> {
    const userId = localStorage.getItem("userId");
    const url = new URL(`${USERS_API_URL}/user/${id}`);

    // Naive Auth Parameter
    url.searchParams.append("requestUserId", userId || "");

    const response = await fetch(url.toString(), {
      method: "DELETE",
      headers: getHeaders(),
    });

    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message || "Borrado de usuario fallido");
    }
  },

  async getAllUsers(requestUserId: string): Promise<User[]> {
    const url = new URL(`${USERS_API_URL}/user`);
    url.searchParams.append("requestUserId", requestUserId);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error("Error con el servidor al obtener los usuarios");
    }

    return response.json();
  },
};
