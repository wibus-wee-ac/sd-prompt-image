import { useEffect } from "react"
import { toast } from "sonner"
import { useSnapshot } from "valtio"
import { Txt2Img } from "../../apis/txt2img"
import { SD_APIS } from "../../constants/apis"
import { dialog } from "../../hooks/dialog"
import { AppState } from "../../states/app"
import { RuntimeState } from "../../states/runtime"
import { generateLoraPrompt } from "../../utils/generateLora"
import { PromptTemplate, PromptTemplates } from "../../utils/parse-prompts-templates"
import { Requester } from "../../utils/request"
import styles from "./index.module.css"

export const Prompts = (props: PromptTemplates) => {
  return (
    <>
      <h2>SFW</h2>
      <div className={styles["container"]}>
        {
          props.SFW.map((prompt, index) => {
            return (
              <Prompt {...prompt} key={index} />
            )
          })
        }
      </div>
      <h2>NSFW</h2>
      <div className={styles["container"]}>
        {
          props.NSFW.map((prompt, index) => {
            return (
              <Prompt {...prompt} key={index} />
            )
          })
        }
      </div>
    </>
  )
}

export const Prompt = (props: PromptTemplate) => {

  const { open } = dialog.useDialog('promptDialog', {
    title: 'Prompt Editor',
    prompt_template: props
  });

  return (
    <div className={styles["prompt"]}>
      <img className={styles["image"]} src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <button onClick={() => {
        open()
      }}>Generate</button>
    </div>
  )
}