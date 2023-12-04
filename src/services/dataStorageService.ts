// dataStorageService.ts

import { FormData } from '../app/pages/DataIngestion/DataIngestion'
import { TargetData } from '../app/pages/DataIngestion/TargetingData'

let formData: FormData | null = null;
let targetData: TargetData | null = null; 

export const setFormData = (data: FormData) => {
  formData = data;
};

export const getFormData = () => {
  return formData;
};

export const setTargetData = (data: TargetData) => {
  targetData = data;
};

export const getTargetData = () => {
  return targetData;
};

export const clearData = () => {
  formData = null;
  targetData = null;
};
