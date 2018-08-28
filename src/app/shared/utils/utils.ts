import {isNullOrUndefined} from 'util';


export const courseTypes: Map<string, string> = new Map<string, string>([
  ['COURSE', 'Курс'],
  ['SEMINAR', 'Семінар'],
  ['WEBINAR', 'Вебінар'],
  ['TRAINING', 'Тренінг'],
  ['MASTER_CLASS', 'Майтер клас'],
  ['OTHER', 'Інший'],
]);

export function fromNullOrUndefined(obj: any) {
  if (isNullOrUndefined(obj))
    return '';
  return obj;
}
