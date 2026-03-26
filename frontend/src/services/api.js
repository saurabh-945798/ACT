import { getStoredAuth } from "../utils/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "https://act-backend-dyy0.onrender.com";

export async function apiRequest(endpoint, options = {}) {
  const { token } = getStoredAuth();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options.headers ?? {}),
    },
    ...options,
  });

  const contentType = response.headers.get("content-type") ?? "";
  const payload = contentType.includes("application/json")
    ? await response.json()
    : await response.text();

  if (!response.ok) {
    throw new Error(
      typeof payload === "object" && payload?.message
        ? payload.message
        : "Something went wrong. Please try again.",
    );
  }

  return payload;
}

export { API_BASE_URL };
