export const sanitazeHtml = (input: string): string => {
  return input
    .replace(/&/g, '&')
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '"')
    .replace(/'/g, '&#x27;');
};

export const sanitazeUrl = (url: string): string => {
  try {
    const parsed = new URL(url, window.location.origin);
    return parsed.pathname + parsed.search;
  } catch {
    return '/';
  }
};

export const validateNumericParam = (value: unknown): number | null => {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) && num >= 0 ? Math.floor(num) : null;
};

export const sanitazeStringParam = (value: unknown): string => {
  if (typeof value !== 'string') return '';
  return value
    .replace(/[<>'"&]/g, '')
    .trim()
    .slice(0, 100);
};
