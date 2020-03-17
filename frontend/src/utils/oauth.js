import API from '../api/api';
const oauthAPI = new API("/oauth");

export const fetchOAuthUrl = async () => await oauthAPI.get("/url");

export const fetchOAuthToken = async query => await oauthAPI.get(query)

export const redirectToGoogle = (e, url) => {
  if (!url) {
    e.preventDefault();
    return;
  }
  e.currentTarget.href = url;
}
