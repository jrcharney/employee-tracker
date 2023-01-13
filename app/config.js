/** 
 * @file app/config.js
 * @author jrcharney@gmail.com
 * @desc the configuration file for the database
 */
import dotenv from "dotenv";

dotenv.config();

export default {
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        hostname: process.env.DB_HOSTNAME,
        port: process.env.DB_PORT
    },
};
