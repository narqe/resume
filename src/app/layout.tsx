"use client";

import { Inter } from "next/font/google";
import "./main.css";
import '../../i18n';
import { ThemeProvider } from '@mui/material/styles';
import themeImport from '../utils/theme';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
  const theme = themeImport;

  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <head>
            <title>Joel Acef - Frontend Developer</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="stylesheet" type="text/css" media="screen" href="./main.css"/>
            <link rel="shortcut icon" type="image/x-icon" href="./favicon.ico" />
            <link href='https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,400italic,700' rel='stylesheet' type='text/css'/>
            <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
        </head>
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
