import '../styles/globals.css';
import '../styles/tailwind.css';
import { ThemeProvider, theme } from '@chakra-ui/core';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
