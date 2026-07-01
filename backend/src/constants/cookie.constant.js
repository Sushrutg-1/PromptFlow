export const ACCESS_TOKEN_COOKIE_OPTIONS = Object.freeze({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 24 * 60 * 60 * 1000, //  1 day
});

export const REFRESH_TOKEN_COOKIE_OPTIONS = Object.freeze({
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  maxAge: 10 * 24 * 60 * 60 * 1000, // 10 Days
});
