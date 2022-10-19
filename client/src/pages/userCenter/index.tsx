import { useContext, useEffect, useState } from "react";
import PostCard from "@/components/postCard/index";
import { Button } from "@mui/material";

import { GlobalContext } from "@/context/globalContext";
import { getPostGroup } from "@/api/posts";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
export default function UserCenterIndex() {
  const { userInfo } = useContext(GlobalContext);
  const { state } = useLocation();
  const isNotSelf = state?.uid && state?.uid !== userInfo.uid;
  const navigator = useNavigate();
  const [postList, setPostList] = useState({} as any);
  const viewAll = (type: number) => {
    return () => {
      navigator("/userCenter/allPosts", { state: { type } });
    };
  };
  useEffect(() => {
    setPostList({});
    getPostGroup(state?.uid || userInfo.uid).then((res) => {
      setPostList(res);
    });
  }, [userInfo.uid]);

  return (
    <div className="myPosts">
      <h3>{isNotSelf ? "他" : "我"}的帖子</h3>
      {postList.length > 0 ? (
        postList.map((item: any) => (
          <div className="postTypeList" key={item.type}>
            <p className="typeNameTitle">
              <span>{item?.list[0]?.typeName}类</span>
              {item.total > 5 && (
                <Button
                  variant="outlined"
                  className="totalNum"
                  onClick={viewAll(item.type)}
                >
                  更多 &gt;&gt;
                </Button>
              )}
            </p>
            {JSON.stringify(postList[item.id]?.list)}
            <PostCard postList={item?.list || []}></PostCard>
          </div>
        ))
      ) : (
        <p>
          还没有发过帖子{" "}
          {isNotSelf && (
            <span className="link" onClick={() => navigator("/publicPage")}>
              去发帖
            </span>
          )}
        </p>
      )}
    </div>
  );
}
