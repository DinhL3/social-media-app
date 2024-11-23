import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  exp: number;
}

export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 < Date.now();
  } catch (e) {
    console.error('Failed to decode token:', e);
    return true;
  }
};
