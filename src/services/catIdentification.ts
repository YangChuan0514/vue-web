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
        top_num: "1",
        baike_num: "1",
      },
    },
  };
  await axios
    .post(
      "/cat/solution/direct/imagerecognition/combination?access_token=24.e7cb808e83ca6e2ca35bbef91ee3cd95.2592000.1649926910.282335-25769457",
      data
    )
    .then((res) => {
      resList = res;
    });
  return resList;
}
