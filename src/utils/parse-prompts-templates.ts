import { ofetch } from "ofetch";
import MarkdownIt from "markdown-it";
import { AnyObject } from "../types/anyObject";
import { generateLoraPrompt } from "./generateLora";

export interface PromptTemplate {
  name: string;
  type: string;
  image?: string;
  prompts: string;
  negativePrompts: string;
  others: {
    [key: string]: string;
  };
  otherNetworks?: string;
}

export interface PromptTemplates {
  SFW: PromptTemplate[];
  NSFW: PromptTemplate[];
}

const markdown = `
## [SFW] Cat ears + Blue eyes

<details>
  <summary> <h3>Demo 案例</h3> </summary>
  <img width="350" src="https://user-images.githubusercontent.com/62133302/219844710-25e94a0a-ad84-40b4-b5b7-703c03433b96.png">
</details>

### Prompts 提示标签

\`\`\`
best quality, ultra high res, (photorealistic:1.4), 1 white child, (ulzzang-6500:1.0), smiling, (PureErosFace_V1:1.0), ((detailed facial features)), alluring blue eyes, photographed on a Canon EOS R5, 50mm lens, F/2.8, HDR, 8k resolution, ulzzang-6500, (kpop idol), aegyo sal, from side, looking at camera, cat ears, sports bra,
\`\`\`

### Negative prompts 反向提示标签

\`\`\`
paintings, sketches, (worst quality:2), (low quality:2), (normal quality:2), lowres, normal quality, ((monochrome)), ((grayscale)), skin spots, acnes, skin blemishes, age spot, glans
\`\`\`

### Others 其他

- Steps: 25
- Sampler: DPM++ 2M Karras
- CFG scale: 7
- Size: 512x512
- Model: chilloutmix
- AddNet Enabled: True
- AddNet Module 1: LoRA, AddNet Model 1: koreanDollLikeness_v10(e2e472c06607), AddNet Weight A 1: 0.5, AddNet Weight B 1: 0.5,
- AddNet Module 2: LoRA, AddNet Model 2: stLouisLuxuriousWheels_v1(034b97419349), AddNet Weight A 2: 1, AddNet Weight B 2: 1
`;

export async function parsePromptsTemplate() {
  const md = new MarkdownIt();
  const markdown = await ofetch<string>(
    "https://raw.githubusercontent.com/wibus-wee/stable_diffusion_chilloutmix_ipynb/main/prompts.md"
  );
  const tokens = md.parse(markdown, {});

  let result: PromptTemplates = {
    SFW: [],
    NSFW: [],
  };
  for (let i = 0; i < tokens.length; i++) {
    let name = "";
    let type: keyof PromptTemplates = "SFW";
    let image: string | undefined = undefined;
    let prompts = "";
    let negativePrompts = "";
    let others: AnyObject = {};

    let over = false;
    const token = tokens[i];
    // console.log(i, token);

    if (token.type === "inline") {

      if (token.content.includes("SFW]")) {
        name = token.content.split("]")[1].trim();
        type = "SFW";
      }

      if (token.content.includes("NSFW]")) {
        name = token.content.split("]")[1].trim();
        type = "NSFW";
      }

      if (name) result[type].push({ name, type, image, prompts, negativePrompts, others });

      if (token.content.includes("Demo")) {
        image =
          token.children?.[4].content.match(/src="(.+?)"/)?.[1];
        result[type][result[type].length - 1].image = image;
      }

      if (token.children?.[0].content === "Prompts 提示标签") {
        prompts = tokens[i + 2]?.content;
        result[type][result[type].length - 1].prompts = prompts;
      }

      if (token.children?.[0].content === "Negative prompts 反向提示标签") {
        negativePrompts = tokens[i + 2]?.content;
        result[type][result[type].length - 1].negativePrompts = negativePrompts;
      }

      if (token.children?.[0].content === "Others 其他") {
        for (let j = i + 1; j < tokens.length; j++) {
          if (tokens[j].type === "heading_open" && tokens[j].tag === "h2") {
            break;
          }
          if (tokens[j].type === "inline") {
            const key = tokens[j].content.split(":")[0];
            const value =
              tokens[j].content.split(":").length === 2
                ? tokens[j].content.split(":")[1]
                : "MORE";
            if (value === "MORE") {
              const keys = tokens[j].content.split(",");
              for (let k = 0; k < keys.length; k++) {
                const key = keys[k].split(":")[0].trim();
                const value = keys[k].split(":")[1]?.trim();
                if (key && value) {
                  others[key] = value.trim();
                }
              }
            }
            if (key && value && value !== "MORE") {
              others[key.trim()] = value.trim();
            }
          }
        }
        result[type][result[type].length - 1].others = others;
        result[type][result[type].length - 1].otherNetworks = generateLoraPrompt(others);
      }
    }
  }
  return result;
}
