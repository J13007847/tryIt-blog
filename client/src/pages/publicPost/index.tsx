import { useState, useContext, useEffect } from "react";
import { getDetail, addPost, editPost } from "@/api/posts";
import { req_upload } from "@/api/common";
import {
  Button,
  Grid,
  FormControl,
  TextField,
  MenuItem,
  Card,
  CardActions,
  FormControlLabel,
  FormHelperText,
  Checkbox,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./index.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/globalContext.js";

export default function PublicPost() {
  const navigator = useNavigate();
  const { state } = useLocation();
  const { userInfo, postType } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    desc: "",
    smallCover: "",
    cover: "",
  } as any);
  const [pShow, setPshow] = useState(true);
  const [errData, setErrData] = useState(formData);
  const postId = state?.id;
  // 输入框change事件
  const inputChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  // 上传文件
  const fileChange = async (event: any) => {
    const { files, name } = event.target;
    await validateImg(files[0], name);
    const fileData = new FormData();
    fileData.append("file", files[0]);
    req_upload(fileData).then((filename: string) => {
      setFormData((prev: any) => ({ ...prev, [name]: filename }));
    });
  };
  // 提交
  const submit = async () => {
    if (!validateFile()) {
      let params = postId
        ? formData
        : {
            ...formData,
            visibility: pShow,
            uid: userInfo.uid,
            date: new Date().toLocaleString(),
          };
      let reqMethod = postId ? editPost : addPost;
      await reqMethod(params);
      navigator("/", { state: { type: formData.type } });
    }
  };
  // 校验输入项
  const validateFile = () => {
    const erMsg: any = {
      title: "请输入标题",
      type: "请选择类型",
      desc: "请输入帖子正文",
      smallCover: "请上传封面小图",
      cover: "请上传封面大图",
    };
    let errObj: any = {},
      flag = 0;
    Object.keys(formData).forEach((key: string) => {
      errObj[key] = !formData[key] ? erMsg[key] : "";
      if (!formData[key] && erMsg.hasOwnProperty(key)) flag++;
    });
    setErrData(errObj);
    return flag > 0;
  };
  // 复选框change事件
  const showHandle = (e: any) => {
    const { checked } = e.target;
    setPshow(checked);
  };
  // 检验上传图片
  const validateImg = (file: any, name: string) => {
    const { type, size } = file;
    return new Promise((resolve, reject) => {
      if (type.indexOf("image/") < 0 || size / (1024 * 1024) > 10) {
        setErrData((pre: any) => ({ ...pre, [name]: "请上传10M以内的图片" }));
        reject();
      }
      const _URL = window.URL || window.webkitURL;
      const img = new Image();
      img.onerror = function () {
        reject();
      };
      img.onload = function () {
        const valid =
          name === "smallCover"
            ? img.width === img.height && img.width >= 100 && img.height >= 100
            : true;
        valid ? resolve(1) : reject();
      };
      img.src = _URL.createObjectURL(file);
    }).then(
      () => {
        return file;
      },
      () => {
        setErrData((pre: any) => ({
          ...pre,
          [name]: "请上传1:1且不小于100*100的不超过10M的图片",
        }));
        return Promise.reject();
      }
    );
  };
  useEffect(() => {
    if (postId) {
      getDetail(postId).then((res: any) => {
        setFormData(res);
      });
    }
  }, [postId]);
  return (
    <div className="publicPost w1122 pt30">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <TextField
            className="inputTxt"
            required
            fullWidth
            error={Boolean(errData.title)}
            type="search"
            label="标题"
            name="title"
            value={formData.title}
            helperText={errData.title}
            onChange={inputChange}
          />
          <TextField
            error={Boolean(errData.type)}
            helperText={errData.type}
            required
            fullWidth
            label="类型"
            value={formData.type}
            select
            name="type"
            onChange={inputChange}
          >
            {postType.map((item: any) => (
              <MenuItem value={item.id} key={item.id}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
          <div className="editorContainer">
            <FormControl
              error={Boolean(errData.desc)}
              fullWidth
              style={{ height: "100%", position: "relative" }}
            >
              <ReactQuill
                theme="snow"
                className="editor"
                value={formData.desc}
                onChange={(value) =>
                  setFormData((prev: any) => ({ ...prev, desc: value }))
                }
                placeholder="帖子正文"
              />
              <FormHelperText style={{ position: "absolute", bottom: "-20px" }}>
                {errData.desc}
              </FormHelperText>
            </FormControl>
          </div>
        </Grid>
        <Grid className="rightItem" item xs={4}>
          <Card variant="outlined" className="p10">
            <h4>其他配置</h4>
            <p>状态：{postId ? "编辑" : "新建"}</p>
            <div>
              可见性：
              <FormControlLabel
                control={
                  <Checkbox
                    value={pShow}
                    onChange={showHandle}
                    defaultChecked
                  />
                }
                label="公开"
              />
            </div>
            <FormControl
              error={Boolean(errData.smallCover)}
              className="uploadImg"
            >
              封面(小图) ：
              <Button
                variant="text"
                component="label"
                title="请上传1:1且不小于100*100的不超过10M的图片"
              >
                上传
                <input
                  hidden
                  accept="image/*"
                  name="smallCover"
                  multiple
                  type="file"
                  onChange={fileChange}
                />
              </Button>
              <p>
                已上传的图片：
                {formData.smallCover && (
                  <img
                    className="uImg"
                    src={"/upload/" + formData.smallCover}
                    alt=""
                  />
                )}
              </p>
              <FormHelperText>{errData.smallCover}</FormHelperText>
            </FormControl>
            <FormControl error={Boolean(errData.cover)} className="uploadImg">
              封面(大图)：
              <Button
                variant="text"
                component="label"
                title="请上传10M以下的图片"
              >
                上传
                <input
                  hidden
                  accept="image/*"
                  name="cover"
                  multiple
                  type="file"
                  onChange={fileChange}
                />
              </Button>
              <p>
                已上传的图片：
                {formData.cover && (
                  <img
                    className="uImg"
                    src={"/upload/" + formData.cover}
                    alt=""
                  />
                )}
              </p>
              <FormHelperText>{errData.cover}</FormHelperText>
            </FormControl>
            <div className="btns">
              <CardActions>
                {/* {postId == null && (
                  <Button variant="contained">保存草稿箱</Button>
                )} */}
                <Button variant="contained" onClick={submit}>
                  发布
                </Button>
              </CardActions>
            </div>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
