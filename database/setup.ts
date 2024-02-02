import db from ".";
import config from "../config";

const create_database = async (dbName: string) => {
  const client = await db.connect();
  try {
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );
    if (result.rows.length === 0) {
      await client.query(`CREATE DATABASE ${dbName}`);
    }
  } catch (error) {
    console.error("Error initializing database:");
  } finally {
    client.release();
  }
};

const create_users_table = async () => {
  const usersQuery = `DROP TABLE IF EXISTS "users" cascade;
  CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" varchar(250) UNIQUE NOT NULL,
    "password" varchar(150) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
  return db.query(usersQuery);
};

const setup = async () => {
  const dbName = config.DB.NAME;
  await create_database(dbName);
  await create_users_table();
};

setup();
