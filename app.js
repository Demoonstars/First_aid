/**
 * app.js — SPA «Итоговый тест по действиям при угрозе БПЛА»
 * Vanilla JS ES6+, без фреймворков
 */

/* ════════════════════════════════════════════════════════════
   1. БАНК ВОПРОСОВ (20 вопросов)
   Источники: ФЗ № 68, ФЗ № 35, учебный курс по БПЛА
   correctIndex — индекс правильного ответа (0-based)
════════════════════════════════════════════════════════════ */
const QUESTIONS = [
  {
    text: 'Какое из перечисленных правил НЕ входит в базовую доктрину выживания «Правило трех НЕ» при угрозе БПЛА?',
    options: [
      'НЕ снимать и НЕ демаскировать',
      'НЕ приближаться и НЕ трогать',
      'НЕ оставаться на открытом месте',
      'НЕ звонить в экстренные службы'
    ],
    correctIndex: 3
  },
  {
    text: 'Что является главным убийцей в помещении при попадании БПЛА в здание?',
    options: [
      'Прямое попадание боеприпаса',
      'Разлетающиеся осколки стекол от ударной волны',
      'Пожар в соседних зданиях',
      'Провал пола'
    ],
    correctIndex: 1
  },
  {
    text: 'В чем заключается правило «двух стен» при нахождении в здании?',
    options: [
      'Нужно спрятаться в комнате, где две стены, и закрыть окна',
      'Между вами и улицей должно быть минимум две капитальные стены',
      'Нужно встать в угол, образованный двумя стенами',
      'Необходимо выбежать из здания через две стены'
    ],
    correctIndex: 1
  },
  {
    text: 'Почему при угрозе атаки БПЛА категорически запрещено пользоваться лифтом?',
    options: [
      'Лифт может быть обесточен, и вы окажетесь в ловушке',
      'В лифте не ловит мобильная связь',
      'Лифт движется слишком медленно',
      'В лифте сработает пожарная сигнализация'
    ],
    correctIndex: 0
  },
  {
    text: 'Что нужно обязательно сделать, если вы спрятались и сгруппировались при угрозе взрыва?',
    options: [
      'Закрыть рот и задержать дыхание',
      'Приоткрыть рот для выравнивания давления',
      'Громко кричать, чтобы позвать помощь',
      'Лечь на спину и вытянуть ноги'
    ],
    correctIndex: 1
  },
  {
    text: 'Что необходимо сделать, если вы находитесь в легкой бытовке или модульном КПП при атаке БПЛА?',
    options: [
      'Остаться внутри и спрятаться под стол',
      'Немедленно покинуть ее и укрыться в складке местности (канаве)',
      'Закрыть окна и двери, отключить свет',
      'Спрятаться в подсобном помещении бытовки'
    ],
    correctIndex: 1
  },
  {
    text: 'Где категорически ЗАПРЕЩЕНО прятаться на открытой местности при атаке БПЛА?',
    options: [
      'В глубокой траншее или кювете',
      'За бетонными блоками',
      'За забором из профнастила или легковым автомобилем',
      'В строительном котловане'
    ],
    correctIndex: 2
  },
  {
    text: 'Как правильно лечь на землю, если вы оказались в чистом поле без укрытия?',
    options: [
      'На спину, раскинув руки',
      'На живот лицом вниз, скрестив ноги и закрыв голову руками',
      'На бок, поджав колени к груди',
      'На живот, приподняв голову, чтобы видеть дрон'
    ],
    correctIndex: 1
  },
  {
    text: 'Что нужно сделать сразу после того, как вы услышали звук приближающегося БПЛА, находясь за рулем автомобиля?',
    options: [
      'Попытаться уехать на максимальной скорости',
      'Остановиться, заглушить двигатель и покинуть машину',
      'Опустить все стекла и пригнуться',
      'Съехать на обочину и остаться внутри'
    ],
    correctIndex: 1
  },
  {
    text: 'На какое минимальное расстояние нужно отбежать от автомобиля при угрозе взрыва?',
    options: [
      'На 5 метров',
      'На 10 метров',
      'На 15–30 метров',
      'На 50 метров'
    ],
    correctIndex: 2
  },
  {
    text: 'Что нужно сделать с освещением и экраном телефона при угрозе БПЛА в темное время суток?',
    options: [
      'Включить фонарик, чтобы осветить путь',
      'Полностью погасить свет и минимизировать яркость экрана',
      'Оставить включенным только экран телефона',
      'Включить дальний свет фар автомобиля'
    ],
    correctIndex: 1
  },
  {
    text: 'Почему нельзя курить на улице в темное время суток при угрозе БПЛА?',
    options: [
      'Это может вызвать пожар',
      'Тепловизор дрона легко зафиксирует тлеющую сигарету',
      'Дым привлечет внимание животных',
      'Это запрещено только на территории предприятия'
    ],
    correctIndex: 1
  },
  {
    text: 'Вы обнаружили упавший беспилотник (или его обломок). Какое действие необходимо выполнить ПЕРВЫМ ДЕЛОМ?',
    options: [
      'Сфотографировать его на телефон для отчета',
      'Замри, не делай ни шагу вперед, оцени обстановку под ногами',
      'Пнуть его ногой, чтобы проверить, не взорвется ли',
      'Позвонить по рации коллегам'
    ],
    correctIndex: 1
  },
  {
    text: 'Почему нельзя пользоваться мобильным телефоном или рацией вблизи упавшего БПЛА?',
    options: [
      'Из-за помех в сети',
      'Радиосигнал может активировать электронный взрыватель',
      'Это отвлекает от наблюдения за небом',
      'Это приведет к разрядке аккумулятора'
    ],
    correctIndex: 1
  },
  {
    text: 'На какое минимальное расстояние необходимо отойти от упавшего БПЛА или его обломков?',
    options: [
      'На 10 метров',
      'На 50 метров',
      'На 100 метров',
      'На 300 метров'
    ],
    correctIndex: 2
  },
  {
    text: 'Как необходимо передвигаться в помещении, если произошел взрыв и началось задымление?',
    options: [
      'В полный рост, быстро бегом к выходу',
      'Ползком или на четвереньках вдоль несущих стен',
      'По стенам, держась за них руками',
      'Пригнувшись, но не опускаясь на пол'
    ],
    correctIndex: 1
  },
  {
    text: 'Что нужно делать под завалом, чтобы спасатели вас обнаружили?',
    options: [
      'Постоянно громко кричать',
      'Стучать металлическим предметом по бетону или трубе с ритмичными паузами',
      'Свистеть в свисток без остановки',
      'Включить камеру телефона со вспышкой'
    ],
    correctIndex: 1
  },
  {
    text: 'Почему при угрозе БПЛА на объекте нельзя пускать на территорию людей, которых нет в официальных списках?',
    options: [
      'Они могут украсть имущество',
      'В случае ЧС спасатели не будут их искать, а руководитель понесет уголовную ответственность',
      'Они займут места в укрытии',
      'Они могут вызвать панику'
    ],
    correctIndex: 1
  },
  {
    text: 'В какой режим должна переводиться система контроля управления доступом (СКУД) при чрезвычайной ситуации?',
    options: [
      'В режим полной блокировки',
      'В режим «Антипаника» (открытие всех дверей и снятие блокировок)',
      'В режим ожидания',
      'СКУД не должна отключаться ни при каких обстоятельствах'
    ],
    correctIndex: 1
  },
  {
    text: 'Что обязан сделать руководитель или ответственный за объект при прибытии расчетов МЧС?',
    options: [
      'Скрыть наличие опасных веществ, чтобы не усложнять ситуацию',
      'Быстро передать сводку: количество людей внутри, статус коммуникаций, наличие взрывоопасных веществ',
      'Покинуть место происшествия, чтобы не мешать',
      'Требовать от МЧС немедленно начать разбор завалов'
    ],
    correctIndex: 1
  }
];

/* ════════════════════════════════════════════════════════════
   2. КОНФИГУРАЦИЯ
════════════════════════════════════════════════════════════ */

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxdNZP-aaxv3eR6hjS3RP_7pm5IC67DBTbA0oL0MDqojiEbZVtoG3qSzLEyvm10VlG5sA/exec'; // Сюда вставите новую ссылку

/** Порог прохождения: 85% = 17 правильных из 20 */
const PASS_THRESHOLD = 0.85;
const TOTAL_QUESTIONS = QUESTIONS.length; // 20

/* ════════════════════════════════════════════════════════════
   3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
════════════════════════════════════════════════════════════ */
const state = {
  currentScene: 1,
  consentGiven: false,
  userData: {
    fullName:     '',
    organization: '',
    position:     '',
    department:   '',
    birthDate:    '',
    hireDate:     ''
  },
  answers: [],
  currentQuestionIndex: 0
};

/* ════════════════════════════════════════════════════════════
   4. DOM-ССЫЛКИ
════════════════════════════════════════════════════════════ */
const sceneMap = {
  1: document.getElementById('scene-welcome'),
  2: document.getElementById('scene-consent'),
  3: document.getElementById('scene-form'),
  4: document.getElementById('scene-quiz'),
  5: document.getElementById('scene-result')
};

const btnStart       = document.getElementById('btn-start');
const btnConsentCont = document.getElementById('btn-consent-continue');
const btnFormSubmit  = document.getElementById('btn-form-submit');
const btnNext        = document.getElementById('btn-next');
const btnNextLabel   = document.getElementById('btn-next-label');
const btnRetry       = document.getElementById('btn-retry');

const consentCheckbox = document.getElementById('consent-checkbox');

const inputFullname   = document.getElementById('input-fullname');
const inputOrg        = document.getElementById('input-org');
const inputPosition   = document.getElementById('input-position');
const inputDepartment = document.getElementById('input-department');
const inputBirthdate  = document.getElementById('input-birthdate');
const inputHiredate   = document.getElementById('input-hiredate');

const quizCounter      = document.getElementById('quiz-counter');
const progressBarFill  = document.getElementById('progress-bar-fill');
const progressBarTrack = document.getElementById('progress-bar-track');
const questionCard     = document.getElementById('question-card');
const questionNumber   = document.getElementById('question-number');
const questionText     = document.getElementById('question-text');
const optionsList      = document.getElementById('options-list');

const resultIconWrap = document.getElementById('result-icon-wrap');
const resultTitle    = document.getElementById('result-title');
const resultText     = document.getElementById('result-text');
const scoreNumber    = document.getElementById('score-number');
const scoreRingFill  = document.getElementById('score-ring-fill');
const statCorrect    = document.getElementById('stat-correct');
const statPercent    = document.getElementById('stat-percent');
const statStatus     = document.getElementById('stat-status');
const submitStatus   = document.getElementById('submit-status');

/* ════════════════════════════════════════════════════════════
   5. УПРАВЛЕНИЕ СЦЕНАМИ
════════════════════════════════════════════════════════════ */
function showScene(n) {
  Object.entries(sceneMap).forEach(([idx, scene]) => {
    if (!scene) return;
    if (Number(idx) === n) {
      scene.classList.add('active');
      scene.removeAttribute('aria-hidden');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      scene.classList.remove('active');
      scene.setAttribute('aria-hidden', 'true');
    }
  });
  state.currentScene = n;
}

/* ════════════════════════════════════════════════════════════
   6. СЦЕНА 2: СОГЛАСИЕ НА ОБРАБОТКУ ПДн
════════════════════════════════════════════════════════════ */
function updateConsentButton() {
  const checked = consentCheckbox.checked;
  state.consentGiven = checked;
  btnConsentCont.disabled = !checked;
  btnConsentCont.setAttribute('aria-disabled', String(!checked));
}
consentCheckbox.addEventListener('change', updateConsentButton);

/* ════════════════════════════════════════════════════════════
   7. СЦЕНА 3: ВАЛИДАЦИЯ ФОРМЫ
════════════════════════════════════════════════════════════ */
const formFields = [
  inputFullname, inputOrg, inputPosition,
  inputDepartment, inputBirthdate, inputHiredate
];

function validateForm() {
  const allFilled = formFields.every(f => f.value.trim() !== '');
  btnFormSubmit.disabled = !allFilled;
  btnFormSubmit.setAttribute('aria-disabled', String(!allFilled));
}

formFields.forEach(field => {
  field.addEventListener('input', validateForm);
  field.addEventListener('change', validateForm);
});

function collectFormData() {
  state.userData.fullName     = inputFullname.value.trim();
  state.userData.organization = inputOrg.value.trim();
  state.userData.position     = inputPosition.value.trim();
  state.userData.department   = inputDepartment.value.trim();
  state.userData.birthDate    = inputBirthdate.value;
  state.userData.hireDate     = inputHiredate.value;
}

/* ════════════════════════════════════════════════════════════
   8. СЦЕНА 4: ЛОГИКА ТЕСТА
════════════════════════════════════════════════════════════ */
function startQuiz() {
  state.answers = [];
  state.currentQuestionIndex = 0;
  renderQuestion(0);
}

function renderQuestion(index) {
  const q = QUESTIONS[index];
  const num = index + 1;

  quizCounter.textContent = `Вопрос ${num} из ${TOTAL_QUESTIONS}`;
  const pct = (index / TOTAL_QUESTIONS) * 100;
  progressBarFill.style.width = pct + '%';
  progressBarTrack.setAttribute('aria-valuenow', String(index));

  questionNumber.textContent = 'Вопрос ' + String(num).padStart(2, '0');
  questionText.textContent = q.text;

  optionsList.innerHTML = '';
  q.options.forEach((optText, optIdx) => {
    const label = document.createElement('label');
    label.className = 'option-label';
    label.setAttribute('for', `opt-${index}-${optIdx}`);

    const radio = document.createElement('input');
    radio.type      = 'radio';
    radio.name      = `q${index}`;
    radio.id        = `opt-${index}-${optIdx}`;
    radio.value     = String(optIdx);
    radio.className = 'option-radio';
    if (state.answers[index] === optIdx) radio.checked = true;

    radio.addEventListener('change', () => onOptionSelect(index, optIdx));

    const marker = document.createElement('span');
    marker.className = 'option-marker';
    marker.setAttribute('aria-hidden', 'true');

    const textSpan = document.createElement('span');
    textSpan.className   = 'option-text';
    textSpan.textContent = optText;

    label.appendChild(radio);
    label.appendChild(marker);
    label.appendChild(textSpan);
    optionsList.appendChild(label);
  });

  updateNextButton(index);
  btnNextLabel.textContent = (index === TOTAL_QUESTIONS - 1) ? 'Завершить тест' : 'Далее';
}

function onOptionSelect(qIdx, optIdx) {
  state.answers[qIdx] = optIdx;
  updateNextButton(qIdx);
}

function updateNextButton(index) {
  const answered = state.answers[index] !== undefined;
  btnNext.disabled = !answered;
  btnNext.setAttribute('aria-disabled', String(!answered));
}

function goToNextQuestion() {
  const cur = state.currentQuestionIndex;

  if (cur < TOTAL_QUESTIONS - 1) {
    questionCard.classList.add('leaving');
    setTimeout(() => {
      questionCard.classList.remove('leaving');
      state.currentQuestionIndex = cur + 1;
      renderQuestion(state.currentQuestionIndex);
    }, 250);
  } else {
    showResults();
  }
}

/* ════════════════════════════════════════════════════════════
   9. СЦЕНА 5: РЕЗУЛЬТАТЫ
════════════════════════════════════════════════════════════ */
function calculateResult() {
  let correct = 0;
  QUESTIONS.forEach((q, idx) => {
    if (state.answers[idx] === q.correctIndex) correct++;
  });
  const percent = Math.round((correct / TOTAL_QUESTIONS) * 100);
  const passed  = (correct / TOTAL_QUESTIONS) >= PASS_THRESHOLD;
  return { correct, percent, passed };
}

function showResults() {
  const { correct, percent, passed } = calculateResult();

  showScene(5);

  resultIconWrap.textContent = passed ? '🎉' : '😔';

  resultTitle.className   = 'result-title ' + (passed ? 'success' : 'failure');
  resultTitle.textContent = passed
    ? 'Поздравляем! Тест сдан успешно.'
    : 'Тест не сдан.';

  resultText.textContent = passed
    ? 'Вы успешно прошли итоговый тест по действиям при угрозе БПЛА. Ваши результаты сохранены в системе.'
    : `Вы ответили правильно на ${correct} из ${TOTAL_QUESTIONS} вопросов. ` +
      'Рекомендуем освежить знания по материалам инструктажа и попробовать ещё раз. ' +
      'У вас обязательно получится!';

  scoreNumber.textContent = String(correct);
  statCorrect.textContent = `${correct} из ${TOTAL_QUESTIONS}`;
  statPercent.textContent = percent + '%';
  statStatus.textContent  = passed ? 'Сдал / Сдала' : 'Не сдан';
  statStatus.className    = 'stat-value stat-status ' + (passed ? 'success' : 'failure');

  const offset = 314 - (percent / 100) * 314;
  scoreRingFill.className = 'score-ring-fill ' + (passed ? 'success' : 'failure');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreRingFill.style.strokeDashoffset = String(offset);
    });
  });

  progressBarFill.style.width = '100%';
  progressBarTrack.setAttribute('aria-valuenow', String(TOTAL_QUESTIONS));

  submitStatus.textContent = '';
  submitStatus.className   = 'submit-status';

  const payload = {
    fullName:       state.userData.fullName,
    organization:   state.userData.organization,
    position:       state.userData.position,
    department:     state.userData.department,
    birthDate:      state.userData.birthDate,
    hireDate:       state.userData.hireDate,
    correctAnswers: correct,
    totalQuestions: TOTAL_QUESTIONS,
    percent:        percent,
    passed:         passed,
    timestamp:      new Date().toISOString()
  };

  sendResultsToGoogleSheets(payload);
}

/* ════════════════════════════════════════════════════════════
   10. ОТПРАВКА ДАННЫХ В GOOGLE SHEETS
════════════════════════════════════════════════════════════ */
async function sendResultsToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL === 'YOUR_DEPLOYED_APPS_SCRIPT_URL') {
    console.warn('[Quiz] Google Apps Script URL не настроен. Данные не отправлены.');
    submitStatus.textContent = '⚠ URL Google Sheets не настроен (см. README.md)';
    submitStatus.className   = 'submit-status error';
    return;
  }

  submitStatus.textContent = '⏳ Сохранение результатов...';
  submitStatus.className   = 'submit-status sending';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method:  'POST',
      mode:    'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload)
    });
    console.log('[Quiz] Данные отправлены в Google Sheets:', payload);
    submitStatus.textContent = '✅ Результаты сохранены в системе';
    submitStatus.className   = 'submit-status sent';
  } catch (error) {
    console.error('[Quiz] Ошибка отправки данных:', error);
    submitStatus.textContent = '⚠ Не удалось сохранить результаты. Обратитесь к ответственному за безопасность.';
    submitStatus.className   = 'submit-status error';
  }
}

/* ════════════════════════════════════════════════════════════
   11. СБРОС И ПЕРЕЗАПУСК
════════════════════════════════════════════════════════════ */
function resetApp() {
  state.consentGiven         = false;
  state.userData             = { fullName: '', organization: '', position: '', department: '', birthDate: '', hireDate: '' };
  state.answers              = [];
  state.currentQuestionIndex = 0;

  [inputFullname, inputOrg, inputPosition, inputDepartment, inputBirthdate, inputHiredate]
    .forEach(f => { f.value = ''; });
  validateForm();

  consentCheckbox.checked = false;
  updateConsentButton();

  scoreRingFill.style.strokeDashoffset = '314';
  scoreRingFill.className = 'score-ring-fill';

  showScene(1);
}

/* ════════════════════════════════════════════════════════════
   12. ОБРАБОТЧИКИ СОБЫТИЙ
════════════════════════════════════════════════════════════ */
btnStart.addEventListener('click', () => showScene(2));

btnConsentCont.addEventListener('click', () => {
  if (state.consentGiven) showScene(3);
});

btnFormSubmit.addEventListener('click', () => {
  collectFormData();
  startQuiz();
  showScene(4);
});

btnNext.addEventListener('click', () => {
  if (!btnNext.disabled) goToNextQuestion();
});

btnRetry.addEventListener('click', resetApp);

document.getElementById('user-form').addEventListener('submit', e => e.preventDefault());

/* ════════════════════════════════════════════════════════════
   13. ИНИЦИАЛИЗАЦИЯ
════════════════════════════════════════════════════════════ */
function init() {
  showScene(1);
  updateConsentButton();
  validateForm();
  btnNext.disabled = true;
  btnNext.setAttribute('aria-disabled', 'true');
  console.log('[Quiz] Приложение инициализировано. Вопросов:', TOTAL_QUESTIONS);
}

document.addEventListener('DOMContentLoaded', init);