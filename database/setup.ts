import DB from ".";

const create_users_table = async () => {
  const usersQuery = `DROP TABLE IF EXISTS "users" cascade;
  CREATE TABLE IF NOT EXISTS "users" (
    "id" SERIAL PRIMARY KEY,
    "username" varchar(250) UNIQUE NOT NULL,
    "password" varchar(150) NOT NULL,
  );`;
  return DB.query(usersQuery);
};

const setup = async () => { 
    await create_users_table()
}

setup()
