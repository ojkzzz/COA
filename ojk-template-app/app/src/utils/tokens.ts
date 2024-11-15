const locationOfTokens = sessionStorage;

export const getTokensFromStorage = () => {
  let TOKENS: { access_token: string | undefined; refresh_token: string | undefined } = {
    access_token: undefined,
    refresh_token: undefined,
  };

  const access_token = locationOfTokens.getItem(tokens.ACCESS_TOKEN);
  if (access_token) TOKENS = { ...TOKENS, access_token };

  const refresh_token = locationOfTokens.getItem(tokens.REFRESH_TOKEN);
  if (refresh_token) TOKENS = { ...TOKENS, refresh_token };

  return TOKENS;
};

enum tokens {
  ACCESS_TOKEN = "access_token",
  REFRESH_TOKEN = "refresh_token",
}

export const setAccessTokenToStorage = (access_token: string) => {
  locationOfTokens.setItem(tokens.ACCESS_TOKEN, access_token);
};

export const setRefreshTokenToStorage = (refresh_token: string) => {
  locationOfTokens.setItem(tokens.REFRESH_TOKEN, refresh_token);
};

export const removeAccessTokenFromStorage = () => {
  locationOfTokens.removeItem(tokens.ACCESS_TOKEN);
};

export const removeRefreshTokenFromStorage = () => {
  locationOfTokens.removeItem(tokens.REFRESH_TOKEN);
};
