// Checks if a field is required
export const validateRequiredField = (value: string): boolean => {
  return !!value && value.trim() !== '';
};

// Gets an error message for a required field
export const getRequiredFieldError = (fieldName: string, value: string): string => {
  return !validateRequiredField(value) ? `El ${fieldName} es obligatorio` : '';
}; 