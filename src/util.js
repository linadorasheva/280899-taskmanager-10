const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);

  return array[randomIndex];
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

// Переводим часы в 2хзначный формат (1 > 01)
const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

// Задаем времени формат am-pm
const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  const interval = date.getHours() > 11 ? `pm` : `am`;

  return `${hours}:${minutes} ${interval}`;
};

export {getRandomArrayItem, getRandomIntegerNumber, formatTime};
