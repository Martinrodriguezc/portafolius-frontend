// Export only the necessary validation functions for external use

// Export form validation functions
export { validateRegisterForm, validateLoginForm } from './formValidation';

// We don't export the individual validation functions from the other files
// as they should only be used internally by formValidation.ts 