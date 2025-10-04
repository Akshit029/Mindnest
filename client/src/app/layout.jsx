import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import PreLoaderWrapper from "../components/PreLoaderWrapper";
import { AuthProvider } from "../context/AuthContext";

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
            <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans bg-gray-900 text-white`}
      >
        {/* Wrap the WHOLE website in PreLoaderWrapper */}
        <PreLoaderWrapper>
            <AuthProvider>
              <Navbar />
              {children}
            </AuthProvider>
        </PreLoaderWrapper>
      </body>
    </html>
  );
}
