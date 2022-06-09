// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
import { menuClose } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener('DOMContentLoaded', function () {
  const menuCloseArea = document.querySelector('.menu__close');
  if (menuCloseArea) {
    menuCloseArea.addEventListener('click', function (e) {
      menuClose();
    })
  }
})