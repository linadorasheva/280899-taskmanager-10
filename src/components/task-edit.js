import {COLORS, DAYS, MONTH_NAMES} from '../constants';
import {formatTime, createElement} from '../util.js';

const createColorsMarkup = (colors, currentColor) => {
  return colors
    .map((color) => {
      return (
        `<input
          type="radio"
          id="color-${color}-4"
          class="card__color-input card__color-input--${color} visually-hidden"
          name="color"
          value="${color}"
          ${currentColor === color ? `checked` : ``}
        />
        <label
          for="color-${color}-4"
          class="card__color card__color--${color}"
          >${color}</label
        >`
      );
    })
    .join(`\n`);
};

const createHashtags = (tags) => {
  const hashtagMarkup = Array.from(tags).map((tag) =>
    `<span class="card__hashtag-inner">
      <input
        type="hidden"
        name="hashtag"
        value="repeat"
        class="card__hashtag-hidden-input"
      />
      <p class="card__hashtag-name">
        #${tag}
      </p>
      <button type="button" class="card__hashtag-delete">
        delete
      </button>
    </span>`).join(`\n`);

  return hashtagMarkup;
};

const createRepeatingDaysMarkup = (days, repeatingDays) => {
  return days
    .map((day) => {
      const isChecked = repeatingDays[day];
      return (
        `<input
          class="visually-hidden card__repeat-day-input"
          type="checkbox"
          id="repeat-${day}-4"
          name="repeat"
          value="${day}"
          ${isChecked ? `checked` : ``}
        />
        <label class="card__repeat-day" for="repeat-${day}-4"
          >${day}</label
        >`
      );
    })
    .join(`\n`);
};

const createTaskEditTemplate = (task) => {
  const {description, tags, dueDate, repeatingDays, color} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;

  const isDate = isDateShowing ? `YES` : `NO`;
  const isRepeat = Object.values(repeatingDays).some(Boolean) ? `YES` : `NO`;

  const deadlineClass = isExpired ? `card--deadline` : ``;
  const repeatClass = Object.values(repeatingDays).some(Boolean) ? `card--repeat` : ``;

  const colorsMarkup = createColorsMarkup(COLORS, color);
  const hashtagsMarkup = createHashtags(tags);
  const repeatingDaysMarkup = createRepeatingDaysMarkup(DAYS, repeatingDays);

  return `<article class="card card--edit card--${color} ${repeatClass} ${deadlineClass}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites card__btn--disabled"
          >
            favorites
          </button>
        </div>
        <div class="card__color-bar">
          <svg class="card__color-bar-wave" width="100%" height="10">
            <use xlink:href="#wave"></use>
          </svg>
        </div>
        <div class="card__textarea-wrap">
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${description}</textarea>
          </label>
        </div>
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${isDate}</span>
              </button>
              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${date} ${time}"
                  />
                </label>
              </fieldset>
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${isRepeat}</span>
              </button>
              <fieldset class="card__repeat-days">
                <div class="card__repeat-days-inner">
                ${repeatingDaysMarkup}
                </div>
              </fieldset>
            </div>
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${hashtagsMarkup}
              </div>
              <label>
                <input
                  type="text"
                  class="card__hashtag-input"
                  name="hashtag-input"
                  placeholder="Type new hashtag here"
                />
              </label>
            </div>
          </div>
          <div class="card__colors-inner">
            <h3 class="card__colors-title">Color</h3>
            <div class="card__colors-wrap">
            ${colorsMarkup}
            </div>
          </div>
        </div>
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>
  </article>`;
};

export default class TaskEdit {
  constructor(task) {
    this._task = task;
    this._element = null;
  }

  getTemplate() {
    return createTaskEditTemplate(this._task);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
