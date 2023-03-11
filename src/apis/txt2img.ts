import { SD_APIS } from "../constants/apis";
import { ITxt2Img, ITxt2ImgSuccess } from "../types/txt2img";
import { Requester } from "../utils/request";

export async function Txt2Img(props: ITxt2Img) {
  return Requester<ITxt2ImgSuccess>(SD_APIS.Txt2Img, {
    method: "POST",
    body: JSON.stringify(props),
  })
}