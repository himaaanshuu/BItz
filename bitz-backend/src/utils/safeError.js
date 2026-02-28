/**
 * In production, avoid leaking internal error messages to clients.
 */
export const safeErrorMessage = (message, err) => {
  if (process.env.NODE_ENV === 'production') {
    return message;
  }
  return err?.message ? `${message}: ${err.message}` : message;
};
