import * as util from '../util.js';
import {COLORS} from '../constants.js';

const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];

const getDate = () => {
  const date = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * util.getRandomIntegerNumber(0, 7);
  date.setDate(date.getDate() + diffValue);

  return date;
};

const DefaultRepeatingDays = {
  'mo': false,
  'tu': false,
  'we': false,
  'th': false,
  'fr': false,
  'sa': false,
  'su': false,
};

const generateRepeatingDays = () => {
  return Object.assign({}, DefaultRepeatingDays, {
    'mo': Math.random() > 0.5,
    'tu': Math.random() > 0.5,
    'we': Math.random() > 0.5,
    'th': Math.random() > 0.5,
    'fr': Math.random() > 0.5,
    'sa': Math.random() > 0.5,
    'su': Math.random() > 0.5
  });
};

const Tags = [`theory`, `homework`, `practice`, `intensive`, `keks`, `work`];

const generateTags = (tags) => {
  return tags.filter(() => Math.random() > 0.5).slice(0, 3);
};


const generateTask = () => {
  const dueDate = Math.random() > 0.5 ? getDate() : null;

  return {
    description: util.getRandomArrayItem(descriptions),
    dueDate,
    repeatingDays: dueDate ? DefaultRepeatingDays : generateRepeatingDays(),
    tags: new Set(generateTags(Tags)),
    color: util.getRandomArrayItem(COLORS),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

const generateTasks = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateTask);
};

export {generateTask, generateTasks};
