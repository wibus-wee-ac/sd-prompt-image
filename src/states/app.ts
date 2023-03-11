import { proxy } from "valtio";
import { AnyObject } from "../types/anyObject";

export const AppState = proxy<{
  samplers: [
    {
      name: string,
      aliases: string[],
      options: any
    }
  ] | [],
  options: AnyObject,
}>({
  samplers: [],
  options: {},
})