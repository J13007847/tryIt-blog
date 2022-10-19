import { db } from "../db/index.js";
import { getCount } from "./common.js";

export const postList = (req, res) => {
  const { type = 1, uid = "", cursor = 1, limit = 10, selfId = "" } = req.query;
  getCount(
    "posts",
    `where deleteStatus=0 and visibility=1 ${
      type > 0 ? "and type=" + type : ""
    } ${uid ? "and uid=" + uid : ""}`
  ).then((total) => {
    const q = `select u.uid,u.userName,u.nickname,u.photo,p.id,p.title,p.uid,p.desc,p.type,p.smallCover,p.cover,p.date from user u join posts p on  u.uid = p.uid where p.deleteStatus=0 
    ${type < 0 ? "" : "and p.type=?"} 
    ${uid ? "and p.uid=?" : "and visibility=1 "}
    ${selfId ? "and p.id!=" + selfId : ""} limit ${
      (cursor - 1) * limit
    },${limit}`;
    db.query(
      q,
      uid ? (type > 0 ? [type, uid] : [uid]) : [type],
      (err, data) => {
        if (err) return res.send({ status: 500, msg: err.message });
        res.send({
          status: 200,
          data: {
            total: total,
            list: data,
          },
        });
      }
    );
  });
};
export const postDetail = (req, res) => {
  const { id } = req.query;
  if (!id) return res.send({ status: 500, msg: "缺少帖子id" });
  const q =
    "select * from user u join posts p on  u.uid = p.uid where p.id=? and p.deleteStatus=0";
  db.query(q, [id], (err, result) => {
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
export const addPost = (req, res) => {
  const q = "insert into posts set ?";
  db.query(q, req.body, (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    res.send({
      status: 200,
      data,
    });
  });
};
export const editPost = (req, res) => {
  const q =
    // "update posts set title=?,desc=?,smallCover=?,cover=? where id = ? and uid =?";
    "update posts set ? where id = ? and uid =?";
  const updateData = {
    title: req.body.title,
    type: req.body.type,
    desc: req.body.desc,
    smallCover: req.body.smallCover,
    cover: req.body.cover,
  };
  db.query(q, [updateData, req.body.id, req.auth.uid], (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    res.send({
      status: 200,
      msg: "编辑成功",
    });
  });
};
export const deletePost = (req, res) => {
  const { id } = req.query;
  if (!id) return res.send({ status: 500, msg: "缺少帖子id" });
  const q = "update posts set deleteStatus = 1 where id =? and uid =?";
  db.query(q, [id, req.auth.uid], (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    res.send({
      status: 200,
      msg: "删除成功",
    });
  });
};
export const getPostType = (req, res) => {
  const q = "select * from post_type";
  db.query(q, (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    res.send({
      status: 200,
      data,
    });
  });
};
export const getPostGroup = (req, res) => {
  if (!req.query.uid) res.send({ status: 500, msg: "缺少参数" });
  const q =
    "select type,count(*) as total from posts where uid=? group by type";
  const q1 = `SELECT t.id,t.title,t.smallCover,p.name as typeName,t.type FROM posts t join post_type p on p.id=t.type
  WHERE (SELECT count(*) FROM posts WHERE type=t.type and id<t.id )<5 and uid=?  order by type`;
  db.query(q, req.query.uid, (err, data) => {
    if (err) return res.send({ status: 500, msg: err.message });
    const typeList = data.map((item) => {
      return { ...item, list: [] };
    });
    db.query(q1, req.query.uid, (err, typeData) => {
      if (err) return res.send({ status: 500, msg: err.message });
      typeList.forEach((type) => {
        typeData.forEach((item) => {
          if (item.type === type.type) type.list.push(item);
        });
      });
      res.send({
        status: 200,
        data: typeList,
      });
    });
  });
};
