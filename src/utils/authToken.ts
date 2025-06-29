const ACCESS_TOKEN_KEY = "pandamarket-at";
const REFRESH_TOKEN_KEY = "pandamarket-rt";

export function getTokens() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  return { accessToken, refreshToken };
}

type TTokens = {
  accessToken: string;
  refreshToken: string;
};

export function setTokens({ accessToken, refreshToken }: TTokens) {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function clearTokens() {
  localStorage.setItem(ACCESS_TOKEN_KEY, "");
  localStorage.setItem(REFRESH_TOKEN_KEY, "");
}
