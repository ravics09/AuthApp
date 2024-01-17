import jwt from 'jsonwebtoken';

// function to create access token
export function createAccessToken(userId: string, email: string): string {
  return jwt.sign(
    { userId, email },
    "your_access_token_secret_key",
    { expiresIn: "1h" }
  );
}

// function to create refresh token
export function createRefreshToken(userId: string): string {
  return jwt.sign(
    { userId },
    "your_refresh_token_secret_key",
    { expiresIn: "7d" } 
  );
}