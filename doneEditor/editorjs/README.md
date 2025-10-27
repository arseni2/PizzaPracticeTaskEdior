# php

https://github.com/editor-js/editorjs-php

# Плюсы

1) Возвращает JSON ответ пример
```
   {
  "time": 1761597970159,
  "blocks": [
    {
      "id": "NTAO7D9IX3",
      "type": "paragraph",
      "data": {
        "text": "123123"
      }
    },
    {
      "id": "y61odmJmEM",
      "type": "header",
      "data": {
        "text": "ascascacs",
        "level": 2,
        "alignment": "left"
      }
    }
  ],
  "version": "2.31.0"
}
  ```
2) Можно легко валидировать на сервере с помощью editorjs-php
3) Модульность - не трудно подключить или написать кастомный плагин

# Минусы

1) Поддержка ts у некоторых плагинов отсутствует
2) Для отрисовки скорее всего придется использовать @editorjs/editorjs с readOnly: true,
   либо писать собственный рендерер (switch по type → компонент).
