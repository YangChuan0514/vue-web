import { upLoadServer } from "../services/upLoad";
import * as qiniu from "qiniu-js";
export async function uploadImg(event: any) {
  const res = await upLoadServer();
  const token = res.data;
  let putExtra = {
    fname: event.name,
    params: {},
    mimeType: ["image/png", "image/jpeg", "image/jpg", "image/gif", "video/*"],
  };
  let observe = {
    next(res) {},
    error(err) {},
    complete(res) {},
  };
  let config = {
    useCdnDomain: true,
  };
  const imgUrl =
    "pageapi_" + new Date().valueOf() + event.name.replace(/.*\./, ".");
  let observable = qiniu.upload(event, imgUrl, token, putExtra, config);
  observable.subscribe(observe);
  return "http://r8cqgsg5u.hb-bkt.clouddn.com/" + imgUrl;
}
export async function uploadFileVideo(event: any) {
  const res = await upLoadServer();
  const token = res.data;
  // 上传时的配置
  var config = {
    useCdnDomain: true,
  };
  //  设置文件的配置
  var putExtra = {
    fname: "",
    params: {},
    mimeType: null,
  };
  const videoUrl =
    "pageapi_" + new Date().valueOf() + event.name.replace(/.*\./, ".");

  //   实例化七牛云的上传实例
  var observable = qiniu.upload(event, videoUrl, token, putExtra, config);
  //   设置实例的监听对象
  var observer = {
    //   接收上传进度信息
    next(res) {},
    // 接收上传错误信息
    error(err) {},
    // 接收上传完成后的信息
    complete(res) {},
  };
  // 上传开始
  var subscription = observable.subscribe(observer);
  return "http://r8cqgsg5u.hb-bkt.clouddn.com/" + videoUrl;
}

export function onTime(val: number) {
  const lagTime = Date.now() - val * 1000;
  const s = 1000;
  const m = 60 * s;
  const hour = 60 * m;
  const day = 24 * hour;
  const yue = 30 * day;
  const year = yue * 12;
  if (lagTime < s) {
    return "1秒前";
  } else if (lagTime < m) {
    return parseInt(String(lagTime / s), 10) + "秒前";
  } else if (lagTime < hour) {
    return parseInt(String(lagTime / m), 10) + "分钟前";
  } else if (lagTime < day) {
    return parseInt(String(lagTime / hour), 10) + "小时前";
  } else if (lagTime < yue) {
    return parseInt(String(lagTime / day), 10) + "天前";
  } else if (lagTime < year) {
    return parseInt(String(lagTime / yue), 10) + "月前";
  } else {
    return parseInt(String(lagTime / year), 10) + "年前";
  }
}
