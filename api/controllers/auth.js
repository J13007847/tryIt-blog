import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "../db/index.js";
export const login = (req, res) => {
  if (!req.body.userName) return res.send({ status: 500, msg: "请输入用户名" });
  if (!req.body.password) return res.send({ status: 500, msg: "请输入密码" });

  const q = "select * from user where userName=?";
  db.query(q, [req.body.userName], (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    if (!data.length) return res.send({ status: 500, msg: "用户不存在" });
    const pwdValidate =
      req.body.userName == "visitors"
        ? true
        : bcrypt.compareSync(req.body.password, data[0].password);
    if (!pwdValidate) return res.send({ status: 500, msg: "用户名/密码错误" });
    const token = jwt.sign(
      { uid: data[0].uid, userName: data[0].userName },
      "myBlog",
      {
        expiresIn: "24H",
      }
    );
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .send({
        status: 200,
        msg: "登录成功！",
        data: {
          ...data[0],
          password: "",
        },
      });
  });
};
export const register = (req, res) => {
  if (!req.body.userName) return res.send({ status: 500, msg: "请输入用户名" });
  if (!req.body.password) return res.send({ status: 500, msg: "请输入密码" });
  const q = "select * from user where userName=?";
  db.query(q, [req.body.userName], (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    if (data.length) return res.send({ status: 500, msg: "用户已存在！" });
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const insertQ = "insert into user(`userName`,`password`) values (?)";
    const value = [req.body.userName, hash];
    db.query(insertQ, [value], (err, data) => {
      if (err) return res.send({ status: 500, msg: err.message });
      res.send({ status: 200, msg: "注册成功！" });
    });
  });
};
export const loginOut = (req, res) => {
  res
    .clearCookie("access_token", {
      sameSite: "none",
      secure: true,
    })
    .send({ status: 200, msg: "退出登录成功！" });
};
