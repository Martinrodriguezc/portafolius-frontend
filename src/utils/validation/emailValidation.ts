// Email validation utilities

/**
 * Validates if an email has a valid format
 * @param email - The email to validate
 * @returns True if the email format is valid, false otherwise
 */
export const validateEmail = (email: string): boolean => {
  if (!email || email.trim() === '') {
    return false;
  }
  
  // Basic email format validation
  const emailRegex = /\S+@\S+\.\S+/;
  return emailRegex.test(email);
};

/**
 * Gets an error message for email validation
 * @param email - The email to validate
 * @returns Error message or empty string if email is valid
 */
export const getEmailErrorMessage = (email: string): string => {
  if (!email || email.trim() === '') {
    return 'El correo electrónico es obligatorio';
  }
  
  if (!validateEmail(email)) {
    return 'Ingresa un correo electrónico válido';
  }
  
  return '';
}; 