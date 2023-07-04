import { useJwt } from "react-jwt";
import { useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import client from '@config/apollo';
import OrderState from "@context/orders/OrderState";
import Router from "next/router";
import '../i18n';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={client}>
      <OrderState>
        <Component {...pageProps} />
      </OrderState>
    </ApolloProvider>
  )
}

export default MyApp;
