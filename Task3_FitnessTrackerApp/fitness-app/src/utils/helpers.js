// src/utils/helpers.js

/**
 * Formats a given number of minutes into a human-readable string (e.g., "1h 30m").
 * @param {number} totalMinutes - The total number of minutes.
 * @returns {string} Formatted string.
 */
export const formatMinutesToHoursMinutes = (totalMinutes) => {
  if (typeof totalMinutes !== 'number' || totalMinutes < 0) {
    return 'N/A';
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  let result = '';
  if (hours > 0) {
    result += `${hours}h `;
  }
  if (minutes > 0 || hours === 0) { // Show minutes even if 0 if there are no hours
    result += `${minutes}m`;
  }
  return result.trim();
};

/**
 * Converts a date string or Date object into a readable format (e.g., "Jan 01, 2024").
 * @param {string | Date} dateInput - The date string or Date object.
 * @param {object} options - Options for Date.prototype.toLocaleDateString.
 * @returns {string} Formatted date string.
 */
export const formatDate = (dateInput, options = {}) => {
  if (!dateInput) {
    return 'N/A';
  }

  const date = new Date(dateInput);

  if (isNaN(date.getTime())) { // Check for invalid date
    return 'Invalid Date';
  }

  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  };

  // Merge default options with any provided options
  const mergedOptions = { ...defaultOptions, ...options };

  // Use 'en-US' locale for consistent output unless a different locale is specified in options
  return date.toLocaleDateString(options.locale || 'en-US', mergedOptions);
};


/**
 * Calculates the percentage of a current value towards a target value.
 * @param {number} currentValue - The current progress.
 * @param {number} targetValue - The target goal.
 * @returns {number} The percentage (0-100), capped at 100%. Returns 0 if target is 0 or invalid.
 */
export const calculatePercentage = (currentValue, targetValue) => {
  if (typeof currentValue !== 'number' || typeof targetValue !== 'number' || targetValue <= 0) {
    return 0;
  }
  const percentage = (currentValue / targetValue) * 100;
  return Math.min(100, Math.round(percentage)); // Cap at 100% and round
};

/**
 * Debounces a function, so it's only called after a certain delay.
 * Useful for optimizing event listeners like input changes or window resizing.
 * @param {Function} func - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
export const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

/**
 * Validates an email address using a basic regex pattern.
 * @param {string} email - The email string to validate.
 * @returns {boolean} True if the email is valid, false otherwise.
 */
export const isValidEmail = (email) => {
  // Basic email regex for front-end validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generates a unique ID (simple UUID-like string).
 * Useful for unique keys in lists or temporary element IDs.
 * @returns {string} A unique ID string.
 */
export const generateUniqueId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

/**
 * Stores data in localStorage.
 * @param {string} key - The key under which to store the data.
 * @param {any} value - The data to store.
 */
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
};

/**
 * Retrieves data from localStorage.
 * @param {string} key - The key of the data to retrieve.
 * @returns {any | null} The retrieved data, parsed from JSON, or null if not found/error.
 */
export const getFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("Error retrieving from localStorage:", error);
    return null;
  }
};