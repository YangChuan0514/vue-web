import axios from "axios";
export async function catIdentification(img: String) {
  let resList = null;
  const data = {
    image: img,
    scenes: ["animal"],
    sceneConf: {
      // 可不填写
      advanced_general: {}, // 可不填写
      animal: {
        top_num: "3",
        baike_num: "3",
      },
    },
  };
  await axios
    .post(
      "/cat/solution/direct/imagerecognition/combination?access_token=24.378d325afc9ce5ebe54488d40dcd3871.2592000.1654914597.282335-25769457",
      data
    )
    .then((res) => {
      resList = res;
    });
  return resList;
}
