import { TextInputProps } from './types';
import { BaseInput } from './BaseInput';

export const TextInput = (props: TextInputProps) => {
  return <BaseInput {...props} type="text" />;
}; 