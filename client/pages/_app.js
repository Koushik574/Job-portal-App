import '@mantine/core/styles.css';
import '../styles/globals.css';
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }) {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
