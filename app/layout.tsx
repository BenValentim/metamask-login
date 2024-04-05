import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import Providers from './providers/providers';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Metamask Login",
  description: "Testing rainbowkit login",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}