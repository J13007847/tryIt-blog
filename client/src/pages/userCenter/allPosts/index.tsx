import React, { useContext, useEffect, useState } from "react";
import { getList } from "@/api/posts";
import PostCard from "@/components/postCard/index";
import Pagination from "@/components/pagination";
import { Tab, Tabs } from "@mui/material";
import { GlobalContext } from "@/context/globalContext.js";
import { useLocation } from "react-router-dom";
import "./index.scss";
export default function AllPosts() {
  const { postType, userInfo } = useContext(GlobalContext);
  const { state } = useLocation();
  const [tabVal, setTabVal] = useState(state.type || 1);
  const [total, setTotal] = useState(0);
  const [allPostList, setAllPostList] = useState([]);
  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setTabVal(Number(newValue));
    getAllPost(1, Number(newValue));
  };
  const getAllPost = (cursor = 1, type?: number) => {
    getList({
      type: type || tabVal,
      uid: userInfo.uid,
      cursor: cursor,
      limit: 10,
    }).then((res) => {
      setTotal(res.total);
      setAllPostList(res.list);
    });
  };
  useEffect(() => {
    getAllPost(1);
  }, []);
  return (
    <div className="allPosts">
      <Tabs value={tabVal} onChange={handleChange}>
        {postType.map((item: any) => (
          <Tab label={item.name} value={item.id} key={item.id}></Tab>
        ))}
      </Tabs>
      <PostCard postList={allPostList}></PostCard>
      {allPostList.length === 0 && (
        <p style={{ textAlign: "center", paddingTop: "100px" }}>暂无数据</p>
      )}
      {total > 0 && (
        <Pagination listEvent={getAllPost} total={total}></Pagination>
      )}
    </div>
  );
}
