"use client"; // ✅ Ensure this file is treated as a Client Component

import { Provider } from "@/components/ui/provider";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AuthStateInitializer from "./components/AuthStateInitializer/AuthStateInitializer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>SwiftCart</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <AuthStateInitializer />
          <Provider>
            <Header />
            {children}
            <Footer />
          </Provider>
        </UserProvider>
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          aria-label="Notification container"
        />
      </body>
    </html>
  );
}
