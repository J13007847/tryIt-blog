import React from "react";
import { Card, CardMedia, CardContent } from "@mui/material";
import "./index.scss";
import { useNavigate } from "react-router-dom";
export default function PostCard({ postList = [] }) {
  const navigator = useNavigate();
  const toDetail = (id: number) => {
    navigator("/detail/" + id);
  };
  return (
    <div className="postCard pt20">
      {postList.map((item: any) => (
        <Card
          variant="outlined"
          key={item.id}
          onClick={() => toDetail(item.id)}
        >
          <CardMedia
            component="img"
            height="194"
            image={"/upload/" + item.smallCover}
            alt={item.title}
          ></CardMedia>
          <CardContent>{item.title}</CardContent>
        </Card>
      ))}
    </div>
  );
}
