export interface ITxt2Img {
  enable_hr: boolean;
  denoising_strength: number;
  firstphase_width: number;
  firstphase_height: number;
  hr_scale: number;
  hr_upscaler: string;
  hr_second_pass_steps: number;
  hr_resize_x: number;
  hr_resize_y: number;

  prompt: string;
  negative_prompt: string;
  steps: number;
  cfg_scale: number;
  width: number;
  height: number;
  restore_faces: boolean;
  sampler_index: SamplerName;
  sampler_name: SamplerName;

  styles: Array<string>;
  seed: number | -1;
  subseed: number | -1;
  subseed_strength: number;
  seed_resize_from_h: number | -1;
  seed_resize_from_w: number | -1;
  batch_size: number;
  n_iter: number;
  tiling: boolean;
  eta: number;
  s_churn: number;
  s_tmax: number;
  s_tmin: number;
  s_noise: 1;
  override_settings: object;
  override_settings_restore_afterwards: true;
  script_args: Array<any>;
  script_name: string;
}

enum SamplerName {
  Euler = "Euler",
  Euler_A = "Euler a",
  LMS = "LMS",
  Heun = "Heun",
  DPM2 = "DPM2",
  DPM2_A = "DPM2 a",
  DPM__2S_A = "DPM++ 2S a",
  DPM__2M = "DPM++ 2M",
  DPM__SDE = "DPM++ SDE",
  DPM_Fast = "DPM Fast",
  DPM_Adaptive = "DPM Adaptive",
  LMS_Karras = "LMS Karras",
  DPM2_Karras = "DPM2 Karras",
  DPM2_A_Karras = "DPM2 a Karras",
  DPM__2S_A_Karras = "DPM++ 2S a Karras",
  DPM__2M_Karras = "DPM++ 2M Karras",
  DPM__SDE_Karras = "DPM++ SDE Karras",
  DDIM = "DDIM",
  PLMS = "PLMS",
}
