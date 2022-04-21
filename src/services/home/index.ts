// 秘籍
import axios from "axios";
//查询秘籍
export async function catCheatDataFindAll(obj) {
  return await axios.post("/api/catCheatDataFindAll", obj);
}

//模糊搜索秘籍
export async function catCheatDataFind(obj: { search: string }) {
  return await axios.post("/api/catCheatDataFind", obj);
}
// 查询宠酱百科
export async function catDataFindAll(obj) {
  return await axios.post("/api/catDataFindAll", obj);
}
// 模糊搜索宠酱名称
export async function catDataFind(obj: { search: string }) {
    return await axios.post("/api/catDataFind", obj);
  }
