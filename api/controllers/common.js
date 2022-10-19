import { db } from "../db/index.js";
export const getCount = async (T, where) => {
  const q = `select count(*) as total from ${T} ${where}`;
  return new Promise((resolve, reject) => {
    db.query(q, (err, data) => {
      if (err) reject(err.message);
      return resolve(data && data[0].total);
    });
  });
};
