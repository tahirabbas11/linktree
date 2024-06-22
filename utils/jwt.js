import { jwtDecode } from 'jwt-decode';

// ----------------------------------------------------------------------
// Get expire time of access token
const getExpireTime = (accessToken, req, res) => {
  try {
    if (!accessToken) {
      return null;
    }
    const decoded = jwtDecode(accessToken);
    console.log(decoded.exp);
    return decoded.exp;
  } catch (error) {
    console.error(error);
    return error;
  }
};

// ----------------------------------------------------------------------
// Check & validate weather token are valid
const isValidToken = async (accessToken, req, res) => {
  const expireTime = getExpireTime(accessToken, req, res);
  const currentTime = Date.now() / 1000;
  const valid = expireTime && expireTime > currentTime;
  return valid;
};

export { isValidToken };
