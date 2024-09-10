import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";
import { apiResponseMock } from "./tmp-response-mock";
import marvelLogo from "@/assets/Marvel_Logo.svg";
import Image from "next/image";
import { Providers } from "@/components/providers";

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

export const metadata: Metadata = {
  title: "Marvel Heroes",
  description: "An app to navigate on your fav heroes!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-svh flex flex-col items-center justify-between gap-y-4`}
      >
        <h1 className="mt-8 mb-2">
          <Image src={marvelLogo} alt="Marvel logo" className="max-w-48" />
        </h1>
        <Providers>{children}</Providers>
        <footer className="text-xs mb-2">
          <Link href="http://marvel.com" target="_blank">
            {apiResponseMock.attributionText}
          </Link>
        </footer>
      </body>
    </html>
  );
}
