import { Pool } from "pg";
import config from "../config";

const pool = new Pool({
  host: config.DB.HOST,
  user: config.DB.USER,
  password: config.DB.PASS,
  port: Number(config.DB.PORT),
  max: 20,
});

pool.on("error", (err, _client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

export default pool;
