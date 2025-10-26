// src/app/layout.tsx
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import '@react-page/editor/lib/index.css';
import '@react-page/plugins-slate/lib/index.css';
import '@react-page/plugins-image/lib/index.css';

const generateClassName = createGenerateClassName({
  disableGlobal: true,
  seed: 'mui-jss',
});

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
      <body>
      <StylesProvider generateClassName={generateClassName}>
        {children}
      </StylesProvider>
      </body>
      </html>
  );
}