import pool from '../utils/db';

export const createUser = async (username: string, email: string, password: string) => {
  const query = 'INSERT INTO users (username, email, password) VALUES ($1, $2, $3)';
  await pool.query(query, [username, email, password]);
};
