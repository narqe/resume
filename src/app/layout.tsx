"use client";

import { Inter } from "next/font/google";
import "./main.css";
import '../../i18n';
import ThemeRegistry from '../utils/ThemeRegistry';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          <title>Joel Acef - CV</title>
          <meta name="viewport" content="width=device-width, initial-scale=1"/>
          <link rel="stylesheet" type="text/css" media="screen" href="./main.css"/>
          <link rel="shortcut icon" type="image/png" href="./favicon.png" />
          <link href='https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,400italic,700' rel='stylesheet' type='text/css'/>
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
      </head>
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui-theme' }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
