import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSnapshot } from 'valtio';
import { Txt2Img } from '../../apis/txt2img';
import { SD_APIS } from '../../constants/apis';
import { dialog } from '../../hooks/dialog';
import { AppState } from '../../states/app';
import { RuntimeState } from '../../states/runtime';
import { ITxt2Img } from '../../types/txt2img';
import { generateLoraPrompt } from '../../utils/generateLora';
import { PromptTemplate } from '../../utils/parse-prompts-templates';
import { Requester } from '../../utils/request';
import styles from "./index.module.css"

interface IPrompts extends ITxt2Img {
  otherNetworks?: string
}

const PromptDialog = () => {
  const snap = useSnapshot(AppState)
  const RuntimeSnap = useSnapshot(RuntimeState)
  const { isOpen, handleClose, props: _props } =
    dialog.useDialogController('promptDialog');
  const props = _props.prompt_template as PromptTemplate
  const [prompts, setPrompts] = useState<IPrompts | null>(null)

  useEffect(() => {
    setPrompts({
      prompt: `${props.prompts}`,
      otherNetworks: props.otherNetworks,
      negative_prompt: props.negativePrompts,
      steps: Number(props.others?.Steps) | 31,
      cfg_scale: Number(props.others?.["CFG scale"]) || 7,
      width: 512,
      height: 512,
      sampler_name: (snap.samplers.find((sampler) => sampler.name === props.others?.Sampler)?.name || snap.samplers[0]?.name) as any,
      restore_faces: false
    })
  }, [props])

  const handleGenerate = () => {
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
      ...prompts,
      prompt: `${prompts?.otherNetworks || ''},${prompts?.prompt}`
    }).then((res) => {
      RuntimeState.images = [...RuntimeSnap.images, ...res.images]
      clearInterval(progress)
    })
    handleClose();
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className={styles["dialog"]} onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={styles["bg"]} />
        </Transition.Child>

        <div className={styles["container"]}>
          <div className={styles["containerInner"]}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={styles["panel"]}>
                <Dialog.Title
                  as="h3"
                  className={styles["title"]}
                >
                  {_props.title}
                </Dialog.Title>
                <div className={styles["inner"]}>

                  <div className={styles["content"]}>
                    <p>
                      {_props.content}
                    </p>
                  </div>

                  <div>
                    <div className={styles["form"]}>
                      <h4>Prompt</h4>
                      <textarea
                        defaultValue={`${props.prompts}`}
                        style={{ width: "23rem", height: "7rem", }}
                        onChange={(e) => { setPrompts({ ...prompts, prompt: e.target.value }) }}
                      />
                    </div>
                    <div className={styles["form"]}>
                      <h4>Negative Prompt</h4>
                      <textarea
                        defaultValue={props.negativePrompts}
                        style={{ width: "23rem", height: "7rem", }}
                        onChange={(e) => { setPrompts({ ...prompts, negative_prompt: e.target.value }) }}
                      />
                    </div>
                    <div className={styles["form"]}>
                      <h4>CFG Scale</h4>
                      <input
                        defaultValue={props.others?.["CFG scale"]}
                        onChange={(e) => { setPrompts({ ...prompts, cfg_scale: Number(e.target.value) }) }}
                      />
                    </div>
                    <div className={styles["form"]}>
                      <h4>Other Networks</h4>
                      <textarea
                        defaultValue={props.otherNetworks}
                        style={{ width: "23rem", height: "3rem", }}
                        onChange={(e) => { setPrompts({ ...prompts, otherNetworks: e.target.value }) }}
                      />
                    </div>
                    <div className={styles["form"]}>
                      <h4>Steps</h4>
                      <input
                        defaultValue={props.others?.Steps}
                        onChange={(e) => { setPrompts({ ...prompts, steps: Number(e.target.value) }) }}
                      />
                    </div>
                    <div className={styles["form"]}>
                      <h4>Size ( width, height )</h4>
                      <input
                        defaultValue={"512,512"}
                        onChange={(e) => {
                          const [width, height] = e.target.value.split(',')
                          setPrompts({ ...prompts, width: Number(width), height: Number(height) })
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: "1rem", }}>
                  <button
                    onClick={handleGenerate}
                    type="button"
                    className={styles["generate"]}
                  >Generate</button>
                </div>

              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PromptDialog;