import { BaseFormState, ValidationResult } from '../types/form';
import { useState, ChangeEvent, FormEvent } from 'react';

// Base hook for form handling
export function useFormHook<T, E>(
  initialState: BaseFormState<T, E>,
  validateForm: (data: T) => ValidationResult<E>,
  onSuccess?: () => void
) {
  const [state, setState] = useState<BaseFormState<T, E>>(initialState);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setState({
      ...state,
      formData: {
        ...state.formData,
        [id]: value,
      },
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const { isValid, errors } = validateForm(state.formData);
    
    setState({
      ...state,
      formErrors: errors,
    });

    if (isValid && onSuccess) {
      onSuccess();
    }
  };

  return {
    formData: state.formData,
    formErrors: state.formErrors,
    handleInputChange,
    handleSubmit,
  };
} 