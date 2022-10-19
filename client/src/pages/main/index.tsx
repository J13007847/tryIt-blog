import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import relativeTime from "dayjs/plugin/relativeTime";
import { Grid, Avatar } from "@mui/material";
import PageCom from "@/components/pagination";
import { getList } from "@/api/posts";
import { getText } from "@/utils/index";
import "./index.scss";
dayjs.extend(relativeTime);
export default function Main() {
  const location = useLocation();
  const navigator = useNavigate();
  const [postList, setPostList] = useState([]);
  const [total, setTotal] = useState(0);
  const postId = location.state?.type || 1;
  useEffect(() => {
    if (postId) getListData();
  }, [postId]);
  // 获取列表数据
  const getListData = (cursor = 1) => {
    getList({
      type: postId,
      cursor: cursor,
    }).then((res: any) => {
      setPostList(res.list || []);
      setTotal(res.total || 0);
    });
  };
  // 跳转详情页
  const toDetailPage = (item: any) => {
    navigator("/detail/" + item.id, { state: { type: item.type } });
  };
  return (
    <div className="mainContainer">
      {postList.length === 0 && <p className="w1122 emptyTxt">暂无数据</p>}
      {postList.map((item: any) => (
        <div
          className="w1122 postCard"
          key={item.id}
          onClick={() => toDetailPage(item)}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid className="contentGirdItem" item xs={7}>
              <div className="userBox">
                <Avatar
                  src={
                    item.photo ? require("/public/avatar/" + item.photo) : ""
                  }
                >
                  {item.nickname || item.userName}
                </Avatar>
                <span>{item.nickname || item.userName}</span>
              </div>
              <h3>{item.title}</h3>
              <p>{getText(item.desc)}</p>
              <span className="date">
                {dayjs(item.date || new Date())
                  .locale("zh-cn")
                  .fromNow()}
              </span>
            </Grid>
            <Grid className="imgGridItem" item xs={4}>
              {item.smallCover && (
                <img
                  className="img"
                  src={"/upload/" + item.smallCover}
                  alt=""
                />
              )}
            </Grid>
          </Grid>
        </div>
      ))}
      {postList.length > 0 && (
        <div className="w1122">
          <PageCom listEvent={getListData} total={total}></PageCom>
        </div>
      )}
    </div>
  );
}
