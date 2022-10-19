import mysql from "mysql";
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123mysql",
  database: "blog_db",
});
