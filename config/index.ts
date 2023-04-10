import { config } from 'dotenv';
config();
export const TOKENS = {
JWT_ACCESS_TOKEN_SECRET:process.env.JWT_ACCESS_TOKEN_SECRET,
JWT_REFRESH_TOKEN_SECRET:process.env.JWT_REFRESH_TOKEN_SECRET,
REFRESH_TOKEN_HASH_SECRET:process.env.REFRESH_TOKEN_HASH_SECRET,
};

export const BASE_URL = {
  frontend: process.env.FRONTEND_URL,
  backend: process.env.BACKEND_URL,
};