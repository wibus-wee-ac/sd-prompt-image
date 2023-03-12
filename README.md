# sd-prompt-image

<div align="center">
<a href="https://sd-prompt-image.vercel.app">
  <img src="https://user-images.githubusercontent.com/62133302/224480927-58a29720-5210-4b82-affb-c0f5bc826d29.png" width="800" alt="preview">
</a>

Click to see the preview ⬆️

</div>

A simple website to generate a image with prompts templates.

Based on [Stable Diffusion](https://github.com/AUTOMATIC1111/stable-diffusion-webui) and [wibus-wee/stable_diffusion_chilloutmix_ipynb](https://github.com/wibus-wee/stable_diffusion_chilloutmix_ipynb)

<pre align="center">
🧪 Working in Progress
</pre>

## Features

Here are some features of this app:

- Remote Prompts Library
- Use RESTFul API to generate a image
- Native dark mode
- Support LoRA Network
- Customizable prompts templates

There are some features that are not yet implemented:

- [ ] Authentication for RESTFul API
- [ ] Choose custom checkpoints
- [ ] Download the generated image

## Usage

If you are using [wibus-wee/stable_diffusion_chilloutmix_ipynb](https://github.com/wibus-wee/stable_diffusion_chilloutmix_ipynb), you should turn the `apiSupport` to `true` in step 3 ( in "Startup Options" section ).

Or you can add `--api --cors-allow-origins "*" --listen` to the command line, and then you can use this website to generate a image with prompts templates.

## About using LoRA

Because there is no way to generate a image with "Addtional Network", so in this app, we will add `<lora:lora_name:lora_weight>` to the end of the prompt to replace the "Addtional Network".

Another thing is that not all users will have the "Additional Network" extentsion pre-installed, We should maintain maximum compatibility.

## Author

sd-prompt-image © Wibus, Released under AGPLv3. Created on Mar 11, 2023

> [Personal Website](http://iucky.cn/) · [Blog](https://blog.iucky.cn/) · GitHub [@wibus-wee](https://github.com/wibus-wee/) · Telegram [@wibus✪](https://t.me/wibus_wee)
