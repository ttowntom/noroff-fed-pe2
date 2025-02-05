/**
 * Save data to localStorage with JSON stringification
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 * @example
 * saveLocal('user', { name: 'John', id: 123 });
 */
export function saveLocal(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/**
 * Load and parse data from localStorage
 * @param {string} key - Storage key
 * @returns {*|null} Parsed data or null if not found
 * @example
 * const user = loadLocal('user'); // { name: 'John', id: 123 }
 */
export function loadLocal(key) {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
}

/**
 * Remove item from localStorage by key
 * @param {string} key - Storage key to remove
 * @example
 * removeLocal('user');
 */
export function removeLocal(key) {
  localStorage.removeItem(key);
}

/**
 * Clear all data from localStorage
 * @example
 * clearLocal();
 */
export function clearLocal() {
  localStorage.clear();
}
