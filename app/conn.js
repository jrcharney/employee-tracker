/**
 * @file app/conn.js
 * @author Jason Charney (jrcharney@gmail.com)
 * @desc establish the database connection
 */
// TODO: Eventually integrate Sequelize into this file.
import config from "./config.js";
import mariadb from "mariadb";

export const conn = mariadb.createConnection({
    host: config.db.hostname,
    user: config.db.user,
    password: config.db.password,
    database: config.db.name,
    port: config.db.port
});
