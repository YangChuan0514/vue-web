import axios from "axios";
export async function complaintMessageFindAll(obj: any) {
  console.log(obj);
  return axios.post("/api/complaintMessageFindAll", obj);
}
