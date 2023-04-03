import { config } from 'dotenv';
config();
export const TOKENS = {
  JWT_SECRET: process.env.JWT_SECRET,
};

export const BASE_URL = {
  frontend: process.env.FRONTEND_URL,
  backend: process.env.BACKEND_URL,
};