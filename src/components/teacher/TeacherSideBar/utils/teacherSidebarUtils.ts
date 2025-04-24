export const isActive = (
  pathname: string,
  path: string,
  exact: boolean = false
): boolean => {
  if (exact) {
    return pathname === path;
  }
  return pathname === path || pathname.startsWith(`${path}/`);
};