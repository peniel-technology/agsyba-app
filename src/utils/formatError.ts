export function formatError(
  error: unknown,
  fallback = 'Something went wrong. Please try again.',
): string {
  return error instanceof Error && error.message.length > 0 ? error.message : fallback;
}
