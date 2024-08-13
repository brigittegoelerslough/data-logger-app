import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tracker App",
  description: "An App to Track Stuff (js)",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavBar/>
        <Toaster 
          toastOptions={{
            success: {
              style: {
                background: '#c4ffda',
                color: 'black'
              },
            },
            error: {
              style: {
                background: '#ffc4c4',
                color: 'black'
              },
            },
          }}/>
        {children}
      </body>
    </html>
  );
}
