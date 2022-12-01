<<<<<<< HEAD
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '../store/Store'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
=======
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/Store';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store = {store}>
>>>>>>> 3e085ef67a568a00880d710a87a6dc4ae04fa882
      <Component {...pageProps} />
    </Provider>
  )
}
