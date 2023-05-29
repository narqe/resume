import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from '../config/apollo';
import OrderState from "../context/orders/OrderState";
import '../i18n';
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  const [isAuth, setIsAuth] = useState(false)
  const router = useRouter();
  
  if (typeof window !== "undefined") {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));

    useEffect(() => {
      if(!isExpired && decodedToken && localStorage.getItem('token')) {
        setIsAuth(true)
      } else {
        setIsAuth(false);
      }
    }, [localStorage.getItem('token'), isExpired, decodedToken])

    if (!isAuth) {
      router.push('/login');
    }

  }

  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp;
