import { AnyObject } from "../types/anyObject";

export function generateLoraPrompt(props: AnyObject){
  if (!props) return '';
  const addNetModels = Object.keys(props).filter(key => key.includes('AddNet Model'));
  const addNetWeights = Object.keys(props).filter(key => key.includes('AddNet Weight'));
  const addNetModules = Object.keys(props).filter(key => key.includes('AddNet Module'));
  return addNetModels.map((model, index) => {
    const weight = addNetWeights[index];
    const module = addNetModules[index];
    return `<${props[module].toLowerCase()}:${props[model].split('(')[0]}:${props[weight] || 1}>`;
  }).join(',');
}