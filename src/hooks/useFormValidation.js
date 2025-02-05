import { useState } from "react";
import { z } from "zod";

/**
 * Custom hook for form validation using Zod schemas
 * @param {Object} initialState - Initial form data state
 * @param {Object} schema - Zod validation schema
 * @returns {Object} Form validation utilities
 * @property {Object} formData - Current form data
 * @property {Object} formErrors - Current validation errors
 * @property {Object} touched - Fields that have been touched/blurred
 * @property {Function} setFormData - Update form data
 * @property {Function} setFormErrors - Update form errors
 * @property {Function} handleBlur - Handle input blur events
 * @property {Function} handleChange - Handle input change events
 */
export function useFormValidation(initialState, schema) {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateField = (name, value) => {
    try {
      schema.pick({ [name]: schema.shape[name] }).parse({ [name]: value });
      return undefined;
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.errors[0]?.message;
      }
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  return {
    formData,
    formErrors,
    touched,
    setFormData,
    setFormErrors,
    handleBlur,
    handleChange,
  };
}
