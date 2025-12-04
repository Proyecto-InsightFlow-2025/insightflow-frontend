
/**
 * Returns the standard headers required for JSON API requests.
 * Future auth tokens can be injected here centrally.
 */
export const getHeaders = (): HeadersInit => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    // Bearer tokens or other auth headers can be added  in the future:
    // const token = localStorage.getItem('token');
    // if (token) {
    //   headers['Authorization'] = `Bearer ${token}`;
    // }
    return headers;
  };