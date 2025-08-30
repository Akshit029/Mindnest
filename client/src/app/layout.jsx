import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import PreLoaderWrapper from "../components/PreLoaderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Mindnest",
  description: "Mental health companion, your journey starts here.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {/* Wrap the WHOLE website in PreLoaderWrapper */}
        <PreLoaderWrapper>
            <Navbar />
            {children}
        </PreLoaderWrapper>
      </body>
    </html>
  );
}
