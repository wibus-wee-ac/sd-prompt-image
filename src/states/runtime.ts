import { proxy } from "valtio";

export const RuntimeState = proxy<{
  images: string[],
  started: boolean,
}>({
  images: [],
  started: false,
})