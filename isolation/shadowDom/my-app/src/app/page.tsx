'use client';
import {useEffect, useRef} from 'react';
import DOMPurify from 'dompurify';



const response = `
  <style>
    p {
      color: blue;
    }
     * {
      color: blue !important;
    }
    .projectParagraph {
        color: red;
    }
/*    .classForExample {*/
/*    text-decoration: underline;*/
/*}*/
  </style>
  <script>
    console.log(document.cookie)
    </script>
    <img src=x onerror="console.log('123')">
    <iframe frameborder="0" src="https://yandex.ru/map-widget/v1/?um=constructor%3Ab94297ed5fd1cb182c410d0c3db284d1877a247d30c903242a7f71d4cc0af64f&amp;source=constructor" width="100%"></iframe>
  <p class="classForExample">text from response</p>
`;

export default function Home() {
    const shadowHostRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (shadowHostRef.current) {
            let shadowRoot = shadowHostRef.current.shadowRoot;
            if (!shadowRoot) {
                shadowRoot = shadowHostRef.current.attachShadow({mode: 'open'});
            }

            const cleanHTML = DOMPurify.sanitize(response, {
                USE_PROFILES: { html: true },
                FORCE_BODY: true,
                ADD_TAGS: ['style', 'iframe'],
                ADD_ATTR: ['frameborder', 'width', 'height', 'src', 'class'],
                ALLOWED_TAGS: [
                    'html', 'head', 'body', 'style', 'p', 'img', 'iframe', 'div', 'span', 'br', 'strong', 'em'
                ],

                FORBID_CONTENTS: ["script"],
            });
            shadowRoot.innerHTML = cleanHTML;
            // shadowRoot.innerHTML = response;

            //Обработка события click
            const paragraph = shadowRoot.querySelector('p');
            if (paragraph) {
                const handleClick = () => {
                    console.log('Клик по параграфу внутри Shadow DOM!');
                };
                paragraph.addEventListener('click', handleClick);
                return () => {
                    paragraph.removeEventListener('click', handleClick);
                };
            }
        }
    }, []);

    return (
        <>
            <div className="project">
                <p className="projectParagraph">paragraph</p>
            </div>
            <div className="code">
                <div ref={shadowHostRef}/>
            </div>
        </>
    );
}