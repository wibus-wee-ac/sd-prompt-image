import { ofetch } from "ofetch";
import { toast } from "sonner";

export const Requester = ofetch.create({
  baseURL: localStorage.getItem("endpoint") || "http://localhost:7860",
  onResponseError: (err) => {
    toast.error(JSON.stringify(err.response._data.detail))
  },
})