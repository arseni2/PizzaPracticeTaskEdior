## Описание
css попадет через тег link в shadow dom, но не может перебить inline style с !important

js пишется в теге template и в компоненте wrapper
1) получить template по его id
2) достать из него js code
3) выполнить код как функцию внутри shadow dom и передать в аргументы shadowRoot

## Запуск

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
