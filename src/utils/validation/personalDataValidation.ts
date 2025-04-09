// Personal data validation utilities

/**
 * Validates if a name is not empty
 * @param name - The name to validate
 * @returns True if the name is valid, false otherwise
 */
export const validateName = (name: string): boolean => {
  return !!name && name.trim() !== '';
};

/**
 * Gets an error message for name validation
 * @param name - The name to validate
 * @returns Error message or empty string if name is valid
 */
export const getNameErrorMessage = (name: string): string => {
  if (!validateName(name)) {
    return 'El nombre es obligatorio';
  }
  return '';
};

/**
 * Validates if a last name is not empty
 * @param lastName - The last name to validate
 * @returns True if the last name is valid, false otherwise
 */
export const validateLastName = (lastName: string): boolean => {
  return !!lastName && lastName.trim() !== '';
};

/**
 * Gets an error message for last name validation
 * @param lastName - The last name to validate
 * @returns Error message or empty string if last name is valid
 */
export const getLastNameErrorMessage = (lastName: string): string => {
  if (!validateLastName(lastName)) {
    return 'El apellido es obligatorio';
  }
  return '';
};

/**
 * Validates if a user type is selected
 * @param userType - The user type to validate
 * @returns True if the user type is valid, false otherwise
 */
export const validateUserType = (userType: string): boolean => {
  return !!userType && userType.trim() !== '';
};

/**
 * Gets an error message for user type validation
 * @param userType - The user type to validate
 * @returns Error message or empty string if user type is valid
 */
export const getUserTypeErrorMessage = (userType: string): string => {
  if (!validateUserType(userType)) {
    return 'Por favor, selecciona un tipo de usuario';
  }
  return '';
}; 