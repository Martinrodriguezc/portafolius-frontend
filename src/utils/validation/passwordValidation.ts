// Password validation utilities

/**
 * Validates if a password meets all requirements
 * @param password - The password to validate
 * @returns True if the password is valid, false otherwise
 */
export const validatePassword = (password: string): boolean => {
  // Must have at least 8 characters, a special symbol, and an uppercase letter
  return hasMinLength(password) && 
         hasSpecialChar(password) && 
         hasUpperCase(password);
};

/**
 * Checks if the password has the minimum required length
 * @param password - The password to check
 * @returns True if the password has at least 8 characters
 */
export const hasMinLength = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Checks if the password contains at least one special character
 * @param password - The password to check
 * @returns True if the password contains a special character
 */
export const hasSpecialChar = (password: string): boolean => {
  return /[!@#$%^&*]/.test(password);
};

/**
 * Checks if the password contains at least one uppercase letter
 * @param password - The password to check
 * @returns True if the password contains an uppercase letter
 */
export const hasUpperCase = (password: string): boolean => {
  return /[A-Z]/.test(password);
};

/**
 * Gets a specific error message based on which password requirement failed
 * @param password - The password to check
 * @returns Error message or empty string if password is valid
 */
export const getPasswordErrorMessage = (password: string): string => {
  if (!hasMinLength(password)) {
    return 'La contraseña debe tener al menos 8 caracteres';
  }
  if (!hasSpecialChar(password)) {
    return 'La contraseña debe contener al menos un símbolo especial';
  }
  if (!hasUpperCase(password)) {
    return 'La contraseña debe contener al menos una letra mayúscula';
  }
  return '';
}; 