import jwt from "jsonwebtoken";
export const validateToken = (req, res, next) => {
  const url = req.path || "";
  if (url.indexOf("/api/user/") > -1 || url.indexOf("/api/") < 0) {
    next();
  } else {
    const token = req.cookies.access_token;
    if (!token) return res.send({ status: 401, msg: "没有权限" });
    jwt.verify(token, "myBlog", (err, userInfo) => {
      if (err) return res.send({ status: 403, msg: "token 不合法" });
      else {
        req.auth = userInfo;
        next();
      }
    });
  }
};
