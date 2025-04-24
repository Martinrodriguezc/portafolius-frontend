export interface BaseFormState<T, E> {
  formData: T;
  formErrors: E;
}

export interface ValidationResult<E> {
  isValid: boolean;
  errors: E;
}
