import { UserProps } from '../types/User';

export function normalizeId(id: number | string): number {
  return typeof id === 'string' ? parseInt(id, 10) : id;
}

export function areAllStudentsSelected(
  students: UserProps[],
  selectedIds: number[]
): boolean {
  if (students.length === 0) return false;
  return students.every(u => selectedIds.includes(normalizeId(u.id)));
}