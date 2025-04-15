// src/utils/db.ts
import { Pool } from "pg";

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "stud_mgmt",
    password: "9775",
    port: 5000, 
});

export default pool;
