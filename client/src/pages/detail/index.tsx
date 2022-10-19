import React, { useEffect, useState, useContext } from "react";
import { Grid, Avatar } from "@mui/material";
import PostCard from "@/components/postCard/index";
import "./index.scss";
import { getDetail, getList, deletePost } from "@/api/posts";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { GlobalContext } from "../../context/globalContext.js";
import { getText } from "@/utils/index";
dayjs.extend(relativeTime);

export default function Detail() {
  const { pathname } = useLocation();
  let path = pathname.split("/");
  const pid = path[path.length - 1];
  const { userInfo } = useContext(GlobalContext);
  const navigator = useNavigate();
  const [postDetail, setPostDetail] = useState({} as any);
  const [otherPost, setOtherPost] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const detail = await getDetail(pid);
      setPostDetail(detail);
      const listResult = await getList({
        type: detail.type,
        limit: 5,
        cursor: 1,
        selfId: detail.id,
      });
      setOtherPost(listResult.list);
    }
    fetchData();
  }, [pid]);
  // 关于帖子的操作，编辑和删除
  const btnHandle = (type: string) => {
    if (type === "del") {
      deletePost(postDetail.id).then(() => {
        navigator("/", { state: { type: postDetail.type } });
      });
    } else {
      navigator("/publicPage", { state: { id: postDetail.id } });
    }
  };
  return (
    <div className="postDetail w1122 pt20">
      <Grid container spacing={2}>
        <Grid item xs={otherPost.length > 0 ? 9 : 12}>
          <img className="img" src={"/upload/" + postDetail.cover} alt="" />
          <div
            className="info"
            onClick={() =>
              navigator("/userCenter", { state: { uid: postDetail.uid } })
            }
          >
            <div className="photo">
              <Avatar
                src={
                  postDetail.photo
                    ? require("/public/avatar/" + postDetail.photo)
                    : ""
                }
              >
                {postDetail.nickname || postDetail.userName}
              </Avatar>
            </div>
            <div className="userName">
              <b className="name">
                {postDetail.nickname || postDetail.userName}
              </b>
              <span>
                {" "}
                {dayjs(postDetail.date || new Date())
                  .locale("zh-cn")
                  .fromNow()}
              </span>
            </div>
            {userInfo.uid === postDetail.uid && (
              <div className="btns">
                <Avatar
                  src={require("@/static/image/icon/edit.png")}
                  className="smallIcon"
                  sx={{
                    width: 26,
                    height: 26,
                    bgcolor: "#1296db",
                    cursor: "pointer",
                  }}
                  onClick={() => btnHandle("edit")}
                ></Avatar>
                <Avatar
                  src={require("@/static/image/icon/del.png")}
                  className="smallIcon"
                  sx={{
                    width: 26,
                    height: 26,
                    bgcolor: "#e44e3a",
                    cursor: "pointer",
                  }}
                  onClick={() => btnHandle("del")}
                ></Avatar>
              </div>
            )}
          </div>
          <div className="content pt30">
            <h3>{postDetail.title}</h3>
            <p>{getText(postDetail.desc)}</p>
          </div>
        </Grid>
        {otherPost.length > 0 && (
          <Grid item xs={3}>
            <h4>其他你可能会喜欢的帖子</h4>
            <PostCard postList={otherPost}></PostCard>
          </Grid>
        )}
      </Grid>
    </div>
  );
}
