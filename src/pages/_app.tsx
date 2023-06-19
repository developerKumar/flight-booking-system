import '@/styles/globals.css'
import { ThemeProvider, createTheme } from '@mui/material'
import type { AppProps } from 'next/app'


const theme = createTheme({
  palette: {
    primary: {
      main: '#af1e65'
    }
  }
});

export default function App({ Component, pageProps }: AppProps) {
  return <ThemeProvider theme={theme}>
    <Component {...pageProps} />
  </ThemeProvider>
}
