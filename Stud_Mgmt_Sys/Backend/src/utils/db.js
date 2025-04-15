"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/utils/db.ts
var pg_1 = require("pg");
var pool = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "stud_mgmt",
    password: "9775",
    port: 5000,
});
exports.default = pool;
