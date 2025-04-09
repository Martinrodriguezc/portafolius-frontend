
// Checks if a field is required
export const validateRequiredField = (value: string): boolean => {
  return !!value && value.trim() !== '';
};

// Gets an error message for a required field
export const getRequiredFieldError = (fieldName: string): string => {
  return !validateRequiredField(fieldName) ? `El ${fieldName} es obligatorio` : '';
}; 