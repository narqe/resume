import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from '@config/apollo';
import OrderState from "@context/orders/OrderState";
import Router from "next/router";
import '../i18n';

const MyApp = ({ Component, pageProps }) => {
  const [isAuth, setIsAuth] = useState(false)
  
  if (typeof window !== "undefined") {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem('token'));

    useEffect(() => {
      if(!isExpired && decodedToken && localStorage.getItem('token')) {
        setIsAuth(true)
      } else {
        setIsAuth(false);
      }

      if (isExpired) {
        localStorage.removeItem('token');
        if (!Router.pathname.includes('/admin/login') || Router.pathname.includes('/admin/newaccount')) {
          Router.push("/");
        }
      }
      
    }, [isExpired, decodedToken])

  }

  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} isAuth={isAuth} />
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp;
