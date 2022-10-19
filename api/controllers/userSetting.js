import bcrypt from "bcryptjs";
import { db } from "../db/index.js";
export const getOtherUser = (req, res) => {
  const q = "select * from user where uid=?";
  db.query(q, [req.query.uid], (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message });
    res.send({
      status: 200,
      data: {
        ...result[0],
        password: "",
      },
    });
  });
};
export const userAvatar = (req, res) => {
  const q = "update user set photo=? where uid=? ";
  db.query(q, [req.body.photo, req.body.uid], (err, result) => {
    if (err) return res.send({ status: 500, msg: err.message });
    if (result.changedRows === 1) {
      res.send({ status: 200, msg: "更新成功" });
    }
  });
};
export const userBaseInfo = (req, res) => {
  const q = "update user set nickname=? ,sex=? where uid=? ";
  db.query(
    q,
    [req.body.nickname, req.body.sex, req.body.uid],
    (err, result) => {
      if (err) return res.send({ status: 500, msg: err.message });
      if (result.changedRows === 1) {
        res.send({ status: 200, msg: "更新成功" });
      }
    }
  );
};
export const changePwd = (req, res) => {
  const updateQ = "update user set password=? where uid=?";
  const selectQ = "select password from user where uid=?";
  db.query(selectQ, [req.body.uid], (err, user) => {
    if (err) return res.send({ status: 500, msg: err.message });
    if (user.length > 0) {
      const pwdValidate = bcrypt.compareSync(
        req.body.oldPassword,
        user[0].password
      );
      if (!pwdValidate) return res.send({ status: 500, msg: "旧密码错误" });
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      db.query(updateQ, [hash, req.body.uid], (err, result) => {
        if (err) return res.send({ status: 500, msg: err.message });
        res.send({ status: 200, msg: "修改成功，请重新登录" });
      });
    } else {
      res.send({ status: 500, msg: "参数错误" });
    }
  });
};
