// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
import { menuClose } from "./functions.js";
import { bodyLockToggle } from "./functions.js";
import { _slideUp } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";
import "../libs/datepicker-full.min.js";
import { initJalendar } from './jalendar_init.js';
import Calendar from 'tui-calendar'; /* ES6 */
import "tui-calendar/dist/tui-calendar.css";
import { inputmaskInit } from "./forms/inputmask.js";
import { SelectConstructorInit } from '../libs/select.js'
import { formRating } from "./forms/forms.js";

// If you use the default popups, use this.
import 'tui-date-picker/dist/tui-date-picker.css';
import 'tui-time-picker/dist/tui-time-picker.css';



document.addEventListener('DOMContentLoaded', function () {
  const menuCloseArea = document.querySelector('.menu__close');
  if (menuCloseArea) {
    menuCloseArea.addEventListener('click', function (e) {
      menuClose();
    })
  }
  const datePickers = document.querySelectorAll('[data-datepicker]');
  if (datePickers.length) {
    customDatePickerInit(datePickers);
  }
  
  const eventSettingsInputs = document.querySelectorAll('.item-settingsEvent__input');
  if (eventSettingsInputs.length) {
    eventSettingsInputs.forEach(eventSettingsInput => {
      if (eventSettingsInput.classList.contains('item-settingsEvent__input_color')) {
        eventSettingsInput.addEventListener('input', (e) => {
          let eventSettingsInputValue = eventSettingsInput.value;
          eventSettingsInput.parentElement.querySelector('input[type="text"]').value = eventSettingsInputValue;
        })
      } else if (eventSettingsInput.getAttribute('type') === 'text') {
        let eventSettingsColorInput = eventSettingsInput.closest('.item-settingsEvent__body').querySelector('.item-settingsEvent__input_color');
        eventSettingsInput.addEventListener('focus', () => {
          eventSettingsColorInput.click();
          if (eventSettingsInput.value.length >= 6) {
            if (eventSettingsInput.value[0] === '#') {
              eventSettingsColorInput.value = eventSettingsInput.value;
            } else {
              eventSettingsColorInput.value = `#${eventSettingsInput.value}`;
            }
          }
        })
        eventSettingsInput.addEventListener('change', () => {
          if (eventSettingsInput.value.length >= 6) {
            if (eventSettingsInput.value[0] === '#') {
              eventSettingsColorInput.value = eventSettingsInput.value;
            } else {
              eventSettingsColorInput.value = `#${eventSettingsInput.value}`;
            }
          }
        })
      }
    })
  }
  
  const tabsEvents = document.querySelector('.tabs-events') || document.querySelector('.table-participants');
  if (tabsEvents) {
    eventsBodiesHeight(tabsEvents);
    window.addEventListener('resize', () => {
      eventsBodiesHeight(tabsEvents);
    })
  }

  if (document.querySelector('#editor')) {
    ClassicEditor
      .create(document.querySelector('#editor'), {
  
          /*Настройки для загрузки изображений, подробнее на https://ckeditor.com/docs/cs/latest/guides/easy-image/quick-start.html*/ 
          
          //   cloudServices: {
          //     tokenUrl: 'https://example.com/cs-token-endpoint',
          //     uploadUrl: 'https://your-organization-id.cke-cs.com/easyimage/upload/'
          // }
        })
        .catch( error => {
            console.error( error );
        } );
  }

  const pictureFileInputs = document.querySelectorAll('[data-file]');
  if (pictureFileInputs.length) {
    picturePreviewRender(pictureFileInputs);
  }

  const streamsSection = document.querySelector('section.streams');
  if (streamsSection) {
    streamsActions();
  }


  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('item-addevents__link')) {
      e.preventDefault();
      addInputLinksActions(e.target);
    }
  })

  const eventRegSels = document.querySelectorAll('.row-event__select');
  if (eventRegSels.length) {
    eventRegActions(eventRegSels);
    eventHeadBtnsListener();
    let rowEventTemplate = document.querySelector('.row-event').innerHTML;
    document.querySelector('.fields-event__add').addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.fields-event__body').insertAdjacentHTML('beforeend', `
      <div class="fields-event__row row-event">
        ${rowEventTemplate}
      </div>
      `);
      const eventRegSels = document.querySelectorAll('.row-event__select');
      eventRegActions(eventRegSels);
      SelectConstructorInit();
      eventHeadBtnsListener();
    })
  }

  const getEventJsButton = document.querySelector('.getEventJsPopup__copy');
  if (getEventJsButton) {
    getEventJsButton.addEventListener('click', () => {
      let copyTarget = document.querySelector('.getEventJsPopup__textarea');
      copyTarget.select();
      document.execCommand("copy");
      document.querySelector('.getEventJsPopup__success').classList.remove('_hide');
    })
  }

  const pollsLines = document.querySelectorAll('.lines-polls__body span');
  if (pollsLines.length) {
    setTimeout(() => {
      pollsLines.forEach(e => {
        e.classList.add('_show')
      })
    }, 200);
  }

  const chats = document.querySelectorAll('.tabs-chat__content');
  if (chats.length) {
    chats.forEach(chat => {
      chat.addEventListener('click', (e) => {
        if (e.target.classList.contains('main-chat__sideopen') || e.target.closest('.main-chat__sideopen')) {
          document.documentElement.classList.add('sidebar-open');
        } else if (e.target.classList.contains('sidebar-chat__close')) {
          document.documentElement.classList.remove('sidebar-open');
        }
      })
      const chatInput = chat.querySelector('.form-chat__input');
      if (chatInput) {
        const chatSmiles = chat.querySelectorAll('.smiles-chat__smile');
        chatSmiles.forEach(chatSmile => {
          chatSmile.addEventListener('click', (e) => {
            chatInput.value += chatSmile.textContent;
          })
        })
      }
    })
    const chatMains = document.querySelectorAll('.body-chat');
    if (chatMains.length) {
      chatMains.forEach(chatMain => {
        if (chatMain.offsetHeight > 68) {
          chatMain.querySelector('.messages-chat[data-simplebar]').style = `max-height:${chatMain.offsetHeight - 68 - 75}px`;
          window.addEventListener('resize', () => {
            chatMain.querySelector('.messages-chat[data-simplebar]').style = `max-height:${chatMain.offsetHeight - 68 - 75}px`;
          })
        }
      })
    }
    document.addEventListener('click', () => {
      setTimeout(() => {
        const chatMains = document.querySelectorAll('.body-chat');
        if (chatMains.length) {
          chatMains.forEach(chatMain => {
            if (chatMain.offsetHeight > 68) {
              chatMain.querySelector('.messages-chat[data-simplebar]').style = `max-height:${chatMain.offsetHeight - 68 - 75}px`;
              window.addEventListener('resize', () => {
                chatMain.querySelector('.messages-chat[data-simplebar]').style = `max-height:${chatMain.offsetHeight - 68 - 75}px`;
              })
            }
          })
        }
      }, 50);
    })
  }

  const staticsticSection = document.querySelector('section.statistic');
  if (staticsticSection) {
    statisticActions(staticsticSection);
  }
  const statisticTables = document.querySelectorAll('.table-statistic__body');
  if (statisticTables.length) {
    statisticTables.forEach(statisticTable => {
      let statisticColWidthEl = statisticTable.style.maxWidth;
      let statisticColWidth;
      if (statisticColWidthEl === '') {
        statisticColWidth = parseInt(statisticTable.getAttribute('style').split(':')[1]);
      } else {
        statisticColWidth = parseInt(statisticColWidthEl);
      }
      const statisticTableRows = statisticTable.querySelectorAll('.table-statistic__row');
      statisticTableRows.forEach(statisticTableRow => {
        let statisticRowQuantity = statisticTableRow.querySelectorAll('.table-statistic__item').length;
        let statisticRowWidth;
        if (statisticColWidthEl === '') {
          statisticRowWidth = (statisticColWidth * statisticRowQuantity) + (statisticRowQuantity * 31);
        } else {
          statisticRowWidth = statisticColWidth;
        }
        if (isMobile.any()) {
          statisticTableRow.style.maxWidth = `${statisticRowWidth}px`;
        }
        window.addEventListener('resize', () => {
          statisticTableRow.style.maxWidth = `${statisticRowWidth}px`;
        })
      })
    })
  }


  const translatorsLanguages = document.querySelectorAll('[data-languages]');
  if (translatorsLanguages.length) {
    translatorsLanguages.forEach(translatorsLanguage => {
      const translatorsLanguageBody = translatorsLanguage.querySelector('[data-languages-body]');
      translatorsLanguageBody.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-languages-del') || e.target.closest('[data-languages-del]')) {
          e.target.closest('[data-languages-item]').remove();
        }
      });
      const translatorsLanguageAdd = document.querySelector('[data-languages-add]');
      translatorsLanguageAdd.addEventListener('click', () => {
        let translatorsLanguageName = translatorsLanguageAdd.parentElement.querySelector('[data-languages-name]');
        if (translatorsLanguageName.value !== '') {
          translatorsLanguageBody.insertAdjacentHTML('beforeend', `
          <div class="languages-translators__item" data-languages-item>
            <span class="languages-translators__name">${translatorsLanguageName.value}</span>
            <button class="languages-translators__del _icon_events_delete" data-languages-del></button>
          </div>
          `);
          translatorsLanguageName.value = '';
        } else {
          translatorsLanguageName.classList.add('_form-error')
        }
      })
    })
  }


  // DOMContentLoaded final
})


function statisticActions(statisticSection) {
  const statisticPolarDiagrams = statisticSection.querySelectorAll('.diagram-statistic');
  if (statisticPolarDiagrams.length) {
    statisticPolarDiagrams.forEach(statisticPolarDiagram => {
      statisticPolarRender(statisticPolarDiagram);
    })
  }
  const statisticBars = document.querySelectorAll('.bar-statistic');
  if (statisticBars.length) {
    statisticBars.forEach(statisticBar => {
      statisticBarRender(statisticBar);
    })
  }


  function statisticPolarRender(statisticPolarDiagram) {
    let diagram = statisticPolarDiagram.querySelector('[data-diagram]')
    let backGrounds = [];
    let proportions = [];
    let labels = []
    const statisticItems = statisticPolarDiagram.querySelectorAll('[data-diagram-item]');
    if (statisticItems.length) {
      statisticItems.forEach(e => {
        let bg = e.dataset.bg;
        let proportion = e.dataset.proportion;
        let label = e.querySelector('.labels-statistic__label span').innerText;
        e.querySelector('.labels-statistic__square').style.setProperty('background-color', bg)
        backGrounds.push(bg);
        proportions.push(proportion);
        if (label) {
          labels.push(label);
        } else {
          labels.push(' ');
        }
      })
      if (diagram) {
        let pieChart = new Chart(diagram, {
          type: 'pie',
          data: {
            labels: labels,
            datasets: [{
              label: ['qwe'],
              data: proportions,
              borderWidth: 1,
              backgroundColor: backGrounds,
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false
              },
            }
          },
        });
        console.log(pieChart)
      }
    }
  }

  function statisticBarRender(statisticBar) {
    const bar = statisticBar.querySelector('[data-labels]');
    if (bar) {
      const labels = bar.dataset.labels.split(', ');
      const datasets = bar.dataset.datasets.split(', ');
      const bgs = bar.dataset.bgs.split(', ');

      
      const getOrCreateTooltip = (chart) => {
        let tooltipEl = chart.canvas.parentNode.querySelector('div');
      
        if (!tooltipEl) {
          tooltipEl = document.createElement('div');
          tooltipEl.style.background = 'rgba(255, 255, 255, 1)';
          tooltipEl.style.borderRadius = '3px';
          tooltipEl.style.color = '#000';
          tooltipEl.style.opacity = 1;
          tooltipEl.style.pointerEvents = 'none';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.transform = 'translate(-50%, 0)';
          tooltipEl.style.transition = 'all .1s ease';
          tooltipEl.style.boxShadow = '0px 4px 12px rgba(109, 109, 109, 0.15)';
          tooltipEl.style.display = 'flex';
          tooltipEl.style.boxShadow = '0px 4px 12px rgba(109, 109, 109, 0.15)';
          tooltipEl.style.justifyContent = 'center';
          tooltipEl.style.alignItems = 'center';
          tooltipEl.style.minWidth = '120px';
          tooltipEl.style.padding = '10px';
      
          const table = document.createElement('table');
          table.style.margin = '0px';
      
          tooltipEl.appendChild(table);
          chart.canvas.parentNode.appendChild(tooltipEl);
        }
      
        return tooltipEl;
      };
      
      const externalTooltipHandler = (context) => {
        // Tooltip Element
        const {chart, tooltip} = context;
        const tooltipEl = getOrCreateTooltip(chart);
      
        // Hide if no tooltip
        if (tooltip.opacity === 0) {
          tooltipEl.style.opacity = 0;
          return;
        }
      
        // Set Text
        if (tooltip.body) {
          const titleLines = tooltip.title || [];
          const bodyLines = tooltip.body.map(b => b.lines);
      
          const tableHead = document.createElement('thead');
      
      
          const tableBody = document.createElement('tbody');
          bodyLines.forEach((body, i) => {
            const colors = tooltip.labelColors[i];
      
            const span = document.createElement('span');
            span.style.background = colors.backgroundColor;
            span.style.borderColor = colors.borderColor;
            span.style.borderWidth = '2px';
            span.style.marginRight = '7px';
            span.style.height = '8px';
            span.style.width = '8px';
            span.style.display = 'inline-block';
      
            const tr = document.createElement('tr');
            tr.style.backgroundColor = 'inherit';
      
            const td = document.createElement('td');
            td.style.borderWidth = 0;
            td.style.borderWidth = 0;
            td.style.display = 'flex';
            td.style.alignItems = 'center';
            td.style.fontSize = '0.75rem';
            td.style.fontWeight = '500';
      
            const text = document.createTextNode(body);
      
            td.appendChild(span);
            td.appendChild(text);
            tr.appendChild(td);
            tableBody.appendChild(tr);
          });
      
          const tableRoot = tooltipEl.querySelector('table');
      
          // Remove old children
          while (tableRoot.firstChild) {
            tableRoot.firstChild.remove();
          }
      
          // Add new children
          tableRoot.appendChild(tableHead);
          tableRoot.appendChild(tableBody);
        }
      
        const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;
      
        // Display, position, and set styles for font
        tooltipEl.style.opacity = 1;
        tooltipEl.style.left = positionX + tooltip.caretX + 'px';
        tooltipEl.style.top = positionY + tooltip.caretY - 42 + 'px';
        tooltipEl.style.font = tooltip.options.bodyFont.string;
        tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
      };


      const config = {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            barThickness: 25,
            data: datasets,
            backgroundColor: bgs
          }],
          backgroundColor: bgs,
        },
        options: {
          responsive: true,
          interaction: {
            mode: 'index',
            intersect: false,
          },
          plugins: {
            legend: {
              position: 'bottom',
              display: false
            },
            tooltip: {
              enabled: false,
              position: 'nearest',
              external: externalTooltipHandler
            }
          }
        }
      };
      let barChart = new Chart(bar, config);
    }
  }
}

function eventHeadBtnsListener() {
  const eventBody = document.querySelector('.fields-event__body');
  const eventItems = document.querySelectorAll('[data-event-inputs]');
  eventItems.forEach(eventItem => {
    const eventActionsButtons = eventItem.querySelectorAll('[data-actions]');
    eventActionsButtons.forEach(eventActionsButton => {
      eventActionsButton.addEventListener('click', (e) => {
        let type = eventActionsButton.getAttribute('data-actions');
        if (type === 'del') {
          _slideUp(eventItem.closest('.row-event'));
          setTimeout(() => {
            eventItem.closest('.row-event').remove();
            eventRegActions();
            eventHeadBtnsListener();
          }, 600);
        } else if (type === 'double') {
          let clone = eventItem.closest('.row-event').cloneNode(true);
          eventBody.insertBefore(clone, eventItem.closest('.row-event'));
          eventRegActions();
          eventHeadBtnsListener();
        } else if (type === 'up') {
          if (eventItems.length > 1) {
            if (eventItem.closest('.row-event').previousElementSibling) {
              eventBody.insertBefore(eventItem.closest('.row-event'), eventItem.closest('.row-event').previousElementSibling);
              eventRegActions();
            }
          }
        } else if (type === 'down') {
          if (eventItems.length > 1) {
            if (eventItem.closest('.row-event').nextElementSibling) {
              eventBody.insertBefore(eventItem.closest('.row-event').nextElementSibling, eventItem.closest('.row-event'));
              eventRegActions();
            }
          }
        }
      })
    })
  })
  if (eventItems.length > 1) {
  }

}

function eventRegActions(eventRegSels = document.querySelectorAll('.row-event__select')) {
  eventRegSels.forEach(e => {
    if (e.hasAttribute('data-events-types')) {
      let value = e.querySelector('option[selected]').dataset.type;
      let eventRow = e.closest('.row-event');
      eventRegRenders(value, eventRow);
    }
  })
  document.addEventListener("selectCallback", function (e) {
    let value;
    const currentSelect = e.detail.select;
    if (currentSelect.hasAttribute('data-events-types')) { 
      const selectItem = e.detail.selectItem;
      let selectItemText = selectItem.querySelector('.select__content').textContent;
      let selectItemOptions = selectItem.querySelectorAll('option');
      let eventRow = selectItem.closest('.row-event');
      selectItemOptions.forEach(option => {
        if (option.textContent === selectItemText) {
          value = option.dataset.type;
        }
      })
      eventRow.querySelectorAll('input[type="text"]').forEach(el => {
        el.value = '';
      })
      eventRegRenders(value, eventRow);
    }
  });

  const eventRows = document.querySelectorAll('.row-event');
  const eventRowsBody = document.querySelector('.fields-event__body');
  eventRows.forEach(eventRow => {
    let eventRowIndex = indexElInParent(eventRowsBody, eventRow);
    eventRow.querySelector('.row-event__name span').innerHTML = eventRowIndex + 1;
    eventRow.querySelector('[data-index]').value = eventRowIndex;
    eventRow.querySelector('[data-index]').setAttribute('eventRowIndex', eventRowIndex)
  })

}

function eventRegRenders(value, eventRow) {
  let eventOutput
  let eventTippyElement
  let eventTippyInput
  let eventTitleInput
  let eventCheckboxesEl
  let eventRequiredCheckbox
  let eventMultipleCheckbox
  function eventConsts() {
    eventOutput = eventRow.querySelector('[data-event-output]');
    eventTippyElement = eventRow.querySelector('[data-event-tippyel]');
    eventTippyInput = eventRow.querySelector('[data-event-tippy]');
    eventTitleInput = eventRow.querySelector('[data-event-title]');
    eventCheckboxesEl = eventRow.querySelector('[data-event-checkboxes]');
    eventRequiredCheckbox = eventCheckboxesEl.querySelector('[data-event-required]');
    eventMultipleCheckbox = eventCheckboxesEl.querySelector('[data-event-multiple]');
  }
  eventConsts();
  if (value !== 'select' && value !== 'checkbox' && value !== 'date' && value !== 'file' && value !== 'checkboxList' && value !== 'rating') {
    eventTippyElement.innerHTML = `
    <div class="row-event__subitem">
      <div class="row-event__subtitle">Подсказка значения поля</div>
      <input type="text" data-required data-event-tippy placeholder="Подсказка значения поля" class="row-event__input">
    </div>
    `;
    eventTippyElement.previousElementSibling.style = '';
    eventConsts();
    eventOutput.innerHTML = `
    <div class="row-event__line">
      <div class="row-event__subitem">
        <div class="row-event__subtitle">${eventTitleInput.value}</div>
        <input type="${value}" data-event-title placeholder="${eventTippyInput.value}" class="row-event__input">
      </div>
    </div>
    `;
    eventTitleInput.addEventListener('input', () => {
      eventOutput.querySelector('.row-event__subtitle').innerHTML = eventTitleInput.value;
    })
    eventTippyInput.addEventListener('input', () => {
      if (eventOutput.querySelector('.row-event__input')) {
        eventOutput.querySelector('.row-event__input').setAttribute('placeholder', eventTippyInput.value);
      }
    })
    if (eventMultipleCheckbox) {
      eventMultipleCheckbox.parentElement.remove();
    }
  } else if (value === 'file') {
    eventTippyElement.innerHTML = `
    <div class="row-event__subitem">
      <div class="row-event__subtitle">Типы загружаемых файлов (введите через запятую)</div>
      <input type="text" data-required data-event-tippy placeholder="Типы загружаемых файлов (введите через запятую)" class="row-event__input">
    </div>
    `;
    eventTippyElement.previousElementSibling.style = '';
    eventOutput.innerHTML = `
    <div class="addevents__item item-addevents">
      <div class="item-addevents__title">${eventTitleInput.value}</div>
      <div class="item-addevents__inputs item-addevents__inputs_file" data-placeholder="Выбрать файл">
        <input type="file" data-file accept="${eventTippyInput.value}" data-maxsize="0" class="item-addevents__input">
        <div class="item-addevents__preview">
          <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.2649 2.60776C12.057 0.399951 8.46173 0.399951 6.25627 2.60776L0.139084 8.72026C0.0992405 8.76011 0.0781467 8.81401 0.0781467 8.87026C0.0781467 8.92651 0.0992405 8.98042 0.139084 9.02026L1.00393 9.88511C1.04346 9.92447 1.09697 9.94656 1.15276 9.94656C1.20854 9.94656 1.26205 9.92447 1.30158 9.88511L7.41877 3.77261C8.17814 3.01323 9.18829 2.59604 10.2617 2.59604C11.3352 2.59604 12.3453 3.01323 13.1024 3.77261C13.8617 4.53198 14.2789 5.54214 14.2789 6.61323C14.2789 7.68667 13.8617 8.69448 13.1024 9.45386L6.86798 15.6859L5.85783 16.696C4.9133 17.6406 3.37814 17.6406 2.43361 16.696C1.97658 16.239 1.7258 15.632 1.7258 14.9851C1.7258 14.3382 1.97658 13.7312 2.43361 13.2742L8.61876 7.09136C8.7758 6.93667 8.98204 6.84995 9.20236 6.84995H9.2047C9.42501 6.84995 9.62892 6.93667 9.78361 7.09136C9.94064 7.24839 10.025 7.45464 10.025 7.67495C10.025 7.89292 9.93829 8.09917 9.78361 8.25386L4.72814 13.3046C4.6883 13.3445 4.6672 13.3984 4.6672 13.4546C4.6672 13.5109 4.6883 13.5648 4.72814 13.6046L5.59299 14.4695C5.63252 14.5088 5.68603 14.5309 5.74181 14.5309C5.7976 14.5309 5.85111 14.5088 5.89064 14.4695L10.9438 9.41636C11.4102 8.94995 11.6656 8.3312 11.6656 7.67261C11.6656 7.01401 11.4078 6.39292 10.9438 5.92886C9.98048 4.96558 8.41486 4.96792 7.45158 5.92886L6.85158 6.5312L1.26877 12.1117C0.889859 12.4884 0.589502 12.9365 0.38512 13.4302C0.180737 13.9238 0.0763961 14.4532 0.0781467 14.9875C0.0781467 16.0726 0.502365 17.0921 1.26877 17.8585C2.0633 18.6507 3.10393 19.0468 4.14455 19.0468C5.18517 19.0468 6.2258 18.6507 7.01798 17.8585L14.2649 10.6164C15.3313 9.54761 15.9219 8.12495 15.9219 6.61323C15.9242 5.09917 15.3336 3.67651 14.2649 2.60776Z" fill="#CBD5E0"/>
          </svg>
        </div>
      </div>
    </div>
    `;
    picturePreviewRender();
    eventConsts();
    eventTippyInput.addEventListener('input', () => {
      let acceptArr = eventTippyInput.value.replaceAll('.', '').replaceAll(', ', '||').replaceAll(',', '||').split('||');
      let acceptStr = [];
      acceptArr.forEach(e => {
        e = '.' + e;
        acceptStr.push(e);
      })
      acceptStr.join(', ');
      console.log(acceptStr);
      console.log(acceptArr);
      eventOutput.querySelector('[data-file]').setAttribute('accept', acceptStr);
    });
    eventTitleInput.addEventListener('input', () => {
      eventOutput.querySelector('.item-addevents__title').innerHTML = eventTitleInput.value;
    })
    if (eventMultipleCheckbox) {
      eventMultipleCheckbox.parentElement.remove();
    }
  } else if (value === 'date') {
    eventTippyElement.innerHTML = `
    <div class="row-event__subitem">
      <div class="row-event__subtitle">Подсказка значения поля</div>
      <input type="text" data-required data-event-tippy placeholder="Подсказка значения поля" class="row-event__input">
    </div>
    `;
    eventTippyElement.previousElementSibling.style = '';
    eventOutput.innerHTML = `
    <div class="row-event__line">
      <div class="row-event__subitem">
        <div class="row-event__subtitle">${eventTitleInput.value}</div>
        <input type="text" data-datepicker placeholder="${eventTippyInput.value}" class="item-addevents__input item-addevents__input_date">
      </div>
    </div>
    `;
    customOneDatePickerInit(eventOutput.querySelector('[data-datepicker]'))
    eventTitleInput.addEventListener('input', () => {
      eventOutput.querySelector('.row-event__subtitle').innerHTML = eventTitleInput.value;
    })
    eventTippyInput.addEventListener('input', () => {
      eventOutput.querySelector('input').setAttribute('placeholder', eventTippyInput.value);
    })
    if (eventMultipleCheckbox) {
      eventMultipleCheckbox.parentElement.remove();
    }
  } else if (value === 'select') {
    eventTippyElement.previousElementSibling.style = '';
    eventTippyElement.innerHTML = `
    <div class="row-event__subitem">
      <div class="row-event__subtitle">Варианты значения</div>
      <textarea data-required data-event-tippy class="row-event__textarea" placeholder="Варианты значения">123\n321</textarea>
    </div>
    `;
    if (!eventMultipleCheckbox) {
      eventCheckboxesEl.insertAdjacentHTML('beforeend', `
        <div class="row-event__subitem">
          <input data-event-multiple type="checkbox" id="row-event__checkbox_${Date.now()}" class="row-event__checkbox">
          <label for="row-event__checkbox_${Date.now()}" class="row-event__label">Множественный выбор</label>
        </div>
      `)
    };
    eventTitleInput.addEventListener('input', () => {
      eventOutput.querySelector('.row-event__subtitle').innerHTML = eventTitleInput.value;
    });
    eventConsts();
    let optionsArr;
    let ortionsStr = '';
    optionsArr = eventTippyInput.value.replaceAll(' ', '').split('\n');
    optionsArr.forEach(option => {
      if (option.trim() !== '') {
        ortionsStr += `<option value="${option}">${option}</option>`
      }
    })
    eventOutput.innerHTML = `
    <div class="row-event__line">
      <div class="row-event__subitem">
        <div class="row-event__subtitle">${eventTitleInput.value}</div>
        <select name="form[]" data-tags class="row-event__select row-event__select_dynamic">
        ${ortionsStr}
        </select>
      </div>
    </div>
    `;
    if (ortionsStr.trim() !== '') {
      SelectConstructorInit()
    }
    eventTippyInput.addEventListener('input', () => {
      let ortionsStr = '';
      optionsArr = eventTippyInput.value.replaceAll(' ', '').split('\n');
      optionsArr.forEach(option => {
        if (option.trim() !== '') {
          ortionsStr += `<option value="${option}">${option}</option>`
        }
      })
      eventOutput.innerHTML = `
      <div class="row-event__line">
        <div class="row-event__subitem">
          <div class="row-event__subtitle">${eventTitleInput.value}</div>
          <select name="form[]" data-tags class="row-event__select row-event__select_dynamic">
          ${ortionsStr}
          </select>
        </div>
      </div>
      `;
      SelectConstructorInit();
      eventCheckReq(value, eventRow);
    });
    eventTitleInput.addEventListener('input', () => {
      eventOutput.querySelector('.row-event__subtitle').innerHTML = eventTitleInput.value;
    })
  } else if (value === 'checkbox') {
    console.log(Date.now())
    eventOutput.innerHTML = `
    <div class="row-event__subitem">
      <input data-events-required checked type="checkbox" value="${eventTitleInput.value}" id="row-event__checkbox_${Date.now()}" class="row-event__checkbox">
      <label for="row-event__checkbox_${Date.now()}" class="row-event__label">${eventTippyInput.value}</label>
    </div>
    `;
    eventTippyElement.querySelector('.row-event__subtitle').innerHTML = 'Текст рядом с галочкой';
    eventTippyElement.previousElementSibling.style = 'display: none;';
    if (eventMultipleCheckbox) {
      eventMultipleCheckbox.parentElement.remove();
    }
    eventTippyInput.addEventListener('input', () => {
      eventOutput.querySelector('label').innerHTML = eventTippyInput.value;
      eventOutput.querySelector('input').value = eventTippyInput.value;
    })
  } else if (value === 'checkboxList') {
    eventTippyElement.previousElementSibling.style = '';
    eventTippyElement.innerHTML = `
    <div class="row-event__subitem">
      <div class="row-event__subtitle">Варианты значения</div>
      <textarea data-required data-event-tippy class="row-event__textarea" placeholder="Варианты значения">456\n654</textarea>
    </div>
    `;
    eventConsts();
    if (eventMultipleCheckbox) {
      eventMultipleCheckbox.parentElement.remove();
    }
    let checkboxesArr;
    let checkboxesStr = '';
    checkboxesArr = eventTippyInput.value.replaceAll(' ', '').split('\n');
    for (let i=0; i < checkboxesArr.length; ++i) {
      let option = checkboxesArr[i];
      if (option.trim() !== '') {
        checkboxesStr += `
        <div class="row-event__line">
          <div class="row-event__subitem">
            <input data-events-required type="checkbox" id="row-event__checkbox_999${i}" class="row-event__checkbox">
            <label for="row-event__checkbox_999${i}" class="row-event__label">${option}</label>
          </div>
        </div>
        `
      }
    }
    eventOutput.innerHTML = checkboxesStr;
    eventTippyInput.addEventListener('input', () => {
      let checkboxesStr = '';
      checkboxesArr = eventTippyInput.value.replaceAll(' ', '').split('\n');
      for (let i=0; i < checkboxesArr.length; ++i) {
        let option = checkboxesArr[i];
        if (option.trim() !== '') {
          checkboxesStr += `
          <div class="row-event__line">
            <div class="row-event__subitem">
              <input data-events-required type="checkbox" id="row-event__checkbox_999${i}" class="row-event__checkbox">
              <label for="row-event__checkbox_999${i}" class="row-event__label">${option}</label>
            </div>
          </div>
          `
        }
      }
      eventOutput.innerHTML = checkboxesStr;
      eventCheckReq(value, eventRow);
    });
  } else if (value === 'rating') {
    eventTippyElement.previousElementSibling.style = '';
    eventTippyElement.innerHTML = `
    <div class="row-event__subitem">
      <div class="row-event__subtitle">Количество звезд от и до</div>
      <div class="addevents__item item-addevents">
        <div class="item-addevents__inputs">
          <input type="number" placeholder="1" min="1" max="5" class="item-addevents__input item-addevents__input_from">
          <svg class="item-addevents__datetime" width="10" height="18" viewBox="0 0 10 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.05239 0.36644L9.75654 8.38905C10.0812 8.72676 10.0812 9.27236 9.75654 9.61095L2.05239 17.6336C1.58378 18.1221 0.821355 18.1221 0.351914 17.6336C-0.116694 17.145 -0.116694 16.352 0.351914 15.8634L6.94239 8.99956L0.351914 2.13745C-0.116694 1.64799 -0.116694 0.855024 0.351914 0.36644C0.821355 -0.122145 1.58378 -0.122145 2.05239 0.36644Z" fill="#CBD5E0"/>
          </svg>
          <input type="number" placeholder="5" min="1" max="5" class="item-addevents__input item-addevents__input_to">
        </div>
      </div>
    </div>
    `;
    eventConsts();
    if (eventMultipleCheckbox) {
      eventMultipleCheckbox.parentElement.remove();
    }
    eventOutput.innerHTML = `
    <div class="row-event__line">
      <div class="row-event__subitem">
        <div class="row-event__subtitle">Насколько Вам понравилось мероприятие?</div>
        <div class="rating rating_set">
          <div class="rating__value">3.5</div>
          <div class="rating__body" data-content="★★★★★">
            <div class="rating__active"data-content="★★★★★"></div>
            <div class="rating__items">
              <input type="radio" class="rating__item" value="1" name="rating">
              <input type="radio" class="rating__item" value="2" name="rating">
              <input type="radio" class="rating__item" value="3" name="rating">
              <input type="radio" class="rating__item" value="4" name="rating">
              <input type="radio" class="rating__item" value="5" name="rating">
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    formRating();
    eventTippyElement.querySelector('.item-addevents__input_from').addEventListener('change', () => {
      let min = eventTippyElement.querySelector('.item-addevents__input_from').value;
      eventTippyElement.querySelector('.item-addevents__input_to').setAttribute('min', min)
      eventTippyElement.querySelector('.item-addevents__input_to').value = min;
    })
      eventTippyElement.querySelector('.item-addevents__input_to').addEventListener('change', () => {
        let star = '★';
        let starsArr = [];
        let starsQuantity = parseInt(eventTippyElement.querySelector('.item-addevents__input_to').value);
        for (let i = 0; i < starsQuantity; ++i) {
          starsArr.push(star);
        }
        eventOutput.querySelector('.rating__body').setAttribute('data-content', starsArr.join(''))
        eventOutput.querySelector('.rating__active').setAttribute('data-content', starsArr.join(''))
        eventOutput.querySelector('.rating__value').innerHTML = eventTippyElement.querySelector('.item-addevents__input_to').value;
        formRating();
    })
  }
  eventCheckReq(value, eventRow);

  function eventCheckReq(value, eventRow) {
    let eventReqCheckbox = eventRow.querySelector('[data-events-required]');
    let eventMultipleCheckbox = eventRow.querySelector('[data-event-multiple]');
    if (eventReqCheckbox) {
      if (eventReqCheckbox.checked) {
        if (value === 'email') {
          eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-required', 'email');
          inputmaskInit();
        } else if (value === 'phone') { 
          eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-inputmask', "'mask':'+7 999 999 99 99'");
          eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-inputmask-clearincomplete', "true");
          inputmaskInit();
        } else if (value === 'select') {
          eventRow.querySelector('[data-event-output]').querySelector('select').setAttribute('data-required', '');
        } else {
          if (eventRow.querySelector('[data-event-output]').querySelectorAll('input').length) {
            eventRow.querySelector('[data-event-output]').querySelectorAll('input').forEach(e => {
              e.setAttribute('data-required', '');
            })
          }
        }
      }
      eventReqCheckbox.addEventListener('change', () => {
        if (eventReqCheckbox.checked) {
          if (value === 'email') {
            eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-required', 'email');
            inputmaskInit();
          } else if (value === 'phone') { 
            eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-inputmask', "'mask':'+7 999 999 99 99'");
            eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-inputmask-clearincomplete', "true");
            inputmaskInit();
          } else if (value === 'select') {
            eventRow.querySelector('[data-event-output]').querySelector('select').setAttribute('data-required', '');
          } else {
            eventRow.querySelector('[data-event-output]').querySelector('input').setAttribute('data-required', '');
          }
        } else {
          if (eventRow.querySelector('[data-event-output]').querySelectorAll('input').length) {
            eventRow.querySelector('[data-event-output]').querySelectorAll('input').forEach(e => {
              e.setAttribute('data-required', '');
            })
          }
        }
      })
    }
    if (eventMultipleCheckbox && value === 'select') {
      eventMultipleCheckbox.addEventListener('change', () => {
        if (eventMultipleCheckbox.checked) {
          eventRow.querySelector('[data-event-output]').querySelector('select').setAttribute('multiple', '');
        } else {
          eventRow.querySelector('[data-event-output]').querySelector('select').removeAttribute('multiple');
        }
      })
    }
  }
}


function addInputLinksActions(target) {
  let el = target;
  let title = el.getAttribute('data-title');
  let placeholders = el.getAttribute('data-placeholders').split('||')
  let inputs = '';
  let elem = '';
  placeholders.forEach(placeholder => {
    if (el.getAttribute('data-social') !== null) {
      inputs+=`<input type="text" placeholder="${placeholder}" class="item-addevents__input">`
    } else {
      inputs+=`<input type="text" placeholder="${placeholder}" class="item-addevents__input item-addevents__input_small">`
    }
  })
  if (el.getAttribute('data-social') !== null) {
    elem = `
    <div class="addevents__item item-addevents">
      <div class="item-addevents__title">${title}</div>
      <div class="item-addevents__inputs">${inputs}</div>
    </div>
    <div class="addevents__item item-addevents">
      <div class="item-addevents__title">${title}</div>
      <div class="item-addevents__inputs">${inputs}</div>
    </div>
    `;
    let myDiv = document.createElement('div');
    myDiv.classList.add('addevents__row');
    myDiv.innerHTML = elem;
    let column = el.closest('.addevents__column');
    column.insertBefore(myDiv, el.parentElement);
  } else {
    elem = inputs;
    let myDiv = document.createElement('div');
    myDiv.classList.add('item-addevents__inputs');
    myDiv.innerHTML = elem;
    let column = el.closest('.item-addevents');
    column.insertBefore(myDiv, el.parentElement);
  }
}

function eventsBodiesHeight(tabsEvents) {
  const tabsBodies = tabsEvents.querySelectorAll('.tabs-events__body');
  if (tabsBodies.length) {
    if (window.innerHeight > 861) {
      const tabsEventsHeadHeight = tabsEvents.querySelector('.tabs-events__head').offsetHeight;
      tabsBodies.forEach(e => {
        e.style = `min-height: calc(100vh - ${tabsEventsHeadHeight + 212}px)`
      })
    }
  }
  const eventsDel = tabsEvents.querySelectorAll('.table-events__link_del');
  eventsDel.forEach(e => {
    e.addEventListener('click', () => {
      let event = e.closest('.table-events__row') || e.closest('.table-participants__row') || e.closest('.table-speakers__row');
      if (event) {
        event.classList.add('_hide');
        setTimeout(() => {
          event.remove();
        }, 300);
      }
    })
  })

}

function picturePreviewRender(pictureFileInputs  = document.querySelectorAll('[data-file]')) {
  pictureFileInputs.forEach(el => {
    el.addEventListener('change', (e) => {
      const types = el.getAttribute('accept').replaceAll('.', '').replaceAll(' ', '').replaceAll('svg', 'svg+xml').split(',');
      const maxsize = el.dataset.maxsize;
      const minwhAttr = el.dataset.minwh;
      const maxwhAttr = el.dataset.maxwh;
      let minwh;
      let maxwh;
      if (minwhAttr !== null && minwhAttr !== undefined) {
        minwh = minwhAttr.split('*');
      }
      if (maxwhAttr !== null && maxwhAttr !== undefined) {
        maxwh = maxwhAttr.split('*');
      }
      el.closest('.item-addevents__inputs_file').querySelector('.item-addevents__preview').innerHTML = '';
      for (let item in el.files) {
        let file = el.files[item];
        if (typeof(file) === 'object') {
          if (types.length && !types.some(type => file.type.indexOf(type) !== -1) && el.getAttribute('accept') !== '') {
            alert(`Разрешены только файлы формата ${types.join(', ')}`);
            el.value = '';
            return;
          }
          if (maxsize && parseInt(maxsize) !== 0) {
            if (file.size > maxsize * 1024 * 1024) {
              alert(`Файл должен быть меньше ${maxsize}Мб`);
              return;
            }
          }
    
          let reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function (e) {
            if (file.type.indexOf('image') !== -1) {
              let image = new Image();
              image.src = e.target.result;
              image.onload = function () {
                let height = this.height;
                let width = this.width;
                if (minwhAttr !== null && minwhAttr !== undefined && parseInt(minwh[0]) * parseInt(minwh[1]) !== 0) {
                  if ((height < parseInt(minwh[1])) && (width < parseInt(minwh[0]))) {
                    alert(`Файл должен быть не меньше ${minwh[0]} в длину и ${minwh[1]} в высоту`);
                    return false;
                  } else {
                    if (width < parseInt(minwh[0])) {
                      alert(`Файл должен быть шириной не меньше ${minwh[0]} в длину`);
                      return false;
                    }
                    if (height < parseInt(minwh[1])) {
                      alert(`Файл должен быть не меньше ${minwh[1]} в высоту`);
                      return false;
                    }
                  }
                }
                if (maxwhAttr !== null && maxwhAttr !== undefined && parseInt(maxwh[0]) * parseInt(maxwh[1]) !== 0) {
                  if ((height > parseInt(maxwh[1])) && (width > parseInt(maxwh[0]))) {
                    alert(`Файл должен быть меньше ${maxwh[0]} в длину и ${maxwh[1]} в высоту`);
                    return false;
                  } else {
                    if (width > parseInt(maxwh[0])) {
                      alert(`Файл должен быть шириной меньше ${maxwh[0]} в длину`);
                      return false;
                    }
                    if (height > parseInt(maxwh[1])) {
                      alert(`Файл должен быть меньше ${maxwh[1]} в высоту`);
                      return false;
                    }
                  }
                }
                if (el.getAttribute('data-avatar') === null) {
                  el.closest('.item-addevents__inputs_file').querySelector('.item-addevents__preview').insertAdjacentHTML('beforeend', `<img src="${e.target.result}" alt="image">`);
                } else {
                  document.querySelector('.user-addevents__avatar').innerHTML = `<img src="${e.target.result}" alt="image">`;
                }
              };
            } else {
              el.closest('.item-addevents__inputs_file').setAttribute('data-placeholder', file.name);
            }
          };
          reader.onerror = function (e) {
            alert('Ошибка');
          }
        }
      }
    })
  })
} 


let indexElInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};
function streamsActions() {
  let schedulesid
  if (streamsSchedules) {
    schedulesid = streamsSchedules.length;
  }
  const calendarsMain = document.querySelectorAll('.column-streams');
  if (calendarsMain.length) {
    const newStreamAddBtn = document.querySelector('.addStreamsPopup__submit');
    if (newStreamAddBtn) {
      newStreamAddBtn.addEventListener('click', () => {
        const newStreamParent = newStreamAddBtn.closest('.addStreamsPopup');
        document.addEventListener('beforePopupClose', (e) => {
          if (e.detail.popup.targetOpen.element.classList.contains('addStreamsPopup')) {
            const newStreamName = newStreamParent.querySelector('.addStreamsPopup__input').value;
            if (newStreamName.trim() !== '') {
              const newStreamPriority = newStreamParent.querySelector('.addStreamsPopup__priority').value;
              const currentPopup = e.detail.popup;
              if (currentPopup.previousActiveElement.classList.contains('column-streams__link')) {
                const streamNameEl = currentPopup.previousActiveElement.parentElement;
                if (streamNameEl) {
                  streamNameEl.innerHTML = `
                  <div class="head-columnStreams__name">${newStreamName}</div>
                  <div class="head-columnStreams__actions">
                    <div class="head-columnStreams__title">Поток ${newStreamPriority}</div>
                    <a href="#" data-popup="#addStreamsPopup" class="head-columnStreams__link head-columnStreams__link_edit _icon_events_edit"></a>
                    <a href="#" class="head-columnStreams__link head-columnStreams__link_del _icon_events_delete"></a>
                  </div>
                  `;
                  calendarFullInit(streamNameEl, newStreamName)
                }
              } else if (currentPopup.previousActiveElement.classList.contains('head-columnStreams__link_edit')) {
                const streamNameEl = currentPopup.previousActiveElement.closest('.head-columnStreams');
                streamNameEl.innerHTML = `
                  <div class="head-columnStreams__name">${newStreamName}</div>
                  <div class="head-columnStreams__actions">
                    <div class="head-columnStreams__title">Поток ${newStreamPriority}</div>
                    <a href="#" data-popup="#addStreamsPopup" class="head-columnStreams__link head-columnStreams__link_edit _icon_events_edit"></a>
                    <a href="#" class="head-columnStreams__link head-columnStreams__link_del _icon_events_delete"></a>
                  </div>
                `;
                streamNameEl.nextElementSibling.innerHTML = ``;
                calendarFullInit(streamNameEl, newStreamName)
              }
            }
          }
        })
        flsModules.popup.close(newStreamParent);
      })
    }


    calendarsMain.forEach(e => {
      let name = e.querySelector('.head-columnStreams__name');
      if (name) {
        calendarFullInit(name.parentElement, name.textContent);
      }
    })
  }
  const calendarSide = document.querySelector('#calendar_aside');
  if (calendarSide) {
    reInitJalendar(streamsSchedules, calendarSide);
  }
  
  function calendarFullInit(calendarEl, name) {
    var calendar = new Calendar(calendarEl.nextElementSibling, {
      defaultView: 'day',
      taskView: false,    // Can be also ['milestone', 'task']
      scheduleView: true,  // Can be also ['allday', 'time']
      useCreationPopup: false,
      useDetailPopup: false,
      taskView: false,
      timezone: false,
      id: name,
      timezones: [ {
          timezoneOffset: -820,
          // displayLabel: 'GMT-08:00',
      }],
    });
    calendar.on({
      'clickSchedule': function (e) {
        let schedule = e.schedule;
      },
      'beforeCreateSchedule': function (event) {
        document.addEventListener('afterPopupOpen', (e) => {
          const currentPopup = e.detail.popup.targetOpen.element;
          const timeInputs = currentPopup.querySelectorAll('.addBroadcastPopup__input_time');
          timeInputs[0].value = event.start._date.toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric'}).split(', ')[1];
          timeInputs[1].value = event.end._date.toLocaleDateString('ru-RU', { hour: 'numeric', minute: 'numeric' }).split(', ')[1];
        })
        flsModules.popup.open('.addBroadcastPopup')
        document.querySelector('.addBroadcastPopup__title span').innerHTML = calendar._layout.container.closest('.column-streams').querySelector('.head-columnStreams__title').textContent;
      },
      'beforeUpdateSchedule': function(e) {
          e.schedule.start = e.start;
          e.schedule.end = e.end;
          calendar.updateSchedule(e.schedule.id, e.schedule.calendarId, e.schedule);
      },
      'beforeDeleteSchedule': function(e) {
          calendar.deleteSchedule(e.schedule.id, e.schedule.calendarId);
      },
      'afterRenderSchedule': function(event) {
        var schedule = event.schedule;
        var element = calendar.getElement(schedule.id, schedule.calendarId);
        let startTime = schedule.start;
        let title = schedule.title;
        element.querySelector('.tui-full-calendar-time-schedule-content.tui-full-calendar-time-schedule-content-time').innerHTML = `
        <div class="schedule__row">
          <div class="schedule__time">${new Date(startTime).toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric'}).split(', ')[1]}</div>
          <a href="${schedule.location}" target="_blank" class="schedule__link">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="12" height="12" rx="6" fill="${schedule.color}"/>
              <path d="M2.7998 4.4001C2.7998 4.18792 2.88409 3.98444 3.03412 3.83441C3.18415 3.68438 3.38763 3.6001 3.5998 3.6001H5.9998C6.21198 3.6001 6.41546 3.68438 6.56549 3.83441C6.71552 3.98444 6.7998 4.18792 6.7998 4.4001V7.6001C6.7998 7.81227 6.71552 8.01575 6.56549 8.16578C6.41546 8.31581 6.21198 8.4001 5.9998 8.4001H3.5998C3.38763 8.4001 3.18415 8.31581 3.03412 8.16578C2.88409 8.01575 2.7998 7.81227 2.7998 7.6001V4.4001ZM7.821 4.8425C7.75457 4.87569 7.69869 4.92673 7.65963 4.98989C7.62056 5.05305 7.59984 5.12583 7.5998 5.2001V6.8001C7.59984 6.87436 7.62056 6.94715 7.65963 7.01031C7.69869 7.07347 7.75457 7.1245 7.821 7.1577L8.621 7.5577C8.68197 7.58816 8.74971 7.60255 8.8178 7.59948C8.88589 7.59641 8.95206 7.576 9.01005 7.54018C9.06803 7.50435 9.1159 7.45431 9.14911 7.39479C9.18232 7.33527 9.19977 7.26825 9.1998 7.2001V4.8001C9.19977 4.73194 9.18232 4.66492 9.14911 4.60541C9.1159 4.54589 9.06803 4.49584 9.01005 4.46002C8.95206 4.4242 8.88589 4.40378 8.8178 4.40072C8.74971 4.39765 8.68197 4.41203 8.621 4.4425L7.821 4.8425Z" fill="#E0F2FE"/>
            </svg>
          </a>
        </div>
        <div class="schedule__row">
          <div class="schedule__title">${title}</div>
        </div>
        <div class="schedule__row">
          <div class="schedule__actions">
            <a href="#" data-popup="#addBroadcastPopup" class="schedule__link schedule__link_edit _icon_events_edit"></a>
            <a href="#" class="schedule__link schedule__link_del _icon_events_delete"></a>
          </div>
        </div>
        `;
    }
    });
    calendar.setDate(streamsDate);
    setTimeout(() => {
      calendarDelEditListener(calendar)
    }, 500);
    streamsScheduleAdd(calendar);
    calendarEl.querySelector('.head-columnStreams__link_del').addEventListener('click', (e) => {
      e.preventDefault();
      calendar.destroy();
      calendarEl.nextElementSibling.innerHTML = ``
      calendarEl.innerHTML = `<a href="#" class="column-streams__link" data-popup="#addStreamsPopup">Создать поток</a>`
    })
    let calendarColorsNew = calendarColors[parseInt(Math.random() * 3)]
    calendar.setCalendarColor(null, calendarColorsNew);
    streamsSchedules.forEach(e => {
      if (e.calendarId === calendar._options.id) {
        Object.assign(e, calendarColorsNew)
        calendar.createSchedules([e]);
      }
    })
  }

  function calendarDelEditListener(calendar) {
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('schedule__link_del') || e.target.closest('.schedule__link_del')) {
        e.preventDefault();
        let calendarId = e.target.closest('[data-schedule-id]').dataset.calendarId;
        let scheduleId = e.target.closest('[data-schedule-id]').dataset.scheduleId;
        calendar.deleteSchedule(scheduleId, calendarId);
      } else if (e.target.classList.contains('schedule__link_del') || e.target.closest('.schedule__link_edit')) {
        e.preventDefault();
        let calendarId = e.target.closest('[data-schedule-id]').dataset.calendarId;
        let scheduleId = e.target.closest('[data-schedule-id]').dataset.scheduleId;
        var schedule = calendar.getSchedule(scheduleId, calendarId);
        document.addEventListener('afterPopupOpen', (event) => {
          const currentPopup = event.detail.popup;
          if (currentPopup.previousActiveElement.classList.contains('schedule__link_edit')) {
            const streamNumber = currentPopup.previousActiveElement.closest('.column-streams').querySelector('.head-columnStreams__title').textContent;
            const currentPopupEl = currentPopup.targetOpen.element;
            currentPopupEl.querySelector('.addBroadcastPopup__title span').innerHTML = streamNumber;
            const currentPopupNameInput = currentPopupEl.querySelector('.addBroadcastPopup__input_name');
            const currentPopupTitleSelect = currentPopupEl.querySelector('.addBroadcastPopup__select');
            const currentPopupStartInputs = currentPopupEl.querySelectorAll('.addBroadcastPopup__input_time');
            const currentPopupCodeTextarea = currentPopupEl.querySelector('.addBroadcastPopup__textarea_code');
            currentPopupNameInput.value = schedule.body;
            // currentPopupTitleSelect.parentElement.querySelector('.select__value .select__content').innerHTML = schedule.title.replace('Спикер: ', '');
            currentPopupStartInputs[0].value = new Date(schedule.start._date).toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric'}).split(', ')[1];
            currentPopupStartInputs[1].value = new Date(schedule.end._date).toLocaleDateString('ru-RU', { hour: 'numeric', minute: 'numeric' }).split(', ')[1];
            currentPopupCodeTextarea.value = schedule.location;
          }
        })
        streamsScheduleAdd(calendar, scheduleId, calendarId);
      }
    })
  }

  function streamsScheduleAdd(calendar, editSheduleId, calendarId) {
    document.querySelector('.addBroadcastPopup__submit').addEventListener('click', () => {
      let name = document.querySelector('.addBroadcastPopup__input_name').value;
      if (name.trim() !== '') {
        const timeInputs = document.querySelectorAll('.addBroadcastPopup__input_time');
        let title = `Спикер: ${document.querySelector('.addBroadcastPopup__select').value}`;
        let start = calendar.getDateRangeStart().setHours(parseInt(timeInputs[0].value.split(':')[0]), parseInt(timeInputs[0].value.split(':')[1]));
        let end = calendar.getDateRangeEnd().setHours(parseInt(timeInputs[1].value.split(':')[0]), parseInt(timeInputs[1].value.split(':')[1]));
        let location = document.querySelector('.addBroadcastPopup__textarea_code').value;
        schedulesid++;
        let schedule = {};

        document.addEventListener('beforePopupClose', (e) => {
          const currentPopup = e.detail.popup;
          if (currentPopup.previousActiveElement.classList.contains('schedule__link_edit')) {
            schedule = {
              category: 'time',
              title: title,
              start: start,
              end: end,
              isAllDay: false,
              color: calendar._calendarColor.null.color,
              bgColor: calendar._calendarColor.null.bgColor,
              dragBgColor: calendar._calendarColor.null.dragBgColor,
              borderColor: calendar._calendarColor.null.borderColor,
              location: location,
              body: name,
            };
            calendar.updateSchedule(editSheduleId, calendarId, schedule);
            reInitJalendar([schedule]);
          } else {
            schedule = {
              id: `${schedulesid}`,
              category: 'time',
              title: title,
              start: start,
              end: end,
              isAllDay: false,
              color: calendar._calendarColor.null.color,
              bgColor: calendar._calendarColor.null.bgColor,
              dragBgColor: calendar._calendarColor.null.dragBgColor,
              borderColor: calendar._calendarColor.null.borderColor,
              location: location,
              body: name,
            };
            calendar.createSchedules([schedule]);
            reInitJalendar([schedule]);
          }
          const currentPopupEl = currentPopup.targetOpen.element;
          if (currentPopupEl.classList.contains('addBroadcastPopup')) {
            const currentPopupNameInput = currentPopupEl.querySelector('.addBroadcastPopup__input_name');
            const currentPopupTitleSelect = currentPopupEl.querySelector('.addBroadcastPopup__select');
            const currentPopupStartInputs = currentPopupEl.querySelectorAll('.addBroadcastPopup__input_time');
            const currentPopupCodeTextarea = currentPopupEl.querySelector('.addBroadcastPopup__textarea_code');
            currentPopupNameInput.value = '';
            // currentPopupTitleSelect.parentElement.querySelector('.select__value .select__content').innerHTML = schedule.title.replace('Спикер: ', '');
            currentPopupStartInputs[0].value = '';
            currentPopupStartInputs[1].value = '';
            currentPopupCodeTextarea.value = '';
          }
        })
        flsModules.popup.close('.addBroadcastPopup');
      }
    })
  }

  function reInitJalendar(schedules, calendarSide = document.querySelector('#calendar_aside')) {
    if (calendarSide.querySelector('.jalendar-container')) {
      calendarSide.querySelector('.jalendar-container').remove();
    }
    schedules.forEach(e => {
      calendarSide.insertAdjacentHTML('beforeend', `
      <div class="added-event" data-color="${e.color}" data-start="${new Date(e.start).toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric'}).split(', ')[1]}" data-end="${new Date(e.end).toLocaleDateString('ru-RU', {hour: 'numeric', minute: 'numeric'}).split(', ')[1]}" data-date="${new Date(e.start).toLocaleDateString().replaceAll('.', '-')}" data-link="${e.location}" data-title="${e.title}"></div>
      `)
    })
    initJalendar()
  }
}



function customDatePickerInit(datePickers = document.querySelectorAll('[data-datepicker]')) {
  datePickers.forEach(datePicker => {
    customOneDatePickerInit(datePicker)
  })
}

function customOneDatePickerInit(datePicker) {
  let picker;
  let position = datePicker.dataset.datepickerPosition ? datePicker.dataset.datepickerPosition : 'bl';
  picker = datepicker(datePicker, {
    position: position,
    startDay: 1,
    customDays: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    customMonths: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    customOverlayMonths: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт ', 'Ноя', 'Дек'],
    defaultView: 'overlay',
    // dateSelected: new Date(), // Today is selected.
    disableYearOverlay: true, // Clicking the year or month will *not* bring up the year overlay.
    formatter: (input, date, instance) => {
      const value = date.toLocaleDateString('ru-RU', { weekday: 'long', month: 'long', day: 'numeric' })
      const shortValue = date.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' })
      input.value = date.toLocaleDateString();
    }
  })
}


