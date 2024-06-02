import { createPool } from "mysql2/promise";

const pool = createPool({
    host:'localhost',
    port:'3306',
    user:'sony',
    password:'sony',
    database:'playstation'

});

export default pool;