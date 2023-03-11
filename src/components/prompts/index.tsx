import { PromptTemplate, PromptTemplates } from "../../utils/parse-prompts-templates"
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
  return (
    <div className={styles["prompt"]}>
      <img className={styles["image"]} src={props.image} alt={props.name} />
      <h3>{props.name}</h3>
      <button>Use</button>
    </div>
  )
}