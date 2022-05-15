<template>
  <div class="main">
    <div class="qr-scanner">
      <div class="box">
        <div class="line" v-if="isShowLine"></div>
        <van-image :src="image" class="image-type" />
        <div class="angle"></div>
      </div>
    </div>
    <div class="upLoad-img">
      <van-uploader @change="getFile($event)" accept="image/*" class="upLoad">
        <van-button class="cat-btn">上传照片</van-button>
      </van-uploader>
    </div>
    <template v-for="(item, index) in identificationList" :key="item.score">
      <div class="cat-content" @click="particulars(index)">
        <template v-if="image">
          <img width="100" height="100" :src="image" class="image-content" />
        </template>
        <div>
          <p class="cat-name">猫咪学名:{{ item.name }}</p>
          <p class="cat-precision">
            准确度:{{ Number(item.score).toFixed(2) * 100 }}%
          </p>
        </div>
      </div>
    </template>
    <van-popup
      v-model:show="show"
      teleport="body"
      :style="{ height: '70%', width: '70%' }"
      closeable
      round
    >
      <div class="ident-content">
        <div class="image-ident-content">
          <img width="100" height="100" :src="image" />
        </div>
        <div>
          <p class="cat-ident-name">
            {{ identificationList[doalogNum].name }}
          </p>
          <p class="cat-precision">
            详情:{{ identificationList[doalogNum].baike_info.description }}
          </p>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script lang="ts" setup>
import { catIdentification } from "../../services/catIdentification";
import { ref, reactive } from "vue";
import { Toast } from "vant";
const image = ref(
  "data:image/jpeg;base64,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"
);
const fileList = ref([]);
const isShowLine = ref(true);
const identificationList = ref([
  {
    score: "0.970925",
    name: "苏格兰折耳猫",
    baike_info: {
      baike_url:
        "http://baike.baidu.com/item/%E8%8B%8F%E6%A0%BC%E5%85%B0%E6%8A%98%E8%80%B3%E7%8C%AB/303337",
      image_url:
        "https://bkimg.cdn.bcebos.com/pic/a2cc7cd98d1001e96eeb3b9fb20e7bec55e7974e",
      description:
        "苏格兰折耳猫(学名：Felis silvestris catus，英文名：Scottish Fold)是猫的一种在耳朵有基因突变的猫种。由于这猫种最初在苏格兰发现，所以以它的发现地和身体特征而命名。这种猫在软骨部份有一个折，使耳朵向前屈折，并指向头的前方。也正因如此，这种猫患有先天骨科疾病，时常用坐立的姿势来缓解痛苦。它乐意与人为伴，并用它特有的这种安宁的方式来表达。",
    },
  },
]);
const getFile = (event: any) => {
  isShowLine.value = true;
  let file = event.target.files[0];
  let param = new FormData(); //创建form对象
  param.append("file", file, file.name); //通过append向form对象添加数据
  const blobToBase64 = (blob, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      callback(reader.result);
    });
    reader.readAsDataURL(blob);
  };
  blobToBase64(file, (base64Img: string) => {
    image.value = base64Img;
    identification(base64Img);
  });
};
const identification = async (val: string) => {
  const res = await catIdentification(val);
  identificationList.value = res?.data?.result?.animal?.result;
  if (!identificationList.value) {
    Toast.fail("照片识别不是宠酱猫咪");
    return;
  }
  isShowLine.value = false;
};
const show = ref(false);
const doalogNum = ref(0);
const particulars = (val: number) => {
  doalogNum.value = val;
  show.value = true;
};
</script>
<style lang="scss" scoped>
.upLoad-img {
  .upLoad {
    position: absolute;
    top: calc(15% + 130px);
    left: calc(50% - 50px);
  }
  .cat-btn {
    border: none;
    text-align: center;
    color: #fff;
    background: #fed746;

    width: 100px;
    height: 40px;
  }
}
.ident-content {
  width: 98%;
  margin: 10px auto;
  .image-ident-content,
  .cat-ident-name {
    text-align: center;
  }
}
.qr-scanner {
  background-image: linear-gradient(
      0deg,
      transparent 24%,
      rgba(32, 255, 77, 0.1) 25%,
      rgba(32, 255, 77, 0.1) 26%,
      transparent 27%,
      transparent 74%,
      rgba(32, 255, 77, 0.1) 75%,
      rgba(32, 255, 77, 0.1) 76%,
      transparent 77%,
      transparent
    ),
    linear-gradient(
      90deg,
      transparent 24%,
      rgba(32, 255, 77, 0.1) 25%,
      rgba(32, 255, 77, 0.1) 26%,
      transparent 27%,
      transparent 74%,
      rgba(32, 255, 77, 0.1) 75%,
      rgba(32, 255, 77, 0.1) 76%,
      transparent 77%,
      transparent
    );
  background-size: 3rem 3rem;
  background-position: -1rem -1rem;
  position: relative;
  padding: 100px 0px;
  background-color: #736262;
}
.qr-scanner .box {
  width: 30vw;
  height: 30vw;
  position: relative;
  overflow: hidden;
  border: 0.1rem solid rgba(0, 255, 51, 0.2);
  margin: auto;
}

.qr-scanner .line {
  position: relative;
  z-index: 1;
  height: calc(100% - 2px);
  width: 100%;
  background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
  border-bottom: 3px solid #00ff33;
  transform: translateY(-100%);
  animation: radar-beam 2s infinite;
  animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
  animation-delay: 1.4s;
}

.qr-scanner .box:after,
.qr-scanner .box:before,
.qr-scanner .angle:after,
.qr-scanner .angle:before {
  z-index: 1;
  content: "";
  display: block;
  position: absolute;
  width: 3vw;
  height: 3vw;

  border: 0.2rem solid transparent;
}

.qr-scanner .box:after,
.qr-scanner .box:before {
  top: 0;
  border-top-color: #00ff33;
}

.qr-scanner .angle:after,
.qr-scanner .angle:before {
  bottom: 0;
  border-bottom-color: #00ff33;
}

.qr-scanner .box:before,
.qr-scanner .angle:before {
  left: 0;
  border-left-color: #00ff33;
}

.qr-scanner .box:after,
.qr-scanner .angle:after {
  right: 0;
  border-right-color: #00ff33;
}

@keyframes radar-beam {
  0% {
    transform: translateY(-100%);
  }

  100% {
    transform: translateY(0);
  }
}
.image-type {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0px;
}
.cat-content {
  background: #fff;
  width: 96%;
  margin: 10px auto;
  border-radius: 10px;
  display: flex;
}
.main {
  background: #fffeed;
  width: 100%;
  min-height: 100vh;
}
.image-content {
  border-radius: 10px;
  margin-right: 30px;
}
.cat-name {
  font-size: 14px;
  font-weight: 600;
}
.cat-precision {
  margin-top: 20px;
  font-size: 14px;
}
</style>
