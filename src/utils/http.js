import { QueryClient } from "@tanstack/react-query";

import { API_BASE_URL, API_KEY } from "../constants";

const baseUrl = `${API_BASE_URL}`;

export const queryClient = new QueryClient();

export async function fetchFn({ queryKey }) {
  const [url, token] = queryKey;

  try {
    const res = await fetch(`${baseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": API_KEY,
      },
    });
    const data = await res.json();

    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while fetching data"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to make request");
  }
}

export async function postFn({ url, body, token }) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while posting data"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to make request");
  }
}

export async function putFn({ url, body, token }) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while updating data"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to make request");
  }
}

export async function deleteFn({ url, token }) {
  try {
    const response = await fetch(`${baseUrl}${url}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.errors?.[0]?.message || "An error occurred while deleting data"
      );
    }

    return data;
  } catch (error) {
    throw new Error(error.message || "Failed to make request");
  }
}
