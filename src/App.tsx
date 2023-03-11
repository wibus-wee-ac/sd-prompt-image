import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import styles from './App.module.css'
import Endpoint from './components/endpoint'
import { parsePromptsTemplate, PromptTemplates } from './utils/parse-prompts-templates'
import { Prompts } from './components/prompts'

function App() {

  const [prompts, setPrompts] = useState<PromptTemplates>({
    SFW: [],
    NSFW: [],
  })
  useEffect(() => {
    parsePromptsTemplate().then((res) => {
      setPrompts(res)
    })
  },[])

  return (
    <div>
      <div className={styles["header"]}>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className={styles["logo"]} alt="React logo" />
        </a>
        <h1>Stable Diffusion Generator</h1>
      </div>
      <Endpoint />
      <Prompts {...prompts} />
    </div>
  )
}

export default App
