import jwt_decode from "jwt-decode";

export const saveSessionToken = sessionToken =>
  localStorage.setItem("token", sessionToken);

export const getSessionToken = () => localStorage.getItem("token");

export const deleteSessionToken = () => localStorage.removeItem("token");

export const decodeJWT = jwtToken => jwt_decode(jwtToken);

export const getAndDecodeSession = () => {
  const token = getSessionToken();
  if (token) {
    const currentTime = Date.now() / 1000;
    const session = decodeJWT(token);
    if (session.exp < currentTime) {
      deleteSessionToken();
    } else {
      return session;
    }
  }
};
