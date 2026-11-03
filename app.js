/**
 * app.js — SPA «Итоговый тест: Первая помощь»
 * Логика: банк из 43 вопросов, рандомизация, обучающие объяснения.
 */

/* ════════════════════════════════════════════════════════════
   1. БАНК ВОПРОСОВ (43 вопроса на основе лекции)
   correctIndex — число (один ответ) или массив чисел (несколько).
   explanation — подробный разбор для запоминания.
════════════════════════════════════════════════════════════ */
const QUESTION_BANK = [
  {
    id: 'q1',
    text: 'Главный враг в экстренной ситуации, из-за которого теряются драгоценные секунды?',
    options: ['Паника и страх сделать хуже', 'Сама травма', 'Отсутствие аптечки', 'Плохая связь'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Главный враг — это паника и страх. Именно они мешают действовать. Вы не врач, ваша задача — быть спасательным мостом до приезда профессионалов.'
  },
  {
    id: 'q2',
    text: 'Сколько времени есть на спасение мозга при остановке сердца?',
    options: ['4–5 минут', '10–15 минут', '30 минут', '1 час'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Мозг погибает всего за 4–5 минут без кислорода. Скорая физически не успеет приехать за это время, поэтому первая помощь очевидца критически важна.'
  },
  {
    id: 'q3',
    text: 'Кто вправе оказывать первую помощь пострадавшему?',
    options: ['Любой человек', 'Только врач скорой помощи', 'Только сотрудник, прошедший спецкурс', 'Только руководитель'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Закон говорит однозначно: оказывать первую помощь вправе любой человек. Для этого не нужен диплом хирурга. Ваши действия защищены законом.'
  },
  {
    id: 'q4',
    text: 'Можно ли оказывать первую помощь без разрешения пострадавшего?',
    options: ['Да, если он без сознания и не может ответить', 'Да, всегда', 'Нет, никогда', 'Только с разрешения полиции'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Работает правило «подразумеваемого согласия». Если человек без сознания, считается, что он хотел бы остаться в живых. Если он в сознании — вы обязаны спросить.'
  },
  {
    id: 'q5',
    text: 'Что делать, если пострадавший агрессивен и отталкивает вас?',
    options: ['Отойти, не рисковать собой и сообщить в полицию', 'Связать его и оказать помощь', 'Ударить в ответ', 'Кричать на него'],
    correctIndex: 0,
    explanation: '✅ **Верно.** У спасателей есть железное правило: ваша жизнь в приоритете. Если человек агрессивен — отойдите и вызовите полицию. Вы не обязаны рисковать собой.'
  },
  {
    id: 'q6',
    text: 'Что нужно сделать ПЕРВЫМ делом при обнаружении пострадавшего?',
    options: ['Осмотреть место происшествия и убедиться в своей безопасности', 'Проверить пульс', 'Позвонить руководителю', 'Начать непрямой массаж сердца'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Прежде чем бежать спасать, остановитесь. Искрящий кабель, газ, падающие конструкции — мертвый спасатель никому не поможет. Сначала оценка обстановки.'
  },
  {
    id: 'q7',
    text: 'По какому номеру вызывать экстренные службы?',
    options: ['112', '101', '102', '103'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Единый номер экстренных служб — 112. Он должен быть в быстром наборе у каждого.'
  },
  {
    id: 'q8',
    text: 'Что из перечисленного относится к экстренным службам?',
    options: ['Скорая помощь, Полиция, МЧС', 'ЖКХ, Водоканал', 'Управляющая компания', 'Отдел кадров'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Экстренные службы — те, что спасают жизни (Скорая, Полиция, МЧС). Коммунальщики экстренными не являются.'
  },
  {
    id: 'q9',
    text: 'Какие два самых критичных пункта нужно назвать диспетчеру скорой?',
    options: ['Точный адрес и количество пострадавших', 'Свой диагноз и стаж', 'Время происшествия и ФИО', 'Погоду и самочувствие'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Точный адрес и количество пострадавших — база. Если пострадавших трое, а приедет одна бригада, врачам придется выбирать, кого спасать.'
  },
  {
    id: 'q10',
    text: 'Можно ли ставить диагноз по телефону при вызове скорой?',
    options: ['Нет, нужно просто описать, что видите', 'Да, это ускорит приезд', 'Да, если вы медик', 'Нет, нужно только назвать адрес'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Не ставьте диагнозы по телефону. Просто опишите, что видите («лежит без сознания», «сильно течет кровь из ноги»). Диспетчер сам направит нужную бригаду.'
  },
  {
    id: 'q11',
    text: 'Когда можно класть трубку при разговоре с диспетчером скорой?',
    options: ['Только когда диспетчер разрешит', 'Сразу после вызова', 'Как только назовете адрес', 'Через 1 минуту'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Никогда не кладите трубку первым. Диспетчер может координировать ваши действия и давать инструкции по оказанию помощи прямо по телефону.'
  },
  {
    id: 'q12',
    text: 'Как проверить, находится ли пострадавший без сознания?',
    options: ['Громко окликнуть и аккуратно встряхнуть за плечи', 'Похлопать по щекам', 'Пощекотать', 'Проверить пульс на запястье'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Главный признак — отсутствие реакции на голос и встряхивание. Если реакции нет — мозг отключен, переходим в экстренный режим.'
  },
  {
    id: 'q13',
    text: 'Что нужно сделать ПЕРЕД тем, как проверять дыхание у пострадавшего без сознания?',
    options: ['Запрокинуть голову и поднять подбородок', 'Уложить на живот', 'Дать воды', 'Расстегнуть ремень'],
    correctIndex: 0,
    explanation: '✅ **Верно.** У человека без сознания расслабляются мышцы, и корень языка перекрывает дыхательные пути. Если не запрокинуть голову, вы не услышите дыхание.'
  },
  {
    id: 'q14',
    text: 'Как правильно проверять дыхание у пострадавшего?',
    options: ['Слышу, ощущаю, вижу (в течение 10 секунд)', 'С помощью зеркальца', 'С помощью перышка', 'По пульсу на руке'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Прием «Слышу, ощущаю, вижу»: наклониться, слушать дыхание, чувствовать его щекой и смотреть на движение грудной клетки. Ровно 10 секунд.'
  },
  {
    id: 'q15',
    text: 'Почему нельзя проверять дыхание с помощью зеркальца или перышка?',
    options: ['Есть риск неправильно оценить состояние', 'Это слишком долго', 'Это неудобно', 'Это запрещено законом'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Зеркало может запотеть от ваших рук, а перышко сдует ветер. Вы потеряете драгоценное время. Это смертельно опасный миф из кино.'
  },
  {
    id: 'q16',
    text: 'Где нужно проверять пульс у пострадавшего, если вы это делаете?',
    options: ['На сонной артерии (на шее)', 'На запястье', 'На виске', 'На стопе'],
    correctIndex: 0,
    explanation: '✅ **Верно.** На запястье пульс при падении давления пропадает. Правильно проверять пульс на сонной артерии и наличие дыхания.'
  },
  {
    id: 'q17',
    text: 'Что нужно сделать при обмороке? Выберите два верных варианта.',
    options: ['Положить на спину, поднять ноги выше головы', 'Вызвать скорую и контролировать пульс', 'Ударить по щекам', 'Облить водой'],
    correctIndex: [0, 1],
    explanation: '✅ **Верно.** При обмороке мозгу не хватает крови. Поднимите ноги, чтобы кровь прилила к голове, откройте окна. Обязательно вызовите скорую. ❌ Пощечины и вода — бесполезные действия из фильмов.'
  },
  {
    id: 'q18',
    text: 'Когда стоит предполагать наступление комы?',
    options: ['Если без сознания более 4 минут или время неизвестно', 'Если без сознания менее 4 минут', 'Если человек просто спит', 'Если он не хочет говорить'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Грань между обмороком и комой — время. Если прошло более 4 минут или вы не знаете, сколько времени прошло, всегда предполагайте кому и вызывайте медиков.'
  },
  {
    id: 'q19',
    text: 'Установите правильную последовательность действий при остановке сердца (СЛР).',
    options: ['Сознание → Дых. пути → Дыхание → Скорая → Компрессия', 'Скорая → Дыхание → Сознание', 'Компрессия → Сознание → Дыхание', 'Дыхание → Компрессия → Скорая'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Алгоритм строгий: проверяем сознание, открываем дыхательные пути, проверяем дыхание, вызываем скорую, начинаем компрессию грудной клетки.'
  },
  {
    id: 'q20',
    text: 'До какого момента нужно проводить сердечно-лёгочную реанимацию (СЛР)? Выберите несколько вариантов.',
    options: ['Пока не приедет скорая', 'Пока не появится пульс', 'Пока есть собственные силы', 'Пока не пройдет 4-8 минут'],
    correctIndex: [0, 1, 2],
    explanation: '✅ **Верно.** СЛР проводится до приезда профессионалов, до появления пульса или пока у вас есть силы. ❌ Ориентироваться на время (4-8 минут) — неверно.'
  },
  {
    id: 'q21',
    text: 'В каких случаях НЕ появляются трупные пятна? Выберите три варианта.',
    options: ['Пострадавший лежит на морозе', 'Пострадавший утонул', 'Пострадавший потерял много крови', 'У пострадавшего много переломов'],
    correctIndex: [0, 1, 2],
    explanation: '✅ **Верно.** Трупные пятна не появляются при переохлаждении, утоплении и массивной кровопотере. В этих случаях человек может выглядеть безжизненно бледным, но его еще можно спасти!'
  },
  {
    id: 'q22',
    text: 'Какие две главные смертельные опасности связаны с кровотечением?',
    options: ['Потеря крови', 'Занесение инфекции', 'Порча одежды', 'Невозможность наложить повязку'],
    correctIndex: [0, 1],
    explanation: '✅ **Верно.** Смертельные опасности — потеря крови (падение давления) и инфекция. Поэтому нельзя заливать глубокую рану йодом (сожжете ткани), нужно остановить кровь и закрыть вход бактериям.'
  },
  {
    id: 'q23',
    text: 'Как отличить артериальное кровотечение?',
    options: ['Ярко-алая кровь, вытекает сильной пульсирующей струей', 'Тёмно-вишнёвая кровь, медленная струя', 'Слабое истечение крови', 'Крови не видно'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Артериальное — самое опасное: алая, пульсирующая струя. Венозное — темная, медленная. Капиллярное — слабое истечение (ссадины).'
  },
  {
    id: 'q24',
    text: 'Какие признаки указывают на внутреннее кровотечение?',
    options: ['Слабость, бледная кожа, холодный пот, частый пульс', 'Алая струя крови', 'Тёмная кровь из раны', 'Ссадина на колене'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Крови не видно, но человек бледнеет, покрывается холодным потом, дышит часто. Это внутреннее кровотечение — нужна срочная помощь хирургов.'
  },
  {
    id: 'q25',
    text: 'Где можно эффективно передавить артерию для остановки кровотечения? Выберите три места.',
    options: ['В области шеи (сонная артерия)', 'В подмышечной области', 'В области паха', 'Под коленом'],
    correctIndex: [0, 1, 2],
    explanation: '✅ **Верно.** Артерию нужно прижимать к кости там, где она близко: шея, подмышка, пах. Это «природные вентили».'
  },
  {
    id: 'q26',
    text: 'Можно ли извлекать инородное тело (стекло, нож) из раны?',
    options: ['Нет, нельзя', 'Да, чтобы остановить кровь', 'Можно, но очень осторожно', 'Да, если продезинфицировать'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Инородное тело — это «пробка», сдерживающая смертельное кровотечение. Вытащите — кровь хлынет. Его нужно зафиксировать бинтами и оставить хирургам.'
  },
  {
    id: 'q27',
    text: 'Обязательно ли включать в состав аптечки марлевый бинт?',
    options: ['Да, обязательно', 'Нет, достаточно пластыря', 'По усмотрению руководителя', 'Только если есть раны'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Бинт — фундамент спасения. Ни один пластырь не создаст давления для остановки серьезного кровотечения. Нет бинта — нечем давить на рану.'
  },
  {
    id: 'q28',
    text: 'Пострадавший получил удар током, но чувствует себя нормально. Нужно ли вызывать скорую?',
    options: ['Да, обязательно', 'Нет, если он в сознании', 'Только если есть ожоги', 'Только если он потерял сознание'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Вызов врача обязателен ВСЕГДА при электротравме, независимо от состояния. Ток может вызвать фатальную аритмию спустя несколько часов.'
  },
  {
    id: 'q29',
    text: 'Что нельзя делать, если грузоподъемная машина попала под напряжение? Выберите три варианта.',
    options: ['Спускаться с неё на землю', 'Подниматься на неё до снятия напряжения', 'Прикасаться к ней', 'Дожидаться снятия напряжения'],
    correctIndex: [0, 1, 2],
    explanation: '✅ **Верно.** Нельзя спускаться, подниматься и прикасаться. Вы станете проводником тока. Единственное правильное действие — оставаться на месте и ждать обесточивания.'
  },
  {
    id: 'q30',
    text: 'В какой последовательности нужно осматривать пострадавшего при падении с высоты?',
    options: ['Голова → шея → грудь → живот → конечности', 'Ноги → руки → живот → голова', 'Сразу к сломанной ноге', 'Спина → ноги → голова'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Правило «сверху вниз». Сначала голова (мозг), затем шея (спинной мозг), грудь, живот и только потом конечности. Перелом ноги не убьет за минуту, а перелом шеи — убьет.'
  },
  {
    id: 'q31',
    text: 'Как правильно промывать глаза при химическом ожоге?',
    options: ['От переносицы к виску', 'От виска к переносице', 'Не промывать, наложить повязку', 'Промывать только холодной водой'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Промывать нужно от носа к периферии (к виску), чтобы ядовитая вода не стекала на второй, здоровый глаз.'
  },
  {
    id: 'q32',
    text: 'Какую повязку накладывают при химическом ожоге глаз?',
    options: ['Обязательно на оба глаза', 'Только на поврежденный глаз', 'Не накладывают повязку', 'Только на здоровый глаз'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Повязку накладывают на оба глаза, даже если пострадал один. Глазные яблоки двигаются синхронно, и здоровый глаз будет травмировать поврежденный.'
  },
  {
    id: 'q33',
    text: 'Что нужно сделать при обморожении? Выберите два верных варианта.',
    options: ['Переместить в теплое помещение, дать теплое питье', 'Укрыть поврежденные места ватой, одеялом', 'Растереть снегом', 'Опустить в горячую воду'],
    correctIndex: [0, 1],
    explanation: '✅ **Верно.** Согревать нужно изнутри (теплое питье) и медленно снаружи (укутать). ❌ Растирать снегом или горячей водой категорически запрещено! Ткани омертвеют.'
  },
  {
    id: 'q34',
    text: 'Установите правильный порядок слоев теплоизолирующей повязки при обморожении.',
    options: ['Стерильный материал → Вата → Клеенка → Шерстяная ткань', 'Шерстяная ткань → Клеенка → Вата → Стерильный материал', 'Вата → Стерильный материал → Шерсть → Клеенка', 'Клеенка → Шерсть → Вата → Стерильный материал'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Слои строго по порядку: стерильный материал (к телу), толстый слой ваты (воздушная подушка), клеенка (блокирует теплообмен), шерстяная ткань (утепляет сверху).'
  },
  {
    id: 'q35',
    text: 'Что делать при потере сознания от теплового удара?',
    options: ['Повернуть на бок (чтобы не запал язык)', 'Оставить на спине', 'Дать холодной воды', 'Усадить'],
    correctIndex: 0,
    explanation: '✅ **Верно.** При потере сознания от теплового удара человека нужно повернуть на бок, чтобы он не задохнулся от западения языка или рвотных масс.'
  },
  {
    id: 'q36',
    text: 'Можно ли бить по спине подавившегося человека, если он сидит прямо?',
    options: ['Нет, предмет провалится еще глубже', 'Да, это помогает', 'Да, но только кулаком', 'Да, если ударить сильно'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Бить по спине сидящего прямо человека категорически нельзя! От удара по вертикальной трахее предмет провалится глубже. Сначала нужно наклонить пострадавшего.'
  },
  {
    id: 'q37',
    text: 'Каким образом наносятся удары по спине при попадании инородного тела в дыхательные пути?',
    options: ['Основанием открытой ладони', 'Кулаком', 'Ребром ладони', 'Пальцами'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Бьем именно основанием открытой ладони (не кулаком и не ребром), чтобы не сломать ребра и не повредить позвоночник.'
  },
  {
    id: 'q38',
    text: 'В чем заключается прием Геймлиха (эффект поршня)?',
    options: ['Резкое надавливание на живот в направлении внутрь и кверху', 'Удары по спине', 'Надавливание на грудину', 'Искусственное дыхание'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Встать сзади, обхватить руками на уровне нижних ребер и резко надавить на живот внутрь и кверху. Остаточный воздух в легких вытолкнет предмет, как пробку.'
  },
  {
    id: 'q39',
    text: 'Какая особенность спасения ребенка старше 1 года при удушье?',
    options: ['Дозировать усилия и проверять результат после каждого удара', 'Бить со всей взрослой силы', 'Не наклонять ребенка', 'Сразу делать искусственное дыхание'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Дети — не уменьшенные копии взрослых. Силу нужно строго дозировать, а после каждого удара проверять, не вылетел ли предмет. Если вылетел — прекратить удары.'
  },
  {
    id: 'q40',
    text: 'Что нужно сделать после успешного спасения подавившегося человека?',
    options: ['Вызвать скорую для осмотра', 'Ничего, можно отпустить', 'Дать воды', 'Уложить спать'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Даже если все закончилось хорошо, трахея могла быть травмирована. Врачи обязаны осмотреть спасенного. Вызов скорой обязателен.'
  },
  {
    id: 'q41',
    text: 'Какие действия запрещены при оказании помощи подавившемуся человеку?',
    options: ['Лезть пальцами в рот и вызывать рвоту', 'Наклонить человека вперед', 'Ударить основанием ладони по спине', 'Сделать толчки в живот'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Нельзя лезть пальцами в рот (протолкнете предмет глубже) и вызывать рвоту (рвотные массы забьют дыхательные пути).'
  },
  {
    id: 'q42',
    text: 'Соотнесите термин и определение: «Ссадина» — это...',
    options: ['Неглубокие раны с повреждением поверхностных слоев кожи, нанесенные плоским предметом', 'Глубокое нарушение целости кожи с повреждением тканей', 'Потеря крови из-за повреждения сосудов', 'Тонкая линия от острого предмета'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Ссадина — это поверхностное повреждение (например, при падении на асфальт). Глубокое нарушение — это рана. Потеря крови — кровотечение.'
  },
  {
    id: 'q43',
    text: 'Соотнесите вид отравления и путь проникновения: «Отравление газом» — это...',
    options: ['Через дыхательные пути', 'Через пищеварительный тракт', 'Через кожу и слизистые', 'Через укус'],
    correctIndex: 0,
    explanation: '✅ **Верно.** Отравление газом всегда происходит через дыхательные пути. Пищевое — через ЖКТ. Химическое — через кожу и слизистые.'
  }
];

/* ════════════════════════════════════════════════════════════
   2. КОНФИГУРАЦИЯ
════════════════════════════════════════════════════════════ */
// Вставьте сюда ваш URL от Google Apps Script
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/ВАШ_НОВЫЙ_URL_ЗДЕСЬ/exec'; 
const PASS_THRESHOLD = 0.85;
const TOTAL_QUESTIONS = 20; // Сколько вопросов выпадает на тест

/* ════════════════════════════════════════════════════════════
   3. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
════════════════════════════════════════════════════════════ */
const state = {
  consentGiven: false,
  userData: {},
  answers: [], // Массив массивов выбранных индексов
  currentQuestionIndex: 0,
  currentQuiz: [], // Выбранные 20 вопросов с перемешанными вариантами
  isAnswered: false // Флаг, ответил ли пользователь на текущий вопрос
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

const btnStart = document.getElementById('btn-start');
const btnConsentCont = document.getElementById('btn-consent-continue');
const btnFormSubmit = document.getElementById('btn-form-submit');
const btnNext = document.getElementById('btn-next');
const btnNextLabel = document.getElementById('btn-next-label');
const btnRetry = document.getElementById('btn-retry');

const consentCheckbox = document.getElementById('consent-checkbox');
const inputs = {
  fullName: document.getElementById('input-fullname'),
  org: document.getElementById('input-org'),
  position: document.getElementById('input-position'),
  department: document.getElementById('input-department'),
  birthdate: document.getElementById('input-birthdate'),
  hiredate: document.getElementById('input-hiredate')
};

const quizCounter = document.getElementById('quiz-counter');
const progressBarFill = document.getElementById('progress-bar-fill');
const progressBarTrack = document.getElementById('progress-bar-track');
const questionCard = document.getElementById('question-card');
const questionNumber = document.getElementById('question-number');
const questionText = document.getElementById('question-text');
const optionsList = document.getElementById('options-list');
const explanationBox = document.getElementById('explanation-box');

const resultIconWrap = document.getElementById('result-icon-wrap');
const resultTitle = document.getElementById('result-title');
const resultText = document.getElementById('result-text');
const scoreNumber = document.getElementById('score-number');
const scoreRingFill = document.getElementById('score-ring-fill');
const statCorrect = document.getElementById('stat-correct');
const statPercent = document.getElementById('stat-percent');
const statStatus = document.getElementById('stat-status');
const submitStatus = document.getElementById('submit-status');

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
}

/* ════════════════════════════════════════════════════════════
   6. СОГЛАСИЕ И ФОРМА
════════════════════════════════════════════════════════════ */
consentCheckbox.addEventListener('change', () => {
  state.consentGiven = consentCheckbox.checked;
  btnConsentCont.disabled = !state.consentGiven;
});

const formFields = Object.values(inputs);
function validateForm() {
  const allFilled = formFields.every(f => f.value.trim() !== '');
  btnFormSubmit.disabled = !allFilled;
}
formFields.forEach(f => f.addEventListener('input', validateForm));

/* ════════════════════════════════════════════════════════════
   7. ЛОГИКА ТЕСТА (РАНДОМИЗАЦИЯ И ОБЪЯСНЕНИЯ)
════════════════════════════════════════════════════════════ */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function startQuiz() {
  // Выбираем 20 случайных вопросов
  const selected = shuffleArray(QUESTION_BANK).slice(0, TOTAL_QUESTIONS);
  
  // Перемешиваем варианты ответов внутри каждого вопроса
  state.currentQuiz = selected.map(q => {
    const shuffledOptions = shuffleArray(q.options.map((text, idx) => ({
      text,
      originalIndex: idx
    })));
    return { ...q, shuffledOptions };
  });

  state.currentQuestionIndex = 0;
  state.answers = new Array(TOTAL_QUESTIONS).fill(null);
  renderQuestion(0);
}

function renderQuestion(index) {
  const q = state.currentQuiz[index];
  state.isAnswered = false;

  // Обновляем UI
  quizCounter.textContent = `Вопрос ${index + 1} из ${TOTAL_QUESTIONS}`;
  progressBarFill.style.width = `${(index / TOTAL_QUESTIONS) * 100}%`;
  progressBarTrack.setAttribute('aria-valuenow', String(index));
  questionNumber.textContent = `Вопрос ${String(index + 1).padStart(2, '0')}`;
  questionText.textContent = q.text;
  
  // Сброс кнопки и объяснений
  btnNextLabel.textContent = 'Ответить';
  btnNext.disabled = true;
  explanationBox.style.display = 'none';
  explanationBox.innerHTML = '';
  optionsList.innerHTML = '';

  const isMultiple = Array.isArray(q.correctIndex);

  q.shuffledOptions.forEach((opt, optIdx) => {
    const label = document.createElement('label');
    label.className = 'option-label';
    label.setAttribute('for', `opt-${index}-${optIdx}`);

    const input = document.createElement('input');
    input.type = isMultiple ? 'checkbox' : 'radio';
    input.name = `q${index}`;
    input.className = isMultiple ? 'option-checkbox' : 'option-radio';
    input.id = `opt-${index}-${optIdx}`;
    input.value = String(opt.originalIndex);

    input.addEventListener('change', () => {
      // Активируем кнопку "Ответить" при выборе
      btnNext.disabled = false;
    });

    const marker = document.createElement('span');
    marker.className = isMultiple ? 'option-checkbox-marker' : 'option-marker';

    const textSpan = document.createElement('span');
    textSpan.className = 'option-text';
    textSpan.textContent = opt.text;

    label.appendChild(input);
    label.appendChild(marker);
    label.appendChild(textSpan);
    optionsList.appendChild(label);
  });
}

function showExplanation(index) {
  const q = state.currentQuiz[index];
  const userAnswer = state.answers[index];
  const isMultiple = Array.isArray(q.correctIndex);
  const correctIndices = isMultiple ? q.correctIndex : [q.correctIndex];

  // Проверка правильности
  const isCorrect = userAnswer.length === correctIndices.length &&
                    userAnswer.every(idx => correctIndices.includes(idx));

  // Подсветка вариантов
  const labels = optionsList.querySelectorAll('.option-label');
  labels.forEach((label) => {
    const input = label.querySelector('input');
    const originalIdx = parseInt(input.value, 10);
    
    input.disabled = true; // Блокируем изменения

    if (correctIndices.includes(originalIdx)) {
      label.classList.add('is-correct'); // Подсвечиваем правильные
    } else if (userAnswer.includes(originalIdx)) {
      label.classList.add('is-incorrect'); // Подсвечиваем неправильный выбор
    }
  });

  // Формируем блок объяснения
  const statusHtml = isCorrect 
    ? `<p class="explanation-status correct">✅ Верно!</p>` 
    : `<p class="explanation-status incorrect">❌ Неверно.</p>`;
  
  explanationBox.innerHTML = statusHtml + `<p>${q.explanation}</p>`;
  explanationBox.style.display = 'block';
  explanationBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

  // Меняем текст кнопки
  btnNextLabel.textContent = (index === TOTAL_QUESTIONS - 1) ? 'Завершить тест' : 'Далее';
}

function goToNextQuestion() {
  if (state.currentQuestionIndex < TOTAL_QUESTIONS - 1) {
    questionCard.classList.add('leaving');
    setTimeout(() => {
      questionCard.classList.remove('leaving');
      state.currentQuestionIndex++;
      renderQuestion(state.currentQuestionIndex);
    }, 250);
  } else {
    showResults();
  }
}

/* ════════════════════════════════════════════════════════════
   8. РЕЗУЛЬТАТЫ
════════════════════════════════════════════════════════════ */
function calculateResult() {
  let correct = 0;
  state.currentQuiz.forEach((q, idx) => {
    const userAnswer = state.answers[idx] || [];
    const correctIndices = Array.isArray(q.correctIndex) ? q.correctIndex : [q.correctIndex];
    const isCorrect = userAnswer.length === correctIndices.length &&
                      userAnswer.every(i => correctIndices.includes(i));
    if (isCorrect) correct++;
  });
  const percent = Math.round((correct / TOTAL_QUESTIONS) * 100);
  const passed = (correct / TOTAL_QUESTIONS) >= PASS_THRESHOLD;
  return { correct, percent, passed };
}

function showResults() {
  const { correct, percent, passed } = calculateResult();
  showScene(5);

  resultIconWrap.textContent = passed ? '🎉' : '😔';
  resultTitle.className = 'result-title ' + (passed ? 'success' : 'failure');
  resultTitle.textContent = passed ? 'Поздравляем! Тест сдан успешно.' : 'Тест не сдан.';
  resultText.textContent = passed
    ? 'Вы успешно прошли тест по оказанию первой помощи. Ваши результаты сохранены.'
    : `Вы ответили правильно на ${correct} из ${TOTAL_QUESTIONS}. Рекомендуем повторить лекцию и попробовать снова.`;

  scoreNumber.textContent = String(correct);
  statCorrect.textContent = `${correct} из ${TOTAL_QUESTIONS}`;
  statPercent.textContent = percent + '%';
  statStatus.textContent = passed ? 'Сдал / Сдала' : 'Не сдан';
  statStatus.className = 'stat-value stat-status ' + (passed ? 'success' : 'failure');

  const offset = 314 - (percent / 100) * 314;
  scoreRingFill.className = 'score-ring-fill ' + (passed ? 'success' : 'failure');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      scoreRingFill.style.strokeDashoffset = String(offset);
    });
  });

  // Отправка данных
  const payload = {
    fullName: inputs.fullName.value.trim(),
    organization: inputs.org.value.trim(),
    position: inputs.position.value.trim(),
    department: inputs.department.value.trim(),
    birthDate: inputs.birthdate.value,
    hireDate: inputs.hiredate.value,
    correctAnswers: correct,
    totalQuestions: TOTAL_QUESTIONS,
    percent: percent,
    passed: passed,
    timestamp: new Date().toISOString()
  };
  sendResultsToGoogleSheets(payload);
}

/* ════════════════════════════════════════════════════════════
   9. ОТПРАВКА В GOOGLE SHEETS
════════════════════════════════════════════════════════════ */
async function sendResultsToGoogleSheets(payload) {
  if (!GOOGLE_SCRIPT_URL || GOOGLE_SCRIPT_URL.includes('ВАШ_НОВЫЙ_URL')) {
    submitStatus.textContent = '⚠ URL Google Sheets не настроен (см. README.md)';
    submitStatus.className = 'submit-status error';
    return;
  }

  submitStatus.textContent = '⏳ Сохранение результатов...';
  submitStatus.className = 'submit-status sending';

  try {
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    submitStatus.textContent = '✅ Результаты сохранены в системе';
    submitStatus.className = 'submit-status sent';
  } catch (error) {
    submitStatus.textContent = '⚠ Ошибка сохранения. Обратитесь к ответственному.';
    submitStatus.className = 'submit-status error';
  }
}

/* ════════════════════════════════════════════════════════════
   10. ОБРАБОТЧИКИ И ИНИЦИАЛИЗАЦИЯ
════════════════════════════════════════════════════════════ */
btnStart.addEventListener('click', () => showScene(2));
btnConsentCont.addEventListener('click', () => { if (state.consentGiven) showScene(3); });
btnFormSubmit.addEventListener('click', () => { startQuiz(); showScene(4); });

btnNext.addEventListener('click', () => {
  if (btnNext.disabled) return;

  // Если еще не ответили (кнопка "Ответить")
  if (btnNextLabel.textContent === 'Ответить') {
    // Собираем выбранные ответы
    const checkedInputs = Array.from(optionsList.querySelectorAll('input:checked'));
    const selectedIndices = checkedInputs.map(inp => parseInt(inp.value, 10));
    
    state.answers[state.currentQuestionIndex] = selectedIndices;
    
    // Показываем объяснение
    showExplanation(state.currentQuestionIndex);
  } else {
    // Если уже ответили (кнопка "Далее" / "Завершить")
    goToNextQuestion();
  }
});

btnRetry.addEventListener('click', () => {
  // Сброс и перезапуск
  showScene(1);
  btnNextLabel.textContent = 'Ответить';
});

document.addEventListener('DOMContentLoaded', () => {
  showScene(1);
});
