/* Маски для полей (в работе) */

// Подключение функционала "Чертогов Фрилансера"
// Подключение списка активных модулей
import { flsModules } from "../modules.js";

// Подключение модуля
import "inputmask/dist/inputmask.min.js";

export function inputmaskInit() {
	const inputMasks = document.querySelectorAll('[data-inputmask]');
	if (inputMasks.length) {
		flsModules.inputmask = Inputmask().mask(inputMasks);
	}
}
inputmaskInit();
