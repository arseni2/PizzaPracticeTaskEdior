'use client';

import { useEffect, useRef } from 'react';

const response = `
  <style>
    p {
      color: blue;
    }
  </style>
  <script>
    console.log(document.cookie)
    </script>
    <iframe frameborder="0" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab94297ed5fd1cb182c410d0c3db284d1877a247d30c903242a7f71d4cc0af64f&amp;source=constructor" width="100%"></iframe>
  <p>text from response</p>
`;

export default function Home() {
  const shadowHostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shadowHostRef.current) {
            let shadowRoot = shadowHostRef.current.shadowRoot;
            if (!shadowRoot) {
                shadowRoot = shadowHostRef.current.attachShadow({ mode: 'open' });
            }

            // Очистим предыдущий контент
            shadowRoot.innerHTML = '';

            // Создаём временный элемент для парсинга
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = response;

            // Клонируем все узлы и вставляем в Shadow DOM
            const nodes = Array.from(tempDiv.childNodes);
            for (const node of nodes) {
                shadowRoot.appendChild(node.cloneNode(true));
            }

            // Вручную находим и выполняем скрипты
            // const scripts = shadowRoot.querySelectorAll('script');
            // scripts.forEach((script) => {
            //     const newScript = document.createElement('script');
            //     if (script.src) {
            //         newScript.src = script.src;
            //     } else {
            //         newScript.textContent = script.textContent;
            //     }
            //     // Заменяем старый скрипт на новый (выполняемый)
            //     script.parentNode?.replaceChild(newScript, script);
            // });
        }
    }, []);

  return (
      <div>
        <div className="project">
          <p className="projectParagraph">paragraph</p>
        </div>
        <div className="code">
          {/* Хост-элемент для Shadow DOM */}
          <div ref={shadowHostRef} />
        </div>
      </div>
  );
}