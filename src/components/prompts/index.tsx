import { Key } from "react"
import { dialog } from "../../hooks/dialog"
import { PromptTemplate } from "../../utils/parse-prompts-templates"
import styles from "./index.module.css"

export const Prompts = (props: any) => {
  const prompts = props.prompts as PromptTemplate[];
  return (
    <>
      <h2>Library</h2>
      <div className={styles["container"]}>
        <EmptyPrompt />
        {
          prompts.map((prompt: PromptTemplate, index: Key) => {
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

export const EmptyPrompt = () => {
  const { open } = dialog.useDialog('promptDialog', {
    title: 'Prompt Editor',
  });

  return (
    <div className={styles["prompt"]}>
      <div style={{
        width: '1024px',
        height: '1024px',
        zoom: 0.3,
      }} />
      <h3>Untitled</h3>
      <button onClick={() => {
        open()
      }}>Generate</button>
    </div>
  )
}