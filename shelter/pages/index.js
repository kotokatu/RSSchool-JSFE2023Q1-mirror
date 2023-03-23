console.log(`
Если вы нашли ошибки, пожалуйста, напишите мне в Discord: kotorayakusalas#7316

Самооценка - 100 баллов. 

К некоторым пунктам про интерактивность элементов оставила комментарии в самооценке, так как они не полностью или не вполне четко отражены в макете и соответственно реализованы на мое усмотрение,. Если вы не согласны с моей трактовкой, буду признательна, если напишете.

#### Страница Main (60)
1. Проверка верстки **+7**
   - верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ . **+4**  
   Валидной вёрстке соответствует надпись "Document checking completed. No errors or warnings to show." В таком случае баллы за пункт требований выставляем полностью. Если есть предупреждения - 'warnings', но нет ошибок - 'errors', выставляем половину баллов за пункт требований
   - логотип в хедере состоит из текстовых элементов **+1**
   - страница содержит ровно один элемент '<h1>' **+1**
   - добавлен favicon **+1**
2. Вёрстка соответствует макету **+35**
   - блок '<header>' **+5**
   - блок 'Not only' **+5**
   - блок 'About' **+5**
   - блок 'Our Friends' **+5**
   - блок 'Help' **+5**
   - блок 'In addition' **+5**
   - блок '<footer>' **+5**
3. Требования к css **+6**
   - для позиционирования элементов блока Help использована сеточная верстка (flexbox или grid) **+2**
   - при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру, а не сдвигается в сторону и не растягивается по всей ширине **+2**
   - фоновый цвет тянется на всю ширину страницы **+2**
4. Интерактивность элементов **+12**
   - элемент 'About the Shelter' в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны **+2**
   - каждая карточка с питомцем в блоке **Our Friends** интерактивна при наведении на любую область этой карточки **+2**
   - плавная прокрутка по якорям **+2**
   - выполняются все ссылочные связи согласно [Перечню ссылочных связей](#перечень-ссылочных-связей) для страницы 'Main' **+2**
   - выполнена интерактивность ссылок и кнопок. Интерактивность заключается не только в изменении внешнего вида курсора, например, при помощи свойства 'cursor: pointer', но и в использовании и других визуальных эффектов, например, изменение цвета фона или цвета шрифта, согласно стайлгайду в макете. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета **+2** 
   (Интерактивность ссылок в хедере на странице Pets едва заметна, но она есть (изменение цвета текста). Интерактивность ссылок в футере выполнена изменением цвета. Интерактивность логотипа выполнена только изменением курсора, на мой вгляд, это стандартное поведение для логотипа)
   - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы **+2**

   #### Страница Pets (40)
1. Проверка верстки **+7**
   - верстка страницы валидная: для проверки валидности вёрстки используйте сервис https://validator.w3.org/ . **+4**  
   Валидной вёрстке соответствует надпись "Document checking completed. No errors or warnings to show." В таком случае баллы за пункт требований выставляем полностью. Если есть предупреждения - 'warnings', но нет ошибок - 'errors', выставляем половину баллов за пункт требований
   - логотип в хедере состоит из текстовых элементов **+1**
   - страница содержит ровно один элемент '<h1>' **+1**
   - добавлен favicon **+1**
2. Вёрстка соответствует макету **+15**
   - блок '<header>' **+5**
   - блок 'Our Friends' **+5**
   - блок '<footer>' **+5**  
3. Требования к css **+4**
   - при уменьшении масштаба страницы браузера или увеличении ширины страницы (>1280px) вёрстка размещается по центру, а не сдвигается в сторону и не растягивается по всей ширине **+2**
   - фоновый цвет тянется на всю ширину страницы **+2**
4. Интерактивность элементов **+14**
   - элемент 'Our pets' в навигации подсвечен и неинтерактивен, остальные элементы навигации интерактивны **+2**
   - доступные кнопки пагинации (вправо) активны, недоступные (влево) - неактивны (disabled) **+2** 
   (По макету не совсем ясно, как устроена пагинация и каким должно быть поведение кнопки с номером страницы, для чего описаны состояния Normal и Hover, если на макете она всегда в состоянии Active}. Реализовала, как наиболее типичное поведение - кнопка активной страницы подсвечена и не интерактивна)
   - каждая карточка с питомцем в блоке **Our Friends** интерактивна при наведении на любую область этой карточки **+2**
   - плавная прокрутка по якорям **+2**
   - выполняются все ссылочные связи согласно [Перечню ссылочных связей](#перечень-ссылочных-связей) для страницы 'Pets' **+2**
   - выполнена интерактивность ссылок и кнопок. Интерактивность заключается не только в изменении внешнего вида курсора, например, при помощи свойства 'cursor: pointer', но и в использовании и других визуальных эффектов, например, изменение цвета фона или цвета шрифта, согласно стайлгайду в макете. Если в макете стили не указаны, реализуете их по своему усмотрению, руководствуясь общим стилем макета **+2**
   (Интерактивность ссылок в хедере на странице Pets едва заметна, но она есть (изменение цвета текста). Интерактивность ссылок в футере выполнена изменением цвета. Интерактивность логотипа выполнена только изменением курсора, на мой вгляд, это стандартное поведение для логотипа)
   - обязательное требование к интерактивности: плавное изменение внешнего вида элемента при наведении и клике, не влияющее на соседние элементы **+2**
`)