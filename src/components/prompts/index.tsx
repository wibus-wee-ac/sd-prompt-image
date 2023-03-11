import { useEffect } from "react"
import { toast } from "sonner"
import { useSnapshot } from "valtio"
import { Txt2Img } from "../../apis/txt2img"
import { SD_APIS } from "../../constants/apis"
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
  const snap = useSnapshot(AppState)
  const RuntimeSnap = useSnapshot(RuntimeState)
  return (
    <div className={styles["prompt"]}>
      <img className={styles["image"]} src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <button onClick={() => {
        toast('Image is generating...')
        RuntimeState.started = true
        const progress = setInterval(() => {
          Requester(SD_APIS.GetProgress).then((res) => {
            toast(`Progress: ${(Number(res.progress) * 100).toFixed(2)}%`, {
              action: {
                label: 'Skip',
                onClick: () => {
                  Requester(SD_APIS.Skip, {
                    method: 'POST'
                  })
                }
              },
            })
          })
        }, 3000)
        Txt2Img({
          prompt: `${props.prompts}, ${generateLoraPrompt(props.others)}`,
          negative_prompt: props.negativePrompts,
          steps: Number(props.others.Steps) | 31,
          cfg_scale: Number(props.others["CFG Scale"]) || 7,
          width: 512,
          height: 512,
          sampler_name: (snap.samplers.find((sampler) => sampler.name === props.others.Sampler)?.name || snap.samplers[0]?.name) as any,
          restore_faces: false
        }).then((res) => {
          RuntimeState.images = [...RuntimeSnap.images, ...res.images]
          clearInterval(progress)
        })
      }}>Generate</button>
    </div>
  )
}