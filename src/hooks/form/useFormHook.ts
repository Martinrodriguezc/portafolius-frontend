import { useState, ChangeEvent, FormEvent } from "react";
import { BaseFormState, ValidationResult } from "../../types/form/form";

export function useFormHook<T, E>(
  initialState: BaseFormState<T, E>,
  validateForm: (data: T) => ValidationResult<E>,
  onSuccess?: () => void
) {
  const [formData, setFormData] = useState<T>(initialState.formData);
  const [formErrors, setFormErrors] = useState<E>(initialState.formErrors);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(formData);
    setFormErrors(errors);
    if (isValid && onSuccess) {
      onSuccess();
    }
  };

  return { formData, formErrors, handleInputChange, handleSubmit };
}
