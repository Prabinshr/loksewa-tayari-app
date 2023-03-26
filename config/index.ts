import { config } from 'dotenv';
config();
export const TOKENS = {
  JWT_SECRET: process.env.JWT_SECRET,
};
