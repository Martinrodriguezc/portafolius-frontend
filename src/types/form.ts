// Base form types

// Generic type for form state and errors
export interface BaseFormState<T, E> {
  formData: T;
  formErrors: E;
}

// Generic validation result type
export interface ValidationResult<E> {
  isValid: boolean;
  errors: E;
}
