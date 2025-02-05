import { QueryClient } from "@tanstack/react-query";

import { API_BASE_URL, API_KEY } from "../constants";

const baseUrl = `${API_BASE_URL}`;

export const queryClient = new QueryClient();

/**
 * Makes an authenticated GET request to the API
 * @param {Object} params - Request parameters
 * @param {Array} params.queryKey - Query key array where first element is the URL
 * @param {string} params.token - Authentication token
 * @returns {Promise<Object>} API response data
 * @throws {Error} If request fails or response is not ok
 */
export async function fetchFn({ queryKey, token }) {
  const [url] = queryKey;

  try {
    const response = await fetch(`${baseUrl}${url}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": API_KEY,
      },
    });
    const data = await response.json();

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

/**
 * Makes an authenticated POST request to the API
 * @param {Object} params - Request parameters
 * @param {string} params.url - API endpoint URL
 * @param {Object} params.body - Request body data
 * @param {string} params.token - Authentication token
 * @returns {Promise<Object>} API response data
 * @throws {Error} If request fails or response is not ok
 */
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

/**
 * Makes an authenticated PUT request to the API
 * @param {RequestParams} params - Request parameters
 * @param {string} params.url - API endpoint URL
 * @param {Object} params.body - Request body data
 * @param {string} params.token - Authentication token
 * @returns {Promise<Object>} API response data
 * @throws {Error} If request fails or response is not ok
 */
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

/**
 * Makes an authenticated DELETE request to the API
 * @param {Object} params
 * @param {string} params.url - API endpoint URL
 * @param {string} params.token - Authentication token
 * @returns {Promise<Object>} API response data
 * @throws {Error} If request fails or response is not ok
 */
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

    if (response.status === 204) {
      return { message: "Successfully deleted" };
    }

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
