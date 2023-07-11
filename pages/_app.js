import { apolloClient } from "@/graphql/apollo-client";
import "@/styles/globals.css";
import { ApolloProvider } from "@apollo/react-hooks";
import Head from "next/head";
import {Provider} from 'react-redux'
import { wrapper, store } from "../store/store";
import { useSubscription } from '@apollo/client';
import { SUBSCRIBE_BOOK_RATINGS } from '../graphql/subscriptions'
import {showSnackbar} from '../store/snackbar/snackbarActionTypes'
import { useDispatch } from 'react-redux';
import AppAlert from '../components/app-snackbar/AppSnackbar'
import '@/styles/globals.css';
import { appWithTranslation } from 'next-i18next';

const App = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const dispatch = useDispatch()

  const { data, error, loading } = useSubscription(SUBSCRIBE_BOOK_RATINGS, {
    onData: ( { data }) => {
      console.log('new book rating', data.data.addBookRatingsSubscription)
      const info = data?.data?.addBookRatingsSubscription
      
      if (!info) return

      dispatch(showSnackbar({
        duration: 7000,
        show: true,
        type: 'info',
        message: `${info.user_name} rate ${info.count} out to 5 on ${info.book_name} book `
      }))
    },
    client: apolloClient
  });

  return getLayout(
    <>
      <Head>
        <title>Book App</title>
        <meta
          name="Book App"
          content="A book app that allows you to view modify and read books"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <ApolloProvider client={apolloClient}>
          <Provider store={store}>
            <AppAlert />
            <Component {...pageProps} />
          </Provider>
        </ApolloProvider>
    </>
  );
};

export default wrapper.withRedux(appWithTranslation(App));
