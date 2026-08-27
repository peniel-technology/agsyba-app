export type AuthTransitionDirection = 'back' | 'forward';

function getFirstAuthParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export function getAuthTransitionDirection(
  value: string | string[] | undefined,
): AuthTransitionDirection | undefined {
  const direction = getFirstAuthParam(value);

  return direction === 'back' || direction === 'forward' ? direction : undefined;
}

export function getAuthTransitionKey(value: string | string[] | undefined): string | undefined {
  return getFirstAuthParam(value);
}
