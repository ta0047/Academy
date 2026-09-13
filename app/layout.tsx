"use client";

import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";
import { ToastContainer , Bounce} from "react-toastify";
import { ThemeProvider } from "./components/ThemeProvider";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
          />{" "}
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
