import {render, RenderPosition} from './util.js';

import SiteMenu from './components/site-menu.js';
import Sort from './components/sorting';
import Filter from './components/filter.js';
import Task from './components/task.js';
import TaskEdit from './components/task-edit.js';
import LoadMoreButton from './components/load-more-button.js';
import Board from './components/board.js';

import {generateTasks} from './mock/task.js';
import {generateFilters} from './mock/filter.js';

const TASK_COUNT = 22;
const SHOWING_TASKS_COUNT_ON_START = 8;
const SHOWING_TASKS_COUNT_BY_BUTTON = 8;

const tasks = generateTasks(TASK_COUNT);
const filters = generateFilters();

const renderTask = (task) => {
  const taskComponent = new Task(task);
  const taskEdit = new TaskEdit(task);

  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  editButton.addEventListener(`click`, () => {
    taskListElement.replaceChild(taskEdit.getElement(), taskComponent.getElement());
  });

  const editForm = taskEdit.getElement().querySelector(`form`);
  editForm.addEventListener(`submit`, () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEdit.getElement());
  });

  render(taskListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, new SiteMenu().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new Filter(filters).getElement(), RenderPosition.BEFOREEND);

const boardElement = new Board();
render(siteMainElement, boardElement.getElement(), RenderPosition.BEFOREEND);

const taskListElement = siteMainElement.querySelector(`.board__tasks`);

render(boardElement.getElement(), new Sort().getElement(), RenderPosition.AFTERBEGIN);

let showingTasksCount = SHOWING_TASKS_COUNT_ON_START;
tasks.slice(0, showingTasksCount).forEach((task) => renderTask(task));

const loadMoreButton = new LoadMoreButton();
render(boardElement.getElement(), loadMoreButton.getElement(), RenderPosition.BEFOREEND);


loadMoreButton.getElement().addEventListener(`click`, () => {
  const prevTasksCount = showingTasksCount;
  showingTasksCount = showingTasksCount + SHOWING_TASKS_COUNT_BY_BUTTON;

  tasks.slice(prevTasksCount, showingTasksCount).forEach((task) => render(taskListElement, new Task(task).getElement(), RenderPosition.BEFOREEND));

  if (showingTasksCount >= tasks.length) {
    loadMoreButton.getElement().remove();
    loadMoreButton.removeElement();
  }
});
